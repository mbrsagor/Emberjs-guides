from django.db import models
from django.contrib.auth.models import AbstractUser
from django.urls import reverse
from djangohyper.fields import HyperField
from phonenumber_field.modelfields import PhoneNumberField
from allauth.account.models import EmailAddress
from oscar.core.loading import get_model
import json

Product = get_model('catalogue', 'Product')


class User(AbstractUser):
    company_name = models.CharField(max_length=255, blank=True, null=True, default=None)
    mobile_number = PhoneNumberField(blank=True)
    sts_username = models.CharField(max_length=100, blank=True, null=True)
    sts_password = models.CharField(max_length=100, blank=True, null=True)
    cert_client_code = models.CharField(max_length=512, default=None, null=True, blank=True)

    max_free_trial_per_product = models.IntegerField(default=1, blank=True, null=True)
    max_total_autodeploy = models.IntegerField(default=-1, blank=True, null=True)

    @property
    def email_verified(self):
        return EmailAddress.objects.filter(user=self, verified=True).exists()


class Menu(models.Model):
    name = models.CharField(max_length=50)
    code = models.CharField(max_length=50, unique=True)
    content = models.TextField()

    def save(self, *args, **kwargs):
        # self.content = json.dumps(self.content)
        super(Menu, self).save()

    def get_absolute_url(self):
        return reverse('dashboard:extensions-edit-menu', kwargs={'pk':self.pk})

    def __str__(self):
        return self.name


class CustomForm(models.Model):
    name = models.CharField(max_length=50)
    code = models.CharField(max_length=50, unique=True)
    content = models.TextField()

    def save(self, *args, **kwargs):
        self.content = json.dumps(self.content)
        super(CustomForm, self).save()

    def get_absolute_url(self):
        return reverse('dashboard:extensions-edit-form', kwargs={'pk':self.pk})

    def __str__(self):
        return self.name


class CustomFormData(models.Model):
    form = models.ForeignKey(CustomForm, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    form_data = models.TextField()

    def __str__(self):
        return "Submited from {} form".format(self.form.name)


class Snippet(models.Model):
    title = models.CharField(max_length=100)
    code  = models.CharField(max_length=100, unique=True)
    content = HyperField(default="[]", blank=True)

    def __str__(self):
        return self.title


class SeoItem(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE, blank=True, null=True)
    url = models.CharField(max_length=255, blank=True, null=True)
    og_image = models.ImageField(upload_to='opengraph/')
    og_title = models.CharField(max_length=255, blank=True, null=True)
    og_description = models.TextField(blank=True, null=True)
    keywords = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.product.get_title() if self.product else self.url
