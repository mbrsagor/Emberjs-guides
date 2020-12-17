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
    DitEmailAddon().send_email_default(contact_email, 'contact', data)
    DitEmailAddon().send_email_default(data['email'], 'contact_reply', data)


class NavanaContactForm(HyperForm):
    name = forms.CharField(max_length=255, label='Name', widget=forms.TextInput(attrs={'placeholder': 'Name'}) )
    subject = forms.CharField(max_length=255, required=False, label='Subject', widget=forms.TextInput(attrs={'placeholder': 'Subject'}) )
    email = forms.EmailField(label='Email', widget=forms.EmailInput(attrs={'placeholder': 'Email'}))
    phone = forms.CharField(max_length=25, label='Phone', widget=forms.TextInput(attrs={'placeholder': 'Phone'}) )
    message = forms.CharField(required=False, label='Message', widget=forms.Textarea(attrs={'rows': 5, 'placeholder': 'Write Your Requirement'}))

    captcha = ReCaptchaField(widget= ReCaptchaV2Checkbox)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # ReCaptcha Functionality
        self.fields['captcha'].public_key = ApplicationSettings.for_site(self.request.site).recaptcha_public_key
        self.fields['captcha'].private_key = ApplicationSettings.for_site(self.request.site).recaptcha_private_key
        self.fields['captcha'].widget.attrs["data-sitekey"] = self.fields['captcha'].public_key

        self.helper = FormHelper()
        self.helper.layout = Layout(

            Div(
                Div('name', css_class='col-4'),
                Div('email', css_class='col-4'),
                Div('phone', css_class='col-4'),
                css_class='row'
            ),
            Div('subject'),
            Div('message'),
            Div('captcha'),
            Div(
                Submit('Submit', 'Submit', css_class='btn btn-primary'),
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
