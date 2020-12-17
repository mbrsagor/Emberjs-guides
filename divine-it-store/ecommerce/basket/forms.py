from django import forms
from oscar.apps.basket import forms as base_forms
from django.conf import settings
from oscar.core.loading import get_model

ProductClass = get_model('catalogue', 'ProductClass')
ProductAttributeValue = get_model('catalogue', 'ProductAttributeValue')


class AddToBasketForm(base_forms.AddToBasketForm):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.fields.get(settings.CUSTOMIZABLE_PRODUCT_OPTION_CODE):
            self.fields[settings.CUSTOMIZABLE_PRODUCT_OPTION_CODE].widget = forms.HiddenInput()

    def _add_option_field(self, product, option):
        super()._add_option_field(product, option)
        if option.code == settings.CUSTOMIZABLE_PRODUCT_OPTION_CODE:
            configuration = product.cart_default_config
            if configuration:
                self.fields[option.code].initial = configuration.ref

    def clean(self):
        info = self.basket.strategy.fetch_for_product(self.product, options=self.cleaned_options())

        # Check that a price was found by the strategy
        if not info.price.exists:
            raise forms.ValidationError("This product cannot be added to the basket because a price could not be determined for it.")

        # Check currencies are sensible
        if (self.basket.currency and
                info.price.currency != self.basket.currency):
            raise forms.ValidationError("This product cannot be added to the basket as its currency isn't the same as other products in your basket")

        # Check user has permission to add the desired quantity to their
        # basket.
        current_qty = self.basket.product_quantity(self.product)
        desired_qty = current_qty + self.cleaned_data.get('quantity', 1)
        is_permitted, reason = info.availability.is_purchase_permitted(
            desired_qty)
        if not is_permitted:
            raise forms.ValidationError(reason)

        return self.cleaned_data


class SimpleAddToBasketForm(AddToBasketForm):

    def __init__(self, *args, **kwargs):
        super(SimpleAddToBasketForm, self).__init__(*args, **kwargs)
        if 'quantity' in self.fields:
            self.fields['quantity'].initial = 1
            self.fields['quantity'].widget = forms.HiddenInput()
