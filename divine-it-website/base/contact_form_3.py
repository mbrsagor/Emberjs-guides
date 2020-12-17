from django import forms
from django.db import IntegrityError
from django.shortcuts import render_to_response
from dit_email_addon.api import DitEmailAddon
from django.conf import settings
from crispy_forms.helper import Layout, FormHelper
from crispy_forms.layout import Submit, Button
from crispy_forms.bootstrap import Div
from django.contrib import messages
from wagtailhyper.forms import HyperForm
import threading
from captcha.fields import ReCaptchaField
from captcha.widgets import ReCaptchaV2Checkbox
from django.core.exceptions import ValidationError
from base.models import ApplicationSettings
from .models import *



def send_email_async(data):
    contact_email = getattr(settings, 'CONTACT_EMAIL', 'sagor@divine-it.net')
    DitEmailAddon().send_email_default(contact_email, 'custom_quote', data)
    DitEmailAddon().send_email_default(data['email_address'], 'contact_form_3', data)


class ContactFormThree(HyperForm):
    first_name = forms.CharField(max_length=30, required=True, label='First name (required)',
                                widget=forms.TextInput)

    last_name = forms.CharField(max_length=30, required=False, label='Last name',
                                widget=forms.TextInput)

    phone = forms.CharField(max_length=25, required=True, label='Phone (required)',
                                widget=forms.TextInput)

    email_address = forms.EmailField(max_length=25, required=True, label='Email (required)',
                                    widget=forms.TextInput)

    company_name = forms.CharField(max_length=90, required=False, label='Company',
                            widget=forms.TextInput)

    message = forms.CharField(required=False, label='Tell us about your requirements (required)',
                              widget=forms.Textarea(attrs={'rows': 4}))
    captcha = ReCaptchaField(widget=ReCaptchaV2Checkbox)

    class Meta:
        model = ContentForm3
        field = [
            'full_name', 'last_name', 'phone',
            'email_address','company_name', 'message'
        ]

    def __init__(self, *args, **kwargs):
        super(ContactFormThree, self).__init__(*args, **kwargs)

        self.fields['captcha'].public_key = ApplicationSettings.for_site(self.request.site).recaptcha_public_key
        self.fields['captcha'].private_key = ApplicationSettings.for_site(self.request.site).recaptcha_private_key
        self.fields['captcha'].widget.attrs["data-sitekey"] = self.fields['captcha'].public_key

        self.helper = FormHelper()

        self.helper.layout = Layout(
            Div(
                Div('first_name', css_class='form-contactForm3'),
                Div('last_name', css_class='form-contactForm3'),
                Div('phone', css_class='form-contactForm3'),
                Div('email_address', css_class='form-contactForm3'),
                Div('company_name', css_class='form-contactForm3'),
                Div('message', css_class='form-contactForm3'),
                Div(
                    Submit('Submit', 'I Would Like To Know More', css_class='form-contactForm3_btn'),
                    css_class='contactForm3Btn'
                )
            )
        )


    def is_valid(self):
        try:
            save_data = ContentForm3.objects.create(
                first_name=self.data['first_name'],
                last_name=self.data['last_name'],
                phone=self.data['phone'],
                email_address=self.data['email_address'],
                company_name=self.data['company_name'],
                message=self.data['message'],
            )
            save_data.save()
            threading.Thread(target=send_email_async, args=[self.data]).start()
            messages.success(self.request, 'Your message has been send successfully.')
            return True
        except IntegrityError as e:
            print(str(e))
            return False
