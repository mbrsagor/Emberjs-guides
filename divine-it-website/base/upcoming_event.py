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
    contact_email = getattr(settings, 'VOLUNTEER_REGISTRATION', 'sagor@divine-it.net')
    DitEmailAddon().send_email_default(contact_email, 'contact', data)
    DitEmailAddon().send_email_default(data['email'], 'upcoming_event', data)


class UpcomingEventForm(HyperForm):
    full_name = forms.CharField(max_length=30, required=True, label='Your full name',
                                widget=forms.TextInput(attrs={'placeholder': 'Enter your full name.'}))

    department_name = forms.CharField(max_length=30, required=True, label='Your department name',
                                      widget=forms.TextInput(attrs={'placeholder': 'Enter your department name.'}))
    id_no = forms.CharField(max_length=25, required=True, label="Input your Id no.", widget=forms.TextInput(attrs={'placeholder': 'Enter your ID no.'}))
    email = forms.EmailField(label='Email', required=True,
                             widget=forms.EmailInput(attrs={'placeholder': 'Your email address.'}))
    contact_number = forms.CharField(max_length=14, required=True, label='You contact number ',
                                     widget=forms.TextInput(attrs={'placeholder': 'Enter your valid contact number.'}))

    emergency_contact_number = forms.CharField(max_length=14, required=True, label='Emergency contact number',
                                               widget=forms.TextInput(
                                                   attrs={'placeholder': 'Enter valid emergency contact number.'}))

    session = forms.CharField(max_length=14, required=True, label='Session',
                              widget=forms.TextInput(attrs={'placeholder': 'Enter your session.'}))

    linkedIn_profile = forms.CharField(required=True, label='LinkedIn profile',
                                       widget=forms.TextInput(attrs={'placeholder': 'Enter your linkedIn profile link.'}))

    drop_resume = forms.FileField(required=True, widget=forms.ClearableFileInput(attrs={'multiple': True}), label = ('Drop your resume'))
    profile_photo = forms.FileField(required=False, widget=forms.ClearableFileInput())
    about_yourself = forms.CharField(widget=forms.Textarea(attrs={'rows': 5, 'cols': 100, 'placeholder':'Within in 150-200 words.'}))
    three_best_skill = forms.CharField(widget=forms.Textarea(attrs={'rows': 5, 'cols': 100}))
    public_speaking = forms.CharField(max_length=500, required=True, label='Do you have any experience in hosting, public speaking ?',
                                      widget=forms.TextInput(attrs={
                                          'placeholder': 'Yes, where ?'}))

    experience = forms.CharField(max_length=500, required=True, label='Do you have any voluntary experience ? ',
                                 widget=forms.TextInput(
                                     attrs={'placeholder': 'Yes, write briefly.'}))

    technical_skills = forms.CharField(label="Do you have any technical skills ?",widget=forms.Textarea(attrs={'rows': 5, 'cols': 100, 'placeholder': 'Such as Graphics Design, photography, MS Office, etc.'}))
    why_join_us = forms.CharField(label="Why you want to join with us ?", widget=forms.Textarea(attrs={'rows': 5, 'cols': 100}))
    SDC_future_goal = forms.CharField(max_length=500, required=True, label='Do you think working in SDC will help you to achieve your future goal ? ',
                                      widget=forms.TextInput(attrs={
                                          'placeholder': 'Yes how ?'}))

    involved_any_other_club = forms.CharField(max_length=500, required=True, label='Are you involved in any other club/organization at JKKNIU ? ',
                                              widget=forms.TextInput(attrs={
                                                  'placeholder': 'Yes, which club ?'}))

    do_you_for_SDC = forms.CharField(max_length=70, required=True, label='What can you do for SDC ?',
                                     widget=forms.TextInput())
    captcha = ReCaptchaField(widget=ReCaptchaV2Checkbox)

    class Meta:
        model = UpcomingEvent
        field = [
            'full_name', 'department_name', 'contact_number', 'emergency_contact_number','id_no', 'email',
            'linkedIn_profile', ' drop_resume', 'profile_photo', 'experience', 'about_yourself',
            'three_best_skill', 'public_speaking', 'technical_skills', 'why_join_us',
            'SDC_future_goal', 'involved_any_other_club', 'do_you_for_SDC', 'session'
        ]

    def __init__(self, *args, **kwargs):
        super(UpcomingEventForm, self).__init__(*args, **kwargs)

        self.fields['captcha'].public_key = ApplicationSettings.for_site(self.request.site).recaptcha_public_key
        self.fields['captcha'].private_key = ApplicationSettings.for_site(self.request.site).recaptcha_private_key
        self.fields['captcha'].widget.attrs["data-sitekey"] = self.fields['captcha'].public_key

        self.helper = FormHelper()

        self.helper.layout = Layout(
            Div(
                Div('full_name'),
                Div('department_name'),
                Div('email'),
                Div('id_no'),
                Div('contact_number'),
                Div('emergency_contact_number'),
                Div('session'),
                Div('linkedIn_profile'),
                Div('drop_resume'),
                Div('profile_photo'),
                Div(
                    Button(type="button", value="Next", css_id="btnSubmitNext",
                           css_class="btn btn-primary btn btn-outline-primary", name="Next"),
                ),
                css_class="step1"
            ),
            Div(
                Div('about_yourself'),
                Div('three_best_skill'),
                Div('experience'),
                Div('public_speaking'),
                Div('technical_skills'),
                Div('why_join_us'),
                Div('SDC_future_goal'),
                Div('involved_any_other_club'),
                Div('do_you_for_SDC'),
                Div('captcha'),
                Div(
                    Button(type="button", value="Prev", css_id="btnSubmitPrev",
                           css_class="btn btn-primary btn btn-outline-primary", name="Prev"),
                    Submit('Submit', 'Submit', css_class='btn btn-outline-primary'),
                    css_class='form-action-wrap text-center'
                ),
                css_class="step2"
            ),
        )

    def is_valid(self):
        try:
            save_data = UpcomingEvent.objects.create(
                full_name=self.data['full_name'],
                department_name=self.data['department_name'],
                id_no=self.data['id_no'],
                email=self.data['email'],
                contact_number=self.data['contact_number'],
                emergency_contact_number=self.data['emergency_contact_number'],
                session=self.data['session'],
                linkedIn_profile=self.data['linkedIn_profile'],
                drop_resume=self.data['drop_resume'],
                profile_photo=self.data['profile_photo'],
                about_yourself=self.data['about_yourself'],
                three_best_skill=self.data['three_best_skill'],
                public_speaking=self.data['public_speaking'],
                technical_skills=self.data['technical_skills'],
                experience=self.data['experience'],
                why_join_us=self.data['why_join_us'],
                SDC_future_goal=self.data['SDC_future_goal'],
                involved_any_other_club=self.data['involved_any_other_club'],
                do_you_for_SDC=self.data['do_you_for_SDC'],
            )
            save_data.save()
            threading.Thread(target=send_email_async, args=[self.data]).start()
            messages.success(self.request, 'Your message has been sent successfully.')
            return True
        except IntegrityError as e:
            print(str(e))
            return False
