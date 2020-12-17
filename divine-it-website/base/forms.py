import pycountry
import requests
from django import forms
from dit_email_addon.api import DitEmailAddon
from django.conf import settings
from crispy_forms.helper import Layout, FormHelper
from crispy_forms.layout import Submit
from crispy_forms.bootstrap import Div
from django.contrib import messages
from wagtailhyper.forms import HyperForm
import threading
from captcha.fields import ReCaptchaField
from captcha.widgets import ReCaptchaV2Checkbox
from base.models import ApplicationSettings
from django.conf import settings


def get_py_country():
    return [(pycountry.countries.get(alpha_2='BD').name, pycountry.countries.get(alpha_2='BD').name)] + list(map(lambda  x: (x.name, x.name), pycountry.countries))


def get_product_list():
    products = requests.get('https://www.divineit.net/api/products/').json()
    products_list = list(map(lambda x: (x['name'], x['name']), products['results']))
    return [('', 'Select Product')] + products_list + [('Others', 'Others')]


def send_email_async(data):
    contact_email = getattr(settings, 'CONTACT_EMAIL', 'shimul@divine-it.net')
    DitEmailAddon().send_email_default(contact_email, 'contact', data)
    DitEmailAddon().send_email_default(data['email'], 'contact_reply', data)


class ContactForm(HyperForm):

    name = forms.CharField(max_length=255, label='', widget=forms.TextInput(attrs={'placeholder': 'Name'}) )
    company_name = forms.CharField(max_length=255, required=False, label='', widget=forms.TextInput(attrs={'placeholder': 'Company Name'}) )
    phone = forms.CharField(max_length=25, label='', widget=forms.TextInput(attrs={'placeholder': 'Phone'}) )
    email = forms.EmailField(label='', widget=forms.EmailInput(attrs={'placeholder': 'Email'}))
    # country = forms.CharField(max_length=20, required=False,  label='', widget=forms.TextInput(attrs={'placeholder': 'Country'}))
    country = forms.ChoiceField(choices=get_py_country(), required=False, label='',
                                widget=forms.Select(attrs={'placeholder': 'Country'}))
    products = forms.ChoiceField(choices=get_product_list(), required=False, label='', initial=settings.CONTACT_FORM_DEFAULT_PRODUCT,
                                 widget=forms.Select(attrs={'placeholder': 'Products'}))
    message = forms.CharField(required=False, label='', widget=forms.Textarea(attrs={'rows': 4, 'placeholder': 'Write Your Requirement'}))

    captcha = ReCaptchaField(widget=ReCaptchaV2Checkbox)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['captcha'].public_key = ApplicationSettings.for_site(self.request.site).recaptcha_public_key
        self.fields['captcha'].private_key = ApplicationSettings.for_site(self.request.site).recaptcha_private_key
        self.fields['captcha'].widget.attrs["data-sitekey"] = self.fields['captcha'].public_key

        self.helper = FormHelper()
        self.helper.layout = Layout(
            Div('name'),
            Div('company_name'),
            Div(
                Div('phone', css_class='col-md-6 col-sm-12 col-xs-12'),
                Div('email', css_class='col-md-6 col-sm-12 col-xs-12'),
                css_class='row'
            ),
            Div(
                Div('country', css_class='col-md-6 col-sm-12 col-xs-12'),
                Div('products', css_class='col-md-6 col-sm-12 col-xs-12'),
                css_class='row'
            ),
            Div('message'),
            Div('captcha'),
            Div(
                Submit('Submit', 'Submit', css_class='btn btn-outline-primary'),
                css_class='form-action-wrap text-center'
            )
        )

    def is_valid(self):
        if super().is_valid():
            threading.Thread(target=send_email_async, args=[self.data]).start()
            messages.success(self.request, 'Your message has been sent successfully.')
            return True
        else:
            return False
