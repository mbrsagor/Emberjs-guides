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

def send_email_async(data):
    contact_email = getattr(settings, 'CONTACT_EMAIL', 'shimul@divine-it.net')
    DitEmailAddon().send_email_default(contact_email, 'vapt_qoute', data)
    DitEmailAddon().send_email_default(data['email'], 'vapt_qoute_reply', data)

class VaptForm(HyperForm):
    firstname = forms.CharField(max_length=255, label='First Name', widget=forms.TextInput(attrs={'placeholder': 'Enter First Name'}) )
    lastname = forms.CharField(max_length=255, label='Last Name', widget=forms.TextInput(attrs={'placeholder': 'Enter Last Name'}))
    website = forms.CharField(max_length=250, label='Website Address', widget=forms.TextInput(attrs={'placeholder':'Enter Website Address'}))
    email = forms.EmailField(label='Email', widget=forms.EmailInput(attrs={'placeholder': 'Email'}))
    phone = forms.CharField(max_length=25, required=False, label='Business Phone', widget=forms.TextInput(attrs={'placeholder': 'Business Phone'}))
    message = forms.CharField(required=False, label='Message', widget=forms.Textarea(attrs={'rows': 5, 'placeholder': 'Write Your Requirement'}))
    
    captcha = ReCaptchaField(widget=ReCaptchaV2Checkbox)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # ReCaptcha Functionality
        self.fields['captcha'].public_key = ApplicationSettings.for_site(self.request.site).recaptcha_public_key
        self.fields['captcha'].private_key = ApplicationSettings.for_site(self.request.site).recaptcha_private_key
        self.fields['captcha'].widget.attrs["data-sitekey"] = self.fields['captcha'].public_key

        self.helper = FormHelper()
        self.helper.layout = Layout(

            Div(
                Div('firstname', css_class='col-6'),
                Div('lastname', css_class='col-6'),
                css_class='row'
            ),
            Div(
                Div('website', css_class='col-12'),
                css_class='row'
            ),
            Div(
                Div('email', css_class='col-6'),
                Div('phone', css_class='col-6'),
                css_class='row'
            ),
            Div('message'),
            Div('captcha'),
            Div(
                Submit('Submit', 'Get Free VAPT', css_class='btn btn-warning text-white'),
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



# dlp demo from
# new form for DLP
def send_email_async(data):
    contact_email = getattr(settings, 'CONTACT_EMAIL', 'shimul@divine-it.net')
    DitEmailAddon().send_email_default(contact_email, 'dlp_qoute', data)
    DitEmailAddon().send_email_default(data['email'], 'dlp_reply', data)

class CustomQuoteForm(HyperForm):
    firstname = forms.CharField(max_length=255, label='First Name', widget=forms.TextInput(attrs={'placeholder': 'Enter First Name'}) )
    lastname = forms.CharField(max_length=255, label='Last Name', widget=forms.TextInput(attrs={'placeholder': 'Enter Last Name'}))
    website = forms.CharField(max_length=250, label='Website Address', widget=forms.TextInput(attrs={'placeholder':'Enter Website Address'}))
    email = forms.EmailField(label='Email', widget=forms.EmailInput(attrs={'placeholder': 'Email'}))
    phone = forms.CharField(max_length=25, required=False, label='Business Phone', widget=forms.TextInput(attrs={'placeholder': 'Business Phone'}))
    message = forms.CharField(required=False, label='Message', widget=forms.Textarea(attrs={'rows': 5, 'placeholder': 'Write Your Requirement'}))
    
    captcha = ReCaptchaField(widget=ReCaptchaV2Checkbox)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # ReCaptcha Functionality
        self.fields['captcha'].public_key = ApplicationSettings.for_site(self.request.site).recaptcha_public_key
        self.fields['captcha'].private_key = ApplicationSettings.for_site(self.request.site).recaptcha_private_key
        self.fields['captcha'].widget.attrs["data-sitekey"] = self.fields['captcha'].public_key

        self.helper = FormHelper()
        self.helper.layout = Layout(

            Div(
                Div('firstname', css_class='col-6'),
                Div('lastname', css_class='col-6'),
                css_class='row'
            ),
            Div(
                Div('website', css_class='col-12'),
                css_class='row'
            ),
            Div(
                Div('email', css_class='col-6'),
                Div('phone', css_class='col-6'),
                css_class='row'
            ),
            Div('message'),
            Div('captcha'),
            Div(
                Submit('Submit', 'Get Free Demo', css_class='btn btn-warning text-white'),
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




"""
Partner Form for NDV website
"""
def send_email_async(data):
    contact_email = getattr(settings, 'CONTACT_EMAIL', 'shimul@divine-it.net')
    DitEmailAddon().send_email_default(contact_email, 'partner_qoutes', data)
    DitEmailAddon().send_email_default(data['email'], 'partner_reply', data)

class PartnerQuote(HyperForm):
    first_name = forms.CharField(max_length=255, label='First Name', widget=forms.TextInput(attrs={'placeholder': 'Enter First Name'}) )
    last_name = forms.CharField(max_length=255, required=False, label='Last Name', widget=forms.TextInput(attrs={'placeholder': 'Enter Last Name'}))
    phone = forms.CharField(max_length=25, label='Contact Number', widget=forms.TextInput(attrs={'placeholder': 'Contact Mobile Number'}))
    email = forms.EmailField(label='Business Email', widget=forms.EmailInput(attrs={'placeholder': 'ndv@gmail.com'}))
    address = forms.CharField(max_length=250, required=False, label='Address', widget=forms.TextInput(attrs={'placeholder':'Enter Address'}))
    state = forms.CharField(max_length=20, required=False, label='State', widget=forms.TextInput(attrs={'placeholder':'Enter State'}))
    city = forms.CharField(max_length=255, required=False, label='City', widget=forms.TextInput(attrs={'placeholder':'Enter City'}))
    pin_code = forms.CharField(max_length=10, required=False, label='Pin Code', widget=forms.TextInput(attrs={'placeholder':'Enter Area Code'}))
    message = forms.CharField(label='Comments', widget=forms.Textarea(attrs={'rows': 5, 'placeholder': ''}))
    
    captcha = ReCaptchaField(widget=ReCaptchaV2Checkbox)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # ReCaptcha Functionality
        self.fields['captcha'].public_key = ApplicationSettings.for_site(self.request.site).recaptcha_public_key
        self.fields['captcha'].private_key = ApplicationSettings.for_site(self.request.site).recaptcha_private_key
        self.fields['captcha'].widget.attrs["data-sitekey"] = self.fields['captcha'].public_key

        self.helper = FormHelper()
        self.helper.layout = Layout(

            Div(
                Div('first_name', css_class='col-6'),
                Div('last_name', css_class='col-6'),
                css_class='row'
            ),
            Div(
                Div('email', css_class='col-6'),
                Div('phone', css_class='col-6'),
                css_class='row'
            ),
            Div(
                Div('address', css_class='col-12'),
                css_class='row'
            ),
            Div(
                Div('city', css_class='col-4'),
                Div('state', css_class='col-4'),
                Div('pin_code', css_class='col-4'),
                css_class='row'
            ),
            Div('message'),
            Div('captcha'),
            Div(
                Submit('Submit', 'Send Mail', css_class='btn btn-warning text-white'),
                css_class='form-action-wrap'
            )

        )

    def is_valid(self):
        if super().is_valid():
            threading.Thread(target=send_email_async, args=[self.data]).start()
            messages.success(self.request, 'Your message has been sent successfully to System.')
            return True
        else:
            return False    