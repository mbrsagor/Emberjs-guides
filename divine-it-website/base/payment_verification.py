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

# def get_type_of_business():
#     CHOICES = (('Option 1', 'Option 1'),('Option 2', 'Option 2'),)
PAYMENT_METHOD = (
    ('1', 'Bkash'),
    ('2', 'Rocket'),
)


def send_email_async(data):
    contact_email = getattr(settings, 'VARIFICATION_FORM', 'lokman@divine-it.net')
    DitEmailAddon().send_email_default(contact_email, 'contact', data)
    DitEmailAddon().send_email_default(data['email'], 'contact_reply', data)


class VerifyPayment(HyperForm):
    phone = forms.CharField(max_length=25, required=True, label='You Phone Number ',
                            widget=forms.TextInput(attrs={'placeholder': 'From Which Number You Have Paid'}))
    email = forms.EmailField(label='Email', required=True,
                             widget=forms.EmailInput(attrs={'placeholder': 'Your Email Address'}))
    txn_id = forms.CharField(max_length=20, required=True, label='Transaction Id ',
                             widget=forms.TextInput(attrs={'placeholder': 'Transaction Id'}))
    payment_method = forms.ChoiceField(choices=PAYMENT_METHOD, label='Payment System ', initial='',
                                       widget=forms.Select(), required=True)
    team_name = forms.CharField(max_length=50, required=True, label='Team Name*',
                                widget=forms.TextInput(attrs={'placeholder': 'Your answer'}))
    leader_name = forms.CharField(max_length=50, required=True, label="Leader's Name",
                                  widget=forms.TextInput(attrs={'placeholder': 'Your answer'}))
    member_one_name = forms.CharField(max_length=50, required=True, label="Member's Name 1",
                                      widget=forms.TextInput(attrs={'placeholder': 'Your answer'}))
    member_two_name = forms.CharField(max_length=50, required=True, label="Member's name 2",
                                      widget=forms.TextInput(attrs={'placeholder': 'Your answer', 'class': 'stepTwo'}))
    member_three_name = forms.CharField(max_length=50, required=True, label="Member's name 3", widget=forms.TextInput(
        attrs={'placeholder': "Your answer", 'class': 'stepTwo'}))
    leader_email = forms.EmailField(label="Leader's Mail *", required=True,
                                    widget=forms.EmailInput(attrs={'placeholder': "Your answer", 'class': 'stepTwo'}))
    university_name = forms.CharField(max_length=100, label="University Name *", required=True,
                                      widget=forms.TextInput(attrs={'placeholder': "Your answer", 'class': 'stepTwo'}))
    department = forms.CharField(max_length=50, label="Department *", required=True,
                                 widget=forms.TextInput(attrs={'placeholder': "Your answer", 'class': 'stepTwo'}))
    session = forms.CharField(max_length=100, label="Session ( Leader's + 2 Member ) *", required=True,
                              widget=forms.TextInput(attrs={'placeholder': "Your answer", 'class': 'stepTwo'}))
    leader_phone = forms.CharField(max_length=20, label="Leader's Contact Number *", required=True,
                                   widget=forms.TextInput(attrs={'placeholder': "Your answer", 'class': 'stepTwo'}))
    # send_response = forms.CheckboxInput(attrs={'class': 'stepTwo'})

    captcha = ReCaptchaField(widget=ReCaptchaV2Checkbox)

    class Meta:
        model = PaymentVerify
        field = [
            'phone', 'email', 'txn_id',
            'payment_method', 'team_name',
            'member_one_name', 'member_two_name',
            'member_three_name', 'leader_email',
            'university_name', 'department',
            'session', 'leader_phone'
        ]

    def __init__(self, *args, **kwargs):
        super(VerifyPayment, self).__init__(*args, **kwargs)

        self.fields['captcha'].public_key = ApplicationSettings.for_site(self.request.site).recaptcha_public_key
        self.fields['captcha'].private_key = ApplicationSettings.for_site(self.request.site).recaptcha_private_key
        self.fields['captcha'].widget.attrs["data-sitekey"] = self.fields['captcha'].public_key
        # self.fields['captcha'].widget.attrs["class"] = "stepTwo"

        self.helper = FormHelper()
        self.helper.layout = Layout(
            Div(
                Div('email'),
                Div('phone'),
                Div('payment_method'),
                Div('txn_id'),
                Div(
                    Button(type="button", value="Next", css_id="btnSubmitNext", css_class="btn btn-primary btn btn-outline-primary" ,name="Next"),
                ),
                css_class="step1"
            ),
            Div(
                Div('team_name'),
                Div('leader_name'),
                Div('member_one_name'),
                Div('member_two_name'),
                Div('member_three_name'),
                Div('leader_email'),
                Div('university_name'),
                Div('department'),
                Div('session'),
                Div('leader_phone'),
                Div('captcha'),
                Div(
                    Button(type="button", value="Prev", css_id="btnSubmitPrev", css_class="btn btn-primary btn btn-outline-primary", name="Prev"),
                    Submit('Submit', 'Submit', css_class='btn btn-outline-primary'),
                    css_class='form-action-wrap text-center'
                ),
                css_class="step2"
            ),
        )

    def is_valid(self):
        try:
            save_data = PaymentVerify.objects.create(
                phone=self.data['phone'],
                email=self.data['email'],
                txn_id=self.data['txn_id'],
                payment_method=self.data['payment_method'],
                team_name=self.data['team_name'],
                leader_name=self.data['leader_name'],
                member_one_name=self.data['member_one_name'],
                member_two_name=self.data['member_two_name'],
                member_three_name=self.data['member_three_name'],
                leader_email=self.data['leader_email'],
                university_name=self.data['university_name'],
                department=self.data['department'],
                session=self.data['session'],
                leader_phone=self.data['leader_phone']
            )
            save_data.save()
            threading.Thread(target=send_email_async, args=[self.data]).start()
            messages.success(self.request, 'Your message has been sent successfully.')
            return True
        except IntegrityError as e:
            print(str(e))
            return False