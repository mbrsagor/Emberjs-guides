from django import forms
from dit_email_addon.api import DitEmailAddon
from django.conf import settings
from crispy_forms.helper import Layout, FormHelper
from crispy_forms.layout import Submit
from crispy_forms.bootstrap import Div
from django.contrib import messages
from wagtailhyper.forms import HyperForm
import threading

# def get_type_of_business():
#     CHOICES = (('Option 1', 'Option 1'),('Option 2', 'Option 2'),)
TRAVEL_CLASS = (
    ('1','Economy Class'),
    ('2','Premium Flatbed'),
    ('3','Premium Flex'),
)

ADULTS = (
    ('1','1'),
    ('2','2'),
    ('3','3'),
    ('4','4'),
    ('5','5'),
    ('6','6'),
    ('7','7'),
)

CHILDREN = (
    ('0','0'),
    ('1','1'),
    ('2','2'),
    ('3','3'),
    ('4','4'),
    ('5','5'),
)

INFANT = (
    ('0','0'),
    ('1','1'),
    ('2','2'),
    ('3','3'),
    ('4','4'),
    ('5','5'),
)


def send_email_async(data):
    contact_email = getattr(settings, 'CONTACT_EMAIL', 'aminul@divine-it.net')
    DitEmailAddon().send_email_default(contact_email, 'contact', data)
    DitEmailAddon().send_email_default(data['email'], 'contact_reply', data)

class BookingFrom(HyperForm):
    flyingfrom = forms.CharField(max_length=255, label='Flying from', widget=forms.TextInput(attrs={'placeholder': 'flying from'}) )
    flyingto = forms.CharField(max_length=255, required=True, label='Flying to', widget=forms.TextInput(attrs={'placeholder': 'flying to'}) )
    checkin = forms.DateField( label='Check in', widget=forms.TextInput(attrs={'type' : 'date', 'placeholder': 'check in'}))
    checkout = forms.DateField( label='Check out', widget=forms.TextInput(attrs={'type' : 'date', 'placeholder': 'check out'}))
    travel_class = forms.ChoiceField(choices = TRAVEL_CLASS, label='Travel class', initial='', widget=forms.Select(), required=True)
    adults = forms.ChoiceField(choices = ADULTS, label='Adults', initial='', widget=forms.Select(), required=False)
    children = forms.ChoiceField(choices = CHILDREN, label='Children', initial='', widget=forms.Select(), required=False)
    infant = forms.ChoiceField(choices = INFANT, label='Infant', initial='', widget=forms.Select(), required=False)


    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Div(
                Div('flyingfrom', css_class='col-3'),
                Div('flyingto', css_class='col-3'),
                Div('checkin', css_class='col-3'),
                Div('checkout', css_class='col-3'),
                css_class='row'
            ),
            Div(
                Div('travel_class', css_class='col-3'),
                Div('adults', css_class='col-2'),
                Div('children', css_class='col-2'),
                Div('infant', css_class='col-2'),
                Submit('submit', 'Check Availability', css_class='col-2 btn order-btn ml-5'),
                css_class='row form-action-bottom'

            )
        )

    def is_valid(self):
        if super().is_valid():
            threading.Thread(target=send_email_async, args=[self.data]).start()
            messages.success(self.request, 'Your message has been sent successfully.')
            return True
        else:
            return False
