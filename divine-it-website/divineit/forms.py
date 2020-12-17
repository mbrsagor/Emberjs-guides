import threading
from django import forms
from crispy_forms.helper import Layout, FormHelper
from crispy_forms.layout import Submit
from crispy_forms.bootstrap import Div
from wagtailhyper.forms import HyperForm
from divineit.models import Industry
from dit_email_addon.api import DitEmailAddon
from captcha.fields import ReCaptchaField
from captcha.widgets import ReCaptchaV2Checkbox
from django.contrib import messages
from django.conf import settings
from base.models import ApplicationSettings
from base.forms import get_product_list, get_py_country


def get_type_of_business():
    return [('', 'Select Industry Type')] + list(map(lambda x: (x.name, x.name), Industry.objects.all()))


class LoginForm(HyperForm):
    username = forms.CharField(max_length=255, label='', widget=forms.TextInput(attrs={'placeholder': 'Username'}))
    password = forms.CharField(max_length=255, label='', widget=forms.PasswordInput(attrs={'placeholder': 'Password'}))

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Div(
                Submit('Submit', 'Submit', css_class='btn btn-outline-primary'),
                css_class='form-action-wrap text-center'
            )
        )


def send_email_async(data):
    contact_email = getattr(settings, 'CONTACT_EMAIL', 'shimul@divine-it.net')
    DitEmailAddon().send_email_default(contact_email, 'qoute', data)
    DitEmailAddon().send_email_default(data['email'], 'qoute_reply', data)


class ScheduleDemoForm(HyperForm):
    name = forms.CharField(max_length=255, label='', widget=forms.TextInput(attrs={'placeholder': 'Name'}))
    company_name = forms.CharField(max_length=255, required=False, label='',
                                   widget=forms.TextInput(attrs={'placeholder': 'Company Name'}))
    phone = forms.CharField(max_length=25, label='', widget=forms.TextInput(attrs={'placeholder': 'Phone'}))
    email = forms.EmailField(label='', widget=forms.EmailInput(attrs={'placeholder': 'Email'}))

    job_title = forms.CharField(max_length=20, required=False, label='',
                                widget=forms.TextInput(attrs={'placeholder': 'Job Title'}))

    employees = forms.CharField(max_length=20, required=False, label='',
                                widget=forms.NumberInput(attrs={'placeholder': 'No of Employees', 'min': 1}))

    yearly_turnover = forms.CharField(max_length=20, required=False, label='',
                                      widget=forms.NumberInput(attrs={'placeholder': 'Yearly Turnover'}))

    type_of_business = forms.ChoiceField(choices=get_type_of_business(), required=False, label='',
                                       widget=forms.Select(attrs={'placeholder': 'Type of Business'}))

    # country = forms.CharField(max_length=20, required=False, label='',
    #                           widget=forms.TextInput(attrs={'placeholder': 'Country'}))
    country = forms.ChoiceField(choices=get_py_country(), required=False, label='',
                                widget=forms.Select(attrs={'placeholder': 'Country'}))
    products = forms.ChoiceField(choices=get_product_list(), required=False, label='',
                                 initial=settings.CONTACT_FORM_DEFAULT_PRODUCT,
                                 widget=forms.Select(attrs={'placeholder': 'Products'}))

    interested_in = forms.CharField(max_length=20, required=False, label='',
                                    widget=forms.TextInput(attrs={'placeholder': 'Interested in'}))

    message = forms.CharField(required=False, label='',
                              widget=forms.Textarea(attrs={'rows': 4, 'placeholder': 'Describe your requirement here'}))
    
    captcha = ReCaptchaField(widget=ReCaptchaV2Checkbox)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # captcha functionality start here
        self.fields['captcha'].public_key = ApplicationSettings.for_site(self.request.site).recaptcha_public_key
        self.fields['captcha'].private_key = ApplicationSettings.for_site(self.request.site).recaptcha_private_key
        self.fields['captcha'].widget.attrs["data-sitekey"] = self.fields['captcha'].public_key

        self.helper = FormHelper()
        self.helper.layout = Layout(
            Div(
                Div('name', css_class='col-md-6 col-sm-12 col-xs-12'),
                Div('company_name', css_class='col-md-6 col-sm-12 col-xs-12'),
                css_class='row'
            ),
            Div(
                Div('phone', css_class='col-md-6 col-sm-12 col-xs-12'),
                Div('email', css_class='col-md-6 col-sm-12 col-xs-12'),
                css_class='row'
            ),
            Div(
                Div('job_title', css_class='col-md-6 col-sm-12 col-xs-12'),
                Div('employees', css_class='col-md-6 col-sm-12 col-xs-12'),
                css_class='row'
            ),
            Div(
                Div('yearly_turnover', css_class='col-md-6 col-sm-12 col-xs-12'),
                Div('type_of_business', css_class='col-md-6 col-sm-12 col-xs-12'),
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

        # import pdb; pdb.set_trace()
    def is_valid(self):
        if super().is_valid():
            threading.Thread(target=send_email_async, args=[self.data]).start()
            messages.success(self.request, 'Your message has been sent successfully.')
            return True
        else:
            return False