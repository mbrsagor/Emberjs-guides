import json
import uuid
from django.db import models
from datetime import datetime, timedelta
from oscar.core.loading import get_model
from django.contrib.auth import get_user_model
from autodeploy import utils
from constance import config
from django.db import transaction

OrderLine = get_model('order', 'Line')
Product = get_model('catalogue', 'Product')

INACTIVE_OPTIONS = (
    (0, 'NO'),
    (1, 'YES'),
)


class ServiceRecord(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(get_user_model(), on_delete=models.DO_NOTHING, blank=True, null=True)
    product = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    order_line = models.ForeignKey(OrderLine, on_delete=models.DO_NOTHING, blank=True, null=True)

    FREE_TRIAL = 'free-trial'
    PAID_PRODUCT = 'buy-now'
    LICENCE_TYPE_OPTIONS = (
        (FREE_TRIAL, 'Free Trial'),
        (PAID_PRODUCT, 'Paid')
    )

    PENDING = 0
    PAYMENT_COMPLETE = 1
    LICENCE_UPDATED = 2
    STATUS_CHOICES = (
        (PENDING, 'Pending'),
        (PAYMENT_COMPLETE, 'Payment Complete'),
        (LICENCE_UPDATED, 'Updated to Licence Server'),
    )

    licence_type = models.CharField(max_length=100, choices=LICENCE_TYPE_OPTIONS)
    status = models.IntegerField(choices=STATUS_CHOICES, default=PENDING, null=True, blank=True)
    inactive = models.BooleanField(default=True, choices=INACTIVE_OPTIONS)

    sub_domain = models.CharField(max_length=200, default=None, null=True, blank=True)
    domain_code = models.CharField(max_length=200, default=None, null=True, blank=True)
    domain_ext = models.CharField(max_length=15, default=None, null=True, blank=True)
    cert_subscription_code = models.CharField(max_length=512, default=None, null=True, blank=True)

    product_code = models.CharField(max_length=255, default=None, null=True, blank=True)

    valid_from = models.DateField()
    valid_until = models.DateField()

    deployment_config = models.TextField(default='{}', null=True, blank=True)
    deployment_period = models.IntegerField(default=0, null=True, blank=True)

    notification_flag = models.IntegerField(default=0)

    approved_for_deploy = models.BooleanField(default=False, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    approved_at = models.DateTimeField(default=None, blank=True, null=True)
    created_by = models.ForeignKey(get_user_model(), default=None, blank=True, null=True, on_delete=models.DO_NOTHING, related_name='created_by')
    approved_by = models.ForeignKey(get_user_model(), default=None, blank=True, null=True, on_delete=models.DO_NOTHING, related_name='approved_by')

    @property
    def deployment(self):
        if self.deployment_set.exists():
            return self.deployment_set.order_by('-created')[0]
        else:
            return None

    @property
    def url(self):
        return f'http://{self.sub_domain}.{self.domain_code}.{self.domain_ext}'

    @classmethod
    def create_new(cls, product, user, sub_domain, license_type=FREE_TRIAL, created_by=None):
        servicerecord = ServiceRecord()
        servicerecord.user = user
        servicerecord.product = product

        till_days = 0
        if license_type == cls.FREE_TRIAL:
            till_days = product.free_trial_period
            servicerecord.deployment_config = product.free_trial_metrics
        elif license_type == cls.PAID_PRODUCT:
            till_days = product.auto_deploy_period
            servicerecord.deployment_config = product.auto_deploy_metrics

        servicerecord.licence_type = license_type
        servicerecord.status = cls.PENDING

        servicerecord.sub_domain = sub_domain
        servicerecord.domain_code = product.auto_deploy_domain_code
        servicerecord.domain_ext = product.auto_deploy_domain_ext
        servicerecord.valid_from = datetime.now().date()
        servicerecord.valid_until = utils.get_expiry_date(till_days)
        servicerecord.product_code = product.auto_deploy_code
        servicerecord.approved_for_deploy = not product.auto_deploy_approval_required
        servicerecord.created_by = created_by if created_by else user
        servicerecord.save()
        return servicerecord

    @classmethod
    def check_for_eligibility(cls, user, product, is_trial=False):

        qs = cls.objects.filter(user=user, product=product)
        if is_trial:
            qs.filter(licence_type=cls.FREE_TRIAL)
        current_free_trial = qs.count()

        if -1 < user.max_free_trial_per_product <= current_free_trial:
            return False, 'You have exceed your quota for free trail.'

        total_deploy = cls.objects.filter(user=user).count()

        if -1 < user.max_total_autodeploy <= total_deploy:
            return False, 'You have exceed your quota for free trail.'

        if user.company_name is None:
            return False, 'Please update your profile and provide company name to continue.'

        return True, None

    @classmethod
    def get_will_expire_set(cls, expire_period):
        before = datetime.now() + timedelta(days=expire_period)
        return cls.objects.filter(~models.Q(notification_flag=-1)) \
            .filter(valid_until__lte=before) \
            .filter(models.Q(notification_flag__gt=expire_period) | models.Q(notification_flag=0)) \
            .filter(user__is_active=True)

    @classmethod
    def already_expired_set(cls):
        return cls.objects.filter(~models.Q(notification_flag=-1)) \
            .filter(valid_until__lte=datetime.now()) \
            .filter(user__is_active=True)

    @property
    def is_expired(self):
        return self.valid_until <= datetime.today().date()

    @property
    def is_free_trial(self):
        return self.licence_type == self.FREE_TRIAL


class Deployment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    DEPLOYMENT_PENDING = 0
    DEPLOYMENT_IN_PROGRESS = 1
    DEPLOYMENT_ERROR_OCCURRED = 2
    DEPLOYMENT_DEPLOYED = 3
    DEPLOYMENT_COMPLETE = 4
    DEPLOYMENT_INACTIVE = 5
    DEPLOYMENT_DELETED = 6
    DEPLOYMENT_STATUS_CHOICES = (
        (DEPLOYMENT_PENDING, 'Pending'),
        (DEPLOYMENT_IN_PROGRESS, 'In Progress'),
        (DEPLOYMENT_ERROR_OCCURRED, 'Error Occurred'),
        (DEPLOYMENT_DEPLOYED, 'Deployed[host unresolved]'),
        (DEPLOYMENT_COMPLETE, 'Active'),
        (DEPLOYMENT_INACTIVE, 'Inactive'),
        (DEPLOYMENT_DELETED, 'Cancelled')
    )

    service_record = models.ForeignKey(ServiceRecord, on_delete=models.CASCADE)

    deployment_status = models.IntegerField(choices=DEPLOYMENT_STATUS_CHOICES, default=DEPLOYMENT_PENDING, null=True,
                                            blank=True)
    app_user = models.CharField(max_length=200, default=None, null=True, blank=True)
    app_pass = models.CharField(max_length=200, default=None, null=True, blank=True)
    error = models.CharField(max_length=200, default=None, null=True, blank=True)
    error_details = models.TextField(default=None, null=True, blank=True)
    cert_subscription_code = models.CharField(max_length=512, default=None, null=True, blank=True)
    sub_domain = models.CharField(max_length=200, default=None, null=True, blank=True)
    domain_code = models.CharField(max_length=200, default=None, null=True, blank=True)
    domain_ext = models.CharField(max_length=15, default=None, null=True, blank=True)
    product_code = models.CharField(max_length=255, default=None, null=True, blank=True)

    deployment_config = models.TextField(default='{}', null=True, blank=True)
    deployment_period = models.IntegerField(default=0, null=True, blank=True)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def get_license_matrics(self):
        try:
            return json.loads(self.deployment_config)
        except Exception as _:
            return {}

    @classmethod
    def create(cls, service_record):
        # Delete all deployment that turns to be in error
        service_record.deployment_set.filter(deployment_status=cls.DEPLOYMENT_ERROR_OCCURRED).delete()

        # Todo: Check if already trying to deploy

        deployment = Deployment()
        deployment.service_record = service_record
        deployment.deployment_status = cls.DEPLOYMENT_PENDING
        deployment.deployment_config = service_record.deployment_config
        deployment.deployment_period = service_record.deployment_period
        deployment.sub_domain = service_record.sub_domain
        deployment.domain_code = service_record.domain_code
        deployment.domain_ext = service_record.domain_ext
        deployment.cert_subscription_code = service_record.cert_subscription_code
        deployment.product_code = service_record.product_code
        deployment.save()
        return deployment

    @classmethod
    def to_be_deactivated_set(cls):
        grace_period = config.DEACTIVATION_GRACE_PERIOD_DAYS
        before = datetime.today().date() - timedelta(days=grace_period)
        return cls.objects.filter(deployment_status__in=[cls.DEPLOYMENT_COMPLETE, cls.DEPLOYMENT_DEPLOYED, cls.DEPLOYMENT_IN_PROGRESS], service_record__valid_until=before)
