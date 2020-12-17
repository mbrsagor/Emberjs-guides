from rest_framework import serializers
from oscar.core.loading import get_model


Category = get_model('catalogue', 'Category')
Product = get_model('catalogue', 'Product')
ProductAttr = get_model('catalogue', 'ProductAttribute')
AttrOption = get_model('catalogue', 'AttributeOption')


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    option_groups = serializers.SerializerMethodField()
    class Meta:
        model = ProductAttr
        fields = ('id','name','code','option_group_id','option_groups')

    def get_option_groups(self, obj):
        return AttrOption.objects.filter(group_id=obj.option_group_id).values('id','option')


# class CatSerializer(serializers.HyperlinkedModelSerializer):
#     subcategories = serializers.SerializerMethodField()
#
#     class Meta:
#         model = Category
#         fields = ('id', 'numchild', 'name', 'description', 'image', 'slug',
#                   'path', 'depth', 'subcategories')
#
#     def get_subcategories(self, obj):
#         return Category.objects.filter(path__startswith=obj.path,
#                                        depth=obj.depth+1
#                               ).values_list('id', flat=True)