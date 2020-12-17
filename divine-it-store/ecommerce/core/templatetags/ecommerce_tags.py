from django import template
from ecommerce.catalogue.forms import CustomizeAttrForm
from pricing.pyapp.models import Configuration

register = template.Library()


@register.simple_tag
def customize_attr_form(product):
    return CustomizeAttrForm


@register.simple_tag
def configuration_history(user, product):

    return Configuration.objects.filter(user=user, product=product)