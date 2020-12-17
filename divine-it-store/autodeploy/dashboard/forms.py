from django import forms
from autodeploy.models import ServiceRecord


class DeactivateForm(forms.Form):
    delete = forms.ChoiceField(choices=((True, 'Yes'), (False, 'No')))
