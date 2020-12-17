from django.db import models
from base.models import BaseEntity


class Category(BaseEntity):
    name = models.CharField(max_length=100, unique=True)
    category_image = models.ImageField(upload_to='category', blank=True, null=True)

    def __str__(self):
        return self.name
