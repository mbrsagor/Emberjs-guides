from django.db import models
from base.models import BaseEntity
from product.models.category import Category


class Product(BaseEntity):
    name = models.CharField(max_length=200)
    color = models.CharField(max_length=50)
    category_name = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True,  related_name='product_category')
    price = models.IntegerField(default=0)

    def __str__(self):
        return self.name[:50]
