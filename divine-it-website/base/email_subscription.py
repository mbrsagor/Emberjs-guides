from django import forms
from django.db import IntegrityError
from dit_email_addon.api import DitEmailAddon
from crispy_forms.helper import Layout, FormHelper
from crispy_forms.layout import Submit
from crispy_forms.bootstrap import Div
from django.contrib import messages
from wagtailhyper.forms import HyperForm
import threading
from .models import *


def send_email_async(data):
    contact_email = getattr(settings, 'CONTACT_EMAIL', 'sagor@divine-it.net')
    DitEmailAddon().send_email_default(contact_email, 'contact', data)
    DitEmailAddon().send_email_default(data['email'], 'contact_reply', data)


class EmailSubscriptionFrom(HyperForm):
    name = forms.CharField(max_length=50,
                           widget=forms.TextInput(attrs={'placeholder': 'Your Name'}))
    email = forms.EmailField(required=True,
                             widget=forms.EmailInput(attrs={'placeholder': 'Your Email Address.'}))

    class Meta:
        model = EmailSubscription
        fields = ['name', 'email']

    def __init__(self, *args, **kwargs):
        super(EmailSubscriptionFrom, self).__init__(*args, **kwargs)

        self.helper = FormHelper()

        self.helper.layout = Layout(
            Div(
                Div('name', css_class='form-subscription-wrap'),
                Div('email', css_class='form-subscription-wrap'),
                Div(
                    Submit('Submit', 'subscribe', css_class='btn btn-outline-primary'),
                    css_class='EmailSubscriptionBtn'
                )
            )
        )

    def is_valid(self):
        try:
            save_data = EmailSubscription.objects.create(
                name=self.data['name'],
                email=self.data['email'],
            )
            save_data.save()
            threading.Thread(target=send_email_async, args=[self.data]).start()
            messages.success(self.request, 'Your subscription has been successfully.')
            return True
        except IntegrityError as e:
            print(str(e))
            return False
