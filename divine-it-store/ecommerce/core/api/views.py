from django.shortcuts import get_object_or_404
from oscar.core.loading import get_model
from rest_framework import generics
from ecommerce.core.api.serializers import CategorySerializer


Category = get_model('catalogue', 'Category')
Product = get_model('catalogue', 'Product')
ProductAttr = get_model('catalogue', 'ProductAttribute')


class CategoryProductsView(generics.ListAPIView):
    serializer_class = CategorySerializer

    def get_queryset(self):
        cat_id = self.kwargs.get('pk', None)
        if cat_id is not None:
            # category = Category.objects.filter(id=cat_id)
            x = Product.objects.filter(categories__in=Category.objects.get(id=cat_id).get_children()).values('product_class_id')
            return ProductAttr.objects.filter(product_class_id__in=x)
        else:
            return Category.objects.all()


# class CategoryProductsApi(generics.ListAPIView):
#     serializer_class = ProductsSerializer
#
#     def get_queryset(self):
#         cat_id = self.kwargs.get('pk', None)
#         if cat_id is not None:
#             category = get_object_or_404(Category, id=cat_id)
#             return Product.objects.filter(
#                 categories__path__startswith=category.path).all()
#         else:
#             return Product.objects.none()
