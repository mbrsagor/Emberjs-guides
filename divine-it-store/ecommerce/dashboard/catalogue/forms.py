import json
from django import forms
from oscar.apps.dashboard.catalogue import forms as base_forms
from django.core.exceptions import ValidationError
from oscar.core.loading import get_class, get_model
from treebeard.forms import movenodeform_factory
from pricing.pyapp.models import Configuration

Category = get_model('catalogue', 'Category')
Product = get_model('catalogue', 'Product')
Link = get_model('catalogue', 'Link')
ProductClass = get_model('catalogue', 'ProductClass')
ProductAttribute = get_model('catalogue', 'ProductAttribute')


class ProductClassForm(base_forms.ProductClassForm):

    class Meta(base_forms.ProductClassForm.Meta):
        fields = ['name', 'requires_shipping', 'track_stock', 'can_be_customized', 'options']


class ProductForm(base_forms.ProductForm):

    class Meta(base_forms.ProductForm.Meta):
        fields = [
            'title', 'upc', 'logo', 'banner_image', 'remote_menu_url', 'short_description', 'description', 'inactive',
            'is_discountable', 'structure', 'dummy',
            'only_ask_for_quote', 'ask_for_quote_form_link', 'featured', 'ordering',
            'auto_deploy_enable', 'auto_deploy_approval_required', 'auto_deploy_code', 'auto_deploy_period', 'auto_deploy_metrics',
            'free_trial_available', 'free_trial_period', 'free_trial_metrics',
            'auto_deploy_domain_code', 'auto_deploy_domain_ext'
        ]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['short_description'].widget.attrs['class'] = "no-widget-init"

        self.fields['auto_deploy_metrics'].widget.attrs['class'] = "no-widget-init"
        self.fields['auto_deploy_period'].label = "Auto Deploy Period (Days)"
        self.fields['free_trial_metrics'].widget.attrs['class'] = "no-widget-init"
        self.fields['free_trial_period'].label = "Trial Period (Days)"

    def clean(self):
        cleaned_data = super().clean()
        if cleaned_data.get('free_trial_available') and cleaned_data.get('free_trial_period') is None:
            self.add_error('free_trial_period', 'A free trial deploy period in days is required')

        if cleaned_data.get('auto_deploy_enable') and cleaned_data.get('auto_deploy_code') is None:
            self.add_error('auto_deploy_code', 'A auto deploy code is required to match with Autodeploy server')

        try:
            json.loads(cleaned_data.get('auto_deploy_metrics'))
        except Exception as _:
            self.add_error('auto_deploy_metrics', 'Please put a valid json')
        try:
            json.loads(cleaned_data.get('free_trial_metrics'))
        except Exception as _:
            self.add_error('free_trial_metrics', 'Please put a valid json')

        if cleaned_data.get('auto_deploy_enable') and cleaned_data.get('auto_deploy_period') is None:
            self.add_error('auto_deploy_period', 'A deploy period in days is required')

        return cleaned_data


class ProductAttributesForm(base_forms.ProductAttributesForm):

    class Meta:
        model = ProductAttribute
        fields = ["name", "code", "type", "option_group", "required", "is_variant", "is_filterable"]

    def clean_is_filterable(self):
        is_filterable = self.cleaned_data.get('is_filterable', False)
        attr_type = self.cleaned_data.get('type')
        if is_filterable and attr_type != ProductAttribute.OPTION:
            self.add_error('type', 'Type must be option to be filterable')
        else:
            return is_filterable

    def clean_is_variant(self):
        is_filterable = self.cleaned_data.get('is_filterable', False)
        attr_type = self.cleaned_data.get('type')
        if is_filterable and attr_type != ProductAttribute.OPTION:
            self.add_error('type', 'Type must be option to be variant')
        else:
            return is_filterable


CategoryForm = movenodeform_factory(
    Category,
    fields=['name', 'description', 'image', 'category_icon'])


BaseLinkFormSet = forms.inlineformset_factory(Product, Link, fields=['title', 'url', 'ordering', 'open_in_new_tab'], extra=2)


class LinkFormSet(BaseLinkFormSet):
    def __init__(self, product_class, user, *args, **kwargs):
        super().__init__(*args, **kwargs)
