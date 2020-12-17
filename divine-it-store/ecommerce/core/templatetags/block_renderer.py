import json

from django import template
from django.shortcuts import get_object_or_404
from django.template import loader

from ecommerce.core.models import Menu, CustomForm

register = template.Library()


@register.filter
def increment(value, increment_by=1):
    try:
        value = value + increment_by
        return value
    except:
        pass


@register.simple_tag
def render_menu(menu_code, menu_level=1, menu_type='with_brand', template_name="default_menu.html", site_config=None,
                request=None):
    menu = get_object_or_404(Menu, code=menu_code)
    menu_data = json.loads(menu.content)
    return loader.render_to_string('core/menu_snippets/' + template_name, {
        'menu_data': menu_data, 'menu_level': menu_level, 'menu_type': menu_type, 'config': site_config,
        'request': request
    })


@register.simple_tag(takes_context=True)
def render_form(context, form_code):
    form = get_object_or_404(CustomForm, code=form_code)
    form_data = json.loads(form.content)
    context['form_data'] = form_data
    context['form_id'] = form.pk
    return loader.render_to_string('core/form_snippets/default_form.html', context.flatten())
