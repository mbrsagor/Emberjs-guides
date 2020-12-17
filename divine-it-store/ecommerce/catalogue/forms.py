from django import forms
from oscar.core.loading import get_model
from django.conf import settings

Category = get_model('catalogue', 'Category')
Product = get_model('catalogue', 'Product')
ProductAttribute = get_model('catalogue', 'ProductAttribute')
Option = get_model('catalogue', 'Option')


class AttributeFilterForm(forms.Form):

    def __init__(self, categories, **kwargs):
        super().__init__(**kwargs)

        attributes = ProductAttribute.objects.filter(
            product_class__products__categories__in=categories,
            is_filterable=True).distinct()

        for attribute in attributes:
            choices = [(option.id, option.option) for option in attribute.option_group.options.all()]
            choices = [(None, f'Select a {attribute.name}')] + choices
            self.fields[attribute.code] = forms.ChoiceField(label=attribute.name, choices=choices, required=False)
            self.fields[attribute.code].widget.attrs['class'] = 'form-control col-md-3 selectField'
            # self.fields[attribute.code].widget.attrs['id'] = 'selectField'


class CustomizeAttrForm(forms.Form):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        option = Option.objects.get(code=settings.CONFIG_IDENTIFIER_OPTION_CODE)
        is_required = option.type == Option.REQUIRED
        self.fields[settings.CONFIG_IDENTIFIER_OPTION_CODE] = forms.CharField(
            label=option.name, max_length=255, required=is_required
        )
