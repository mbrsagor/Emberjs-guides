import requests
from datetime import datetime

from django.conf import settings
from wagtail.contrib.modeladmin.options import (ModelAdmin, ModelAdminGroup,
                                                modeladmin_register)
from wagtailhyper.blocks import add_to_block_registry
from wagtailhyper.blocks.base import DataProvider
from wagtailhyper.blocks.core import StylableBlock
from django.http.response import JsonResponse

from divineit.models import *

KNOWLADGE_BASE_ENABLED = getattr(settings, 'KNOWLADGE_BASE_ENABLED', False)


class NewsModelAdmin(ModelAdmin):
    model = News
    menu_label = 'News'
    menu_icon = 'fa-file-text-o'
    menu_order = 200
    list_display = ('date', 'title', 'enabled', 'featured',)
    list_filter = ('date', 'title', 'enabled', 'featured',)
    search_fields = ('title',)


class EventModelAdmin(ModelAdmin):
    model = Event
    menu_label = 'Events'
    menu_icon = 'fa-calendar'
    menu_order = 200
    list_display = ('start_date', 'title', 'enabled', 'featured',)
    list_filter = ('start_date', 'end_date', 'title', 'enabled', 'featured',)
    search_fields = ('title',)


class IndustriesModelAdmin(ModelAdmin):
    model = Industry
    menu_label = 'Industries'
    menu_icon = 'fa-industry'
    menu_order = 200
    list_display = ('name',)
    search_fields = ('name',)


class ProductsModelAdmin(ModelAdmin):
    model = Product
    menu_label = 'Products'
    menu_icon = 'fa-paper-plane'
    menu_order = 200
    list_display = ('name',)
    search_fields = ('name',)


class ServicesModelAdmin(ModelAdmin):
    model = Service
    menu_label = 'Services'
    menu_icon = 'fa-life-ring'
    menu_order = 200
    list_display = ('name',)
    search_fields = ('name',)


class CustomerModelAdmin(ModelAdmin):
    model = Customer
    menu_label = 'Customers'
    menu_icon = 'fa-building'
    menu_order = 200
    list_display = ('company_name',)
    search_fields = ('company_name',)


class ContactPersonModelAdmin(ModelAdmin):
    model = ContactPerson
    menu_label = 'Contact Persons'
    menu_icon = 'fa-user'
    menu_order = 200
    list_display = ('name',)
    search_fields = ('name',)


class CareerModelAdmin(ModelAdmin):
    model = Career
    menu_label = 'Careers'
    menu_icon = 'fa-user-md'
    menu_order = 200
    list_display = ('date', 'title', 'enabled',)
    list_filter = ('date', 'title', 'enabled',)
    search_fields = ('title',)


class KBCategoryAdmin(ModelAdmin):
    model = KBCategory
    menu_label = 'Categories'
    menu_icon = 'fa-tree'
    list_display = ('name',)
    list_filter = ('product', 'service',)
    search_fields = ('title',)


class KnowledgeAdmin(ModelAdmin):
    model = Knowledge
    menu_label = 'Knowledge'
    menu_icon = 'fa-book'
    list_display = ('title',)
    list_filter = ('category__product', 'category__service',)
    search_fields = ('title',)


class KBAdmin(ModelAdminGroup):
    menu_label = 'Knowledge Base'
    menu_icon = 'fa-book'
    items = (KBCategoryAdmin, KnowledgeAdmin,)


if KNOWLADGE_BASE_ENABLED:
    modeladmin_register(KBAdmin)

modeladmin_register(CustomerModelAdmin)
modeladmin_register(ContactPersonModelAdmin)


modeladmin_register(NewsModelAdmin)
modeladmin_register(EventModelAdmin)
modeladmin_register(IndustriesModelAdmin)
modeladmin_register(ProductsModelAdmin)
modeladmin_register(ServicesModelAdmin)
modeladmin_register(CareerModelAdmin)


# Wagtailhyper Blocks
class NewsBlock(StylableBlock):
    JS_PLUGINS = 'divineit/js/news_block.js'

    def get_context(self, value, parent_context=None):
        context = super(NewsBlock, self).get_context(value, parent_context)
        context['news_list'] = News.objects.all()
        return context


# Wagtailhyper Blocks Newspaper
class NewsPaperBlock(StylableBlock):
    JS_PLUGINS = 'divineit/js/news_paper_block.js'


# video blocks
class VideoBlock(StylableBlock):
    JS_PLUGINS = 'divineit/js/video_block.js'


# career blocks
class CareerBlock(StylableBlock):
    JS_PLUGINS = 'divineit/js/career_block.js'

    def get_context(self, value, parent_context=None):
        context = super(CareerBlock, self).get_context(value, parent_context)
        context['career_list'] = Career.objects.filter(expires__gte=datetime.now())
        return context


# Value blocks
class ValueBlock(StylableBlock):
    JS_PLUGINS = 'divineit/js/value_block.js'


# promo blocks
class PromoBlock(StylableBlock):
    JS_PLUGINS = 'divineit/js/promo_block.js'


# googl map block
class GoogleMapBlock(StylableBlock):
    JS_PLUGINS = 'divineit/js/google_map_block.js'


# iframe block
class iframeBlock(StylableBlock):
    JS_PLUGINS = 'divineit/js/iframe.js'


# customer block
class CustomerBlock(StylableBlock):
    JS_PLUGINS = 'divineit/js/customer_block.js'
    JS_VARIABLES = getattr(settings, 'CUSTOMER_BLOCK_JS_VARIABLES', {
        'PRODUCTS_API': 'https://www.divineit.net/api/products/',
        'SERVICES_API': 'https://www.divineit.net/api/services/',
        'INDUSTRIES_API': 'https://www.divineit.net/api/industries/',
        'SOLUTIONS_API': 'https://www.divineit.net/api/solutions/'
    })


# leadership block
class LeadershipBlock(StylableBlock):
    JS_PLUGINS = 'divineit/js/leadership_block.js'


# image gallery block
class imageGallery(StylableBlock):
    JS_PLUGINS = 'divineit/js/image-gallery.js'


# parallax image block
class parallaxBlock(StylableBlock):
    JS_PLUGINS = 'divineit/js/parallax.js'


# products block
class ProductsBlock(StylableBlock):
    JS_PLUGINS = 'divineit/js/products_block.js'


# bulletlist block
class BulletListBlock(StylableBlock):
    JS_PLUGINS = 'divineit/js/bullet_list.js'


# faq block
class FaqBlock(StylableBlock):
    JS_PLUGINS = 'divineit/js/faq.js'


# video slider block
class VideoSliderBlock(StylableBlock):
    JS_PLUGINS = 'divineit/js/videoslider_block.js'


# Multiple image layer slider
class LayerSliderBlock(StylableBlock):
    JS_PLUGINS = 'divineit/js/layerSlider_block.js'


class SocialBlcok(StylableBlock):
    JS_PLUGINS = 'divineit/js/social_block.js'


# pricing block
class PrcingBlock(StylableBlock):
    JS_PLUGINS = 'divineit/js/pricing.js'


# event blocks
class EventBlock(StylableBlock):
    JS_PLUGINS = 'divineit/js/event_block.js'

    def get_context(self, value, parent_context=None):
        context = super(EventBlock, self).get_context(value, parent_context)
        context['event_list'] = Event.objects.filter(featured=True).order_by('-id')
        return context


class OscarProductBlock(StylableBlock, DataProvider):
    JS_PLUGINS = 'divineit/js/oscar_products.js'
    JS_VARIABLES = {
        'PRODUCT_BLOCK': getattr(settings, 'OSCAR_BASE_URL')
    }

    def get_context(self, value, parent_context=None):
        context = super().get_context(value, parent_context)
        context["OSCAR_BASE_URL"] = getattr(settings, 'OSCAR_BASE_URL')
        return context

    @classmethod
    def provide_data(cls, request):
        oscar_base_url = getattr(settings, 'OSCAR_BASE_URL')
        request_type = request.GET.get("type")

        if request_type == "resource":
            product_id = int(request.GET.get("product_id"))
            response = requests.get(f'{oscar_base_url}/api/products/{product_id}').json()
            response["price"] = requests.get(response["price"]).json()
            return JsonResponse({
                'status': 'success',
                'data': response
            })

        products = requests.get(f'{oscar_base_url}/api/products/').json()
        return JsonResponse({
            'status': 'success',
            'data': products
        })


class KBBlock(StylableBlock):
    JS_PLUGINS = 'divineit/js/knowladgebase_block.js'

    def get_context(self, value, parent_context=None):
        context = super().get_context(value, parent_context=parent_context)
        product = None
        service = None
        category = None
        sub_category = None
        keyword = None
        request = context.get('request', None)

        if request:
            product = request.GET.get('product')
            service = request.GET.get('service')
            category = request.GET.get('category')
            keyword = request.GET.get('keyword')
            sub_category = request.GET.get('sub_category')

        categories = KBCategory.objects.prefetch_related('sub_categories')
        knowledge_list = Knowledge.objects.filter()
        if keyword:
            try:
                knowledge_list = knowledge_list.filter(content__icontains=keyword)
            except Exception as e:
                print(e)

        if product and product != '':
            try:
                product = Product.objects.filter(name=product).first()
                categories = categories.filter(product=product)
            except Exception as e:
                print(e)
        elif service and service != '':
            try:
                service = Service.objects.filter(name=service).first()
                categories = categories.filter(service=service)
            except Exception as e:
                print(e)
        else:
            categories = categories.all()

        context['categories'] = categories
        context['products'] = Product.objects.all()
        context['services'] = Service.objects.all()

        if category or sub_category:
            if category:
                try:
                    category = KBCategory.objects.filter(slug=category).first()
                    knowledge_list = knowledge_list.filter(category=category)
                except Exception as e:
                    print(e)
            if sub_category:
                try:
                    sub_category = KBSubCategory.objects.filter(slug=sub_category).first()
                    knowledge_list = knowledge_list.filter(sub_category=sub_category)
                except Exception as e:
                    print(e)
            else:
                try:
                    knowledge_list = knowledge_list.filter(sub_category=None)
                except Exception as e:
                    print(e)

            context['knowledge_list'] = knowledge_list

        elif categories.count() > 0 and keyword is None:
            first_category = categories[0]
            knowledge_list = Knowledge.objects.filter(category=first_category)
            try:
                first_sub_category = first_category.sub_categories.first()
                knowledge_list = knowledge_list.filter(sub_category=first_sub_category)
            except Exception as e:
                print(e)
            context['knowledge_list'] = knowledge_list
        elif keyword:
            context['knowledge_list'] = knowledge_list
        # import pdb; pdb.set_trace()
        return context


if KNOWLADGE_BASE_ENABLED:
    add_to_block_registry('knowledge_base', KBBlock)
add_to_block_registry('news_paper', NewsPaperBlock)
add_to_block_registry('news', NewsBlock)
add_to_block_registry('events', EventBlock)
add_to_block_registry('video', VideoBlock)
add_to_block_registry('career', CareerBlock)
add_to_block_registry('value', ValueBlock)
add_to_block_registry('promo', PromoBlock)
add_to_block_registry('google_map', GoogleMapBlock)
add_to_block_registry('iframe', iframeBlock)
add_to_block_registry('customer', CustomerBlock)
add_to_block_registry('leadership', LeadershipBlock)
add_to_block_registry('imagegallery', imageGallery)
add_to_block_registry('parallax', parallaxBlock)
add_to_block_registry('products', ProductsBlock)
add_to_block_registry('bullet_list', BulletListBlock)
add_to_block_registry('faq', FaqBlock)
add_to_block_registry('videoslider', VideoSliderBlock)
add_to_block_registry('socialBlock', SocialBlcok)
add_to_block_registry('pricing', PrcingBlock)
add_to_block_registry('layerslider', LayerSliderBlock)

if getattr(settings, 'ENABLE_OSCAR_INTEGRATION', False):
    add_to_block_registry('oscar_product', OscarProductBlock)
