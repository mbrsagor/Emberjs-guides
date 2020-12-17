from django import forms
from allauth.account.forms import SignupForm as BaseSignupForm, LoginForm as BaseLoginForm
from phonenumber_field.formfields import PhoneNumberField


class SignupForm(BaseSignupForm):
    first_name = forms.CharField(required=True)
    last_name = forms.CharField(required=True)
    company_name = forms.CharField(required=True)
    mobile_number = PhoneNumberField(required=True)
