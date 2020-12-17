from django.core.management import BaseCommand
from constance import config
from autodeploy.models import ServiceRecord, Deployment
from ecommerce.core.adapter import EcommerceAccountAdapter
from autodeploy.utils import deactivate_deployment
import logging

logger = logging.getLogger(__name__)


class Command(BaseCommand):

    def get_expiry_slab(self):
        return sorted([int(l.strip()) for l in config.EXPIRE_NOTIFICATION_PERIOD_SLAB.split(',')])

    def send_expiry_emails(self):
        for period in self.get_expiry_slab():
            servicerecords = ServiceRecord.get_will_expire_set(period)
            logger.info('%s services will expire within %s days' % (len(servicerecords), period))
            if config.ENABLE_EXPIRE_NOTIFICATION:
                for item in servicerecords:
                    context = {
                        'servicerecord': item,
                        'user': item.user
                    }
                    EcommerceAccountAdapter.send_email('SERVICE_WILL_EXPIRE', item.user.email, context=context)
                    item.notification_flag = period
                    item.save()

    def send_expired_emails(self):
        servicerecords = ServiceRecord.already_expired_set()
        logger.info('%s services are expired' % (len(servicerecords), ))
        if config.ENABLE_EXPIRE_NOTIFICATION:
            for item in servicerecords:
                context = {
                    'servicerecord': item,
                    'user': item.user
                }
                EcommerceAccountAdapter.send_email('SERVICE_EXPIRED', item.user.email, context=context)
                item.notification_flag = -1
                item.save()

    def deactivate(self):
        for deployment in Deployment.to_be_deactivated_set():
            logger.info(f'Deactivating deployment id {deployment.id}')
            deactivate_deployment(deployment)

    def handle(self, *args, **options):
        self.send_expired_emails()
        self.send_expiry_emails()
        self.deactivate()
