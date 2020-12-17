from django.contrib import admin
from product.models.category import Category
from product.models.product import Product

admin.site.register(Category)
admin.site.register(Product)
