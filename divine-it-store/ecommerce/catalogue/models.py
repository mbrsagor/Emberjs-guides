from django.db import models
from oscar.apps.catalogue import abstract_models
from djangohyper.fields import HyperField
from django.utils.translation import gettext_lazy as _
from django.dispatch import receiver
from oscar.core.loading import get_model
import json
from django.shortcuts import reverse
from django.conf import settings
from constance import config
import logging
from django.core.cache import cache
from oscar.core.utils import slugify


logger = logging.getLogger(__name__)


class ProductClass(abstract_models.AbstractProductClass):
    GOOGLE_SHEET_ID_ATTR_CODE = 'google_sheet_id'
    SHEET_NAMES_ATTR_CODE = 'sheet_names'
    IS_DYNAMIC_ATTR_CODE = 'is_dynamic'
    CONFIG_ATTR_CODE = 'config'
    LAST_VERSION_ATTR_CODE = 'last_version'
    USE_STOCK_ATTR_CODE = 'use_stock_price'

    # determine if product can be customized or not
    can_be_customized = models.BooleanField(default=False)


@receiver(models.signals.post_save, sender=ProductClass)
def on_product_class_save(sender, instance, created, **kwargs):
    """If the product class is a customizable product class then -
        - Create Google Sheet ID
        - Create is_dynamic attribute if not already created
        - Create config attribute if not already created
    """
    if instance.can_be_customized:
        ProductAttribute = get_model('catalogue', 'ProductAttribute')
        Option = get_model('catalogue', 'Option')

        customization_option = Option.objects.get(code=settings.CUSTOMIZABLE_PRODUCT_OPTION_CODE)

        if customization_option not in instance.options.all():
            instance.options.add(customization_option)

        if not instance.attributes.filter(code=ProductClass.GOOGLE_SHEET_ID_ATTR_CODE, type=ProductAttribute.TEXT).exists():
            ProductAttribute.objects.create(
                product_class=instance, name='Google Sheet ID', code=ProductClass.GOOGLE_SHEET_ID_ATTR_CODE, type=ProductAttribute.TEXT)

        if not instance.attributes.filter(code=ProductClass.SHEET_NAMES_ATTR_CODE, type=ProductAttribute.TEXT).exists():
            ProductAttribute.objects.create(
                product_class=instance, name='Comma Separated Sheet Names', code=ProductClass.SHEET_NAMES_ATTR_CODE, type=ProductAttribute.TEXT)

        if not instance.attributes.filter(code=ProductClass.IS_DYNAMIC_ATTR_CODE, type=ProductAttribute.BOOLEAN).exists():
            ProductAttribute.objects.create(
                product_class=instance, name='Is Dynamic', code=ProductClass.IS_DYNAMIC_ATTR_CODE, type=ProductAttribute.BOOLEAN)

        if not instance.attributes.filter(code=ProductClass.CONFIG_ATTR_CODE, type=ProductAttribute.TEXT).exists():
            # create config
            ProductAttribute.objects.create(
                product_class=instance, name='Configuration', code=ProductClass.CONFIG_ATTR_CODE, type=ProductAttribute.TEXT)

        if not instance.attributes.filter(code=ProductClass.LAST_VERSION_ATTR_CODE, type=ProductAttribute.INTEGER).exists():
            ProductAttribute.objects.create(
                product_class=instance, name='Last Version (Don\'t Update Manually)', code=ProductClass.LAST_VERSION_ATTR_CODE, type=ProductAttribute.INTEGER)

        if not instance.attributes.filter(code=ProductClass.USE_STOCK_ATTR_CODE, type=ProductAttribute.BOOLEAN).exists():
            ProductAttribute.objects.create(
                product_class=instance, name='Use Stock Price', code=ProductClass.USE_STOCK_ATTR_CODE, type=ProductAttribute.BOOLEAN)


class Product(abstract_models.AbstractProduct):
    """
    customizing AbstrucProduct model for adding some additional field
    """
    slug = models.SlugField(_('Slug'), max_length=255, unique=True)
    short_description = models.TextField(default=None, blank=True, null=True)
    logo = models.ImageField(_('Logo'), upload_to='logos', blank=True, null=True, max_length=255, default=None)
    banner_image = models.ImageField(_('Banner Image'), upload_to='images', blank=True, null=True, max_length=255, default=None)
    description = HyperField(default="[]", blank=True)
    featured = models.BooleanField(default=False)

    auto_deploy_enable = models.BooleanField(default=False, blank=True)
    auto_deploy_approval_required = models.BooleanField(default=False, blank=True)
    auto_deploy_code = models.CharField(max_length=50, null=True, blank=True)
    auto_deploy_period = models.IntegerField(default=30, blank=True, null=True)
    auto_deploy_metrics = models.TextField(default='{}', blank=True, null=True)
    free_trial_available = models.BooleanField(default=False, blank=True)
    free_trial_period = models.IntegerField(default=30, blank=True, null=True)
    free_trial_metrics = models.TextField(default='{}', blank=True, null=True)
    auto_deploy_domain_code = models.CharField(max_length=40, default=None, blank=True, null=True)
    auto_deploy_domain_ext = models.CharField(max_length=15, default=None, blank=True, null=True)
    ordering = models.IntegerField(default=0, blank=True)
    dummy = models.BooleanField(default=False, blank=True)
    only_ask_for_quote = models.BooleanField(default=False, blank=True)
    ask_for_quote_form_link = models.CharField(max_length=255, default=None, blank=True, null=True)

    remote_menu_url = models.URLField(max_length=255, blank=True, null=True, default=None)

    inactive = models.BooleanField(default=False, blank=True)

    def get_title(self):
        if self.structure == Product.CHILD:
            return f'{self.parent.title} ({self.title})'
        else:
            return super().get_title()

    def get_logo(self):
        if self.structure == Product.CHILD:
            return self.logo if bool(self.logo) else self.parent.logo
        else:
            return self.logo

    def __str__(self):
        return self.get_title()

    @property
    def domain(self):
        return f'{self.auto_deploy_domain_code}.{self.auto_deploy_domain_ext}'

    @property
    def variants(self):
        return self.children.filter(inactive=False).order_by('ordering')

    @property
    def pricing_config(self):
        return json.loads(self.pricing_config_str)

    @property
    def pricing_config_str(self):
        return self.pricing_version.parsed_json

    @property
    def pricing_version(self):
        from pricing.pyapp.models import PricingVersion
        last_version_attr = self.last_version_attr
        pv = PricingVersion.objects.get(pk=self.attribute_values.get(attribute=last_version_attr).value)
        return pv

    @property
    def pricing_version_number(self):
        return self.pricing_version.id

    @property
    def cart_default_config(self):
        from pricing.pyapp.models import Configuration
        try:
            pv = ProductAttributeValue.objects.get(
                attribute=self.config_attr,
                product=self
            )
            return Configuration.objects.get(ref=pv.value)
        except Exception as e:
            logger.error("unable to get cart default config", e)
            return None

    def update_cart_default_config(self, config_ref):
        pv, _ = ProductAttributeValue.objects.get_or_create(
            attribute=self.config_attr,
            product=self
        )
        pv.value = config_ref
        pv.save()

    @property
    def cart_default_price(self):
        configuration = self.cart_default_config
        if configuration:
            return configuration.price
        else:
            return None

    def get_customize_url(self):
        """
        Return a product's absolute url
        """
        return reverse('catalogue:customize',
                       kwargs={'slug': self.slug})

    @property
    def is_customizable(self):
        if self.structure == Product.CHILD:
            return self.parent.product_class.can_be_customized
        else:
            return self.product_class.can_be_customized

    @property
    def uses_stock_price(self):
        attr = self.attribute_values.filter(attribute__code=ProductClass.USE_STOCK_ATTR_CODE)
        if len(attr) > 0:
            return attr[0].value
        return False

    def should_view_customize_button(self):
        """
        Check if the product should show customize button in UI.
        For now used for Child products
        :return:
        """
        attr = self.attribute_values.filter(attribute__code=ProductClass.IS_DYNAMIC_ATTR_CODE)
        if len(attr) > 0:
            return attr[0].value
        return False

    @property
    def config_attr(self):
        return self._get_attr_from_self_or_class(ProductClass.CONFIG_ATTR_CODE)

    @property
    def last_version_attr(self):
        return self._get_attr_from_self_or_class(ProductClass.LAST_VERSION_ATTR_CODE)

    def _get_attr_from_self_or_class(self, code):
        if self.structure == Product.CHILD:
            return self.parent.product_class.attributes.get(code=code)
        else:
            return self.product_class.attributes.get(code=code)

    def links(self):
        return self.link_set.order_by('-ordering')

    def get_absolute_url(self):
        """
        Return a product's absolute url
        """
        return reverse('catalogue:detail',
                       kwargs={'slug': self.slug})

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.get_title())
            if self.structure == 'child':
                self.slug = f'{self.parent.slug}-{self.slug}'
        super().save(*args, **kwargs)


class Link(models.Model):
    title = models.CharField(max_length=255)
    url = models.URLField(max_length=255)
    ordering = models.IntegerField(default=0)
    open_in_new_tab = models.BooleanField(default=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.title} -> {self.url} {self.product.title}'


class ProductAttribute(abstract_models.AbstractProductAttribute):
    is_variant = models.BooleanField(default=False)
    is_filterable = models.BooleanField(default=False)


class Category(abstract_models.AbstractCategory):
    category_icon = models.ImageField(_('Icon'), upload_to='categories', blank=True, null=True, max_length=255, default=None)
    slug = models.SlugField(_('Slug'), max_length=255, unique=True, db_index=True)

    @property
    def products(self):
        return self.product_set.filter(inactive=False)

    @property
    def get_slider_products(self):
        return self.products.filter(inactive=False).order_by('ordering')[0:config.NUMBER_OF_PRODUCT_IN_GROUP]

    def get_absolute_url(self):
        """
        Our URL scheme means we have to look up the category's ancestors. As
        that is a bit more expensive, we cache the generated URL. That is
        safe even for a stale cache, as the default implementation of
        ProductCategoryView does the lookup via primary key anyway. But if
        you change that logic, you'll have to reconsider the caching
        approach.
        """
        cache_key = self.get_url_cache_key()
        url = cache.get(cache_key)
        if not url:
            url = reverse(
                'catalogue:category',
                kwargs={'category_slug': self.full_slug})
            cache.set(cache_key, url)
        return url


from oscar.apps.catalogue.models import *  # noqa isort:skip
