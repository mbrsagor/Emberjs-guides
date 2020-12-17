from django.db import models
from django.conf import settings
from django.core.files import File
from pricing.pyapp import readxl
from datetime import datetime
from django.utils.crypto import get_random_string
from decimal import Decimal as D
from django.contrib.auth import get_user_model
from oscar.core.loading import get_model
import os
import json


Product = get_model('catalogue', 'Product')


def get_file_path(instance, filename):
    GOOGLE_SHEET_DOWNLOAD_FOLDER = getattr(settings, 'GOOGLE_SHEET_DOWNLOAD_FOLDER', 'pricing_sheets')
    today = datetime.now()
    filename = "%s_%s" % (instance.id, filename)
    return os.path.join(
        GOOGLE_SHEET_DOWNLOAD_FOLDER,
        today.strftime("%Y"),
        today.strftime("%m"),
        today.strftime("%d"),
        filename
    )


class PricingVersion(models.Model):
    google_sheet_id = models.CharField(max_length=255, blank=True, null=True)
    parsed_json = models.TextField(blank=True, null=True)

    downloaded_file = models.FileField(upload_to=get_file_path, max_length=255,
        blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.google_sheet_id

    @classmethod
    def parse(cls, google_sheet_id, sheet_names):
        provider = readxl.GoogleDriveProvider(google_sheet_id)
        stream = provider.get_stream()
        excel_data_parser = readxl.ExcelDataParser()
        data = excel_data_parser.fromProvider(provider, sheet_names)
        json_data = readxl.JsonDataExporter().exports(data)

        pv = PricingVersion.objects.create(
            google_sheet_id=google_sheet_id,
            parsed_json=json_data
        )
        pv.downloaded_file.save('pricing.xlsx', File(stream), True)
        return pv


class Configuration(models.Model):
    user = models.ForeignKey(get_user_model(), blank=True, null=True, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, blank=True, null=True, on_delete=models.CASCADE)
    identifier = models.CharField(max_length=255, blank=True, null=True)
    ref = models.CharField(max_length=40, unique=True)
    configuration = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def parsed_configuration(self):
        return json.loads(self.configuration)

    @property
    def price(self):
        config = self.parsed_configuration
        if isinstance(config, dict):
            if config.get('totalPrice'):
                return D(config['totalPrice'])
            elif config.get('cart', {}).get('totalPrice'):
                return D(config['cart']['totalPrice'])
        return None

    @classmethod
    def generate_unique_ref(cls):
        ref = get_random_string(8).upper()
        while cls.objects.filter(ref=ref).count() > 0:
            ref = get_random_string(8).upper()
        return ref
    
    @classmethod
    def create(cls, configuration):
        return cls.objects.create(ref=cls.generate_unique_ref(), configuration=configuration)

    @classmethod
    def store(cls, ref, identifier, product, user, data):
        if ref is None:
            return cls.objects.create(ref=cls.generate_unique_ref(), identifier=identifier, product=product, configuration=data, user=user)
        else:
            instance = cls.objects.get(ref=ref)
            instance.configuration = data
            instance.save()
            return instance

    def __str__(self):
        return self.ref
