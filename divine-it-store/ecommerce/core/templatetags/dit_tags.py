from django import template
from django.utils.html import mark_safe
from constance import config
from ecommerce.core.models import SeoItem
import requests
from django.contrib.sites.models import Site

register = template.Library()


@register.simple_tag
def remote_template(url):
    res = requests.get(f'{config.partial_render_base}/{url}')
    return mark_safe(res.text)


@register.simple_tag
def remote_template_raw(url):
    res = requests.get(url)
    return mark_safe(res.text)


@register.simple_tag
def add_get_param(url, **kwargs):
    req = requests.PreparedRequest()
    req.prepare_url(url, kwargs)
    return req.url


@register.simple_tag(takes_context=True)
def abs_url(context, url):
    request = context.get('request')
    if request:
        return request.build_absolute_uri(url)
    if url.startswith('http'):
        return url
    current_site = Site.objects.get_current()
    return 'https://%s%s' % (current_site.domain, url)


@register.simple_tag(takes_context=True)
def get_seo_item(context):
    request = context.get('request')
    product = context.get('product')
    if product is not None:
        try:
            return product.seoitem
        except Exception as _:
            pass
    if request is not None:
        return SeoItem.objects.filter(url=request.path).first()
    else:
        return None
