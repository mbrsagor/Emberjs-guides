from django import forms
from autodeploy.models import ServiceRecord
from django.core.validators import RegexValidator
from oscar.core.loading import get_model

Product = get_model('catalogue', 'Product')


class AutodeployForm(forms.Form):
    product = forms.ModelChoiceField(queryset=Product.objects.filter(auto_deploy_enable=True), widget=forms.HiddenInput)
    sub_domain = forms.CharField(label='Sub-domain', max_length=20, required=True, validators=[
        RegexValidator(regex=r'^[a-z0-9]+$', message='Only use alphanumeric characters without any spaces. ex: a-z and 0-9')
    ])

    def clean_sub_domain(self):
        sub_domain = self.cleaned_data['sub_domain'].lower()
        product = self.cleaned_data['product']
        if ServiceRecord.objects.filter(sub_domain=sub_domain, domain_code=product.auto_deploy_domain_code).exists():
            self.add_error('sub_domain', 'This sub domain already taken!')
        return sub_domain
