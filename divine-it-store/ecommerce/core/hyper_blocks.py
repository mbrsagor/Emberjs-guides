import json

from django.shortcuts import get_object_or_404
from django.utils.functional import lazy
from djangohyper.blocks import StylableBlock
from djangohyper.blocks import register
from oscar.core.loading import get_model

from ecommerce.catalogue.forms import AttributeFilterForm
from ecommerce.core.models import Menu, Snippet, CustomForm

Category = get_model('catalogue', 'Category')
Product = get_model('catalogue', 'Product')


def catagory_dict():
    categories = list(map(lambda x: {'id': x.id, 'name': str(x)}, Category.objects.all()))
    return json.dumps([{'id': 0, 'name': 'All Categories'}] + categories)


def product_dict():
    products = list(map(lambda x: {'id': x.id, 'title': x.title}, Product.objects.filter(featured=True)))
    return json.dumps([{'id': 0, 'name': 'All Featured Products'}] + products)


@register("category")
class CategoryBlock(StylableBlock):
    JS_VARIABLES = {
        'CATEGORIES': lazy(catagory_dict)
    }

    JS_PLUGINS = 'core/djangohyper/categoryChooserBlock.js'

    def get_context(self, value, parent_context=None):
        context = super().get_context(value, parent_context=parent_context)
        categoryId = value.get('settings', {}).get('categoryId')

        if categoryId is not None:
            categoryId = int(categoryId)
            if categoryId != 0:
                category = Category.objects.get(id=categoryId)
                categories = category.get_descendants_and_self()
                context['filter_form'] = AttributeFilterForm(categories)
                context['category'] = category
            if categoryId == 0:
                context['products'] = Product.objects.all()
            else:
                context['products'] = Product.objects.filter(categories__in=categories)

        else:
            context['products'] = []
        return context


def snippet_dict():
    snippets = list(map(lambda x: {'id': x.id, 'name': x.title}, Snippet.objects.all()))
    return json.dumps([{'id': 0, 'name': 'All Snippets'}] + snippets)


@register("snippet")
class SnippetBlock(StylableBlock):
    JS_VARIABLES = {
        'SNIPPETS': lazy(snippet_dict)
    }

    JS_PLUGINS = 'core/djangohyper/snippetChooserBlock.js'

    def get_context(self, value, parent_context=None):
        context = super().get_context(value, parent_context=parent_context)
        snippetId = int(value['settings'].get('snippetId', 0))
        try:
            context['snippet'] = Snippet.objects.get(id=snippetId)
        except Exception as e:
            pass
        return context


@register("manager")
class ProductManager(StylableBlock):
    JS_VARIABLES = {
        'CATEGORIES': lazy(catagory_dict)
    }

    JS_PLUGINS = 'core/djangohyper/ProductManagerChooserBlock.js'

    def get_context(self, value, parent_context=None):
        context = super().get_context(value, parent_context=parent_context)
        categoryId = int(value['settings'].get('categoryId', 0))
        status = int(value['settings'].get('status', False))
        if categoryId == 0:
            context['products'] = Product.objects.all()
        else:
            context['products'] = Product.objects.filter(categories__in=Category.objects.filter(id=categoryId)).filter(
                featured=status)

        return context


@register("top_category")
class CategoryManager(StylableBlock):
    JS_VARIABLES = {
        'CATEGORIES': lazy(catagory_dict)
    }

    JS_PLUGINS = 'core/djangohyper/topCategoryBlock.js'

    def get_context(self, value, parent_context=None):
        context = super().get_context(value, parent_context=parent_context)
        categoryId = int(value['settings'].get('categoryId', 0))
        limit = int(value['settings'].get('limit', 0))

        context['categories'] = Category.get_root_nodes()
        context['limit'] = limit

        # if limit > 0:
        #     context['categories'] = Category.objects.filter()[:limit]
        # else:
        #     context['categories'] = Category.objects.all()

        return context


@register("promotion")
class PromotionBlock(StylableBlock):
    JS_VARIABLES = {}

    JS_PLUGINS = 'core/djangohyper/PromotionBlock.js'


@register("social")
class SocialBlcok(StylableBlock):
    JS_VARIABLES = {}

    JS_PLUGINS = 'core/djangohyper/socialBlock.js'


def menu_dict():
    menus = list(map(lambda x: {'id': x.code, 'name': x.name}, Menu.objects.all()))
    return json.dumps(menus)


@register("menu")
class MenuBlock(StylableBlock):
    JS_VARIABLES = {
        'MENUS': lazy(menu_dict)
    }

    JS_PLUGINS = 'core/djangohyper/menuChooserBlock.js'

    def get_context(self, value, parent_context=None):
        context = super().get_context(value, parent_context=parent_context)
        try:
            menuCode = str(value['settings']['menuCode'])
            dropdown_level = int(value['settings']['dropdownLevel'])
            template_name = str(value['settings']['templateName'])
            context['menu'] = get_object_or_404(Menu, code=menuCode)
            context['dropdown_level'] = dropdown_level
            context['template_name'] = template_name
        except Exception as e:
            pass

        return context


def form_dict():
    forms = list(map(lambda x: {'id': x.code, 'name': x.name}, CustomForm.objects.all()))
    return json.dumps(forms)


@register("form")
class FormBlock(StylableBlock):
    JS_VARIABLES = {
        'FORMS': lazy(form_dict)
    }

    JS_PLUGINS = 'core/djangohyper/formChooserBlock.js'

    def get_context(self, value, parent_context=None):
        context = super().get_context(value, parent_context=parent_context)
        try:
            formCode = str(value['settings']['formCode'])
            mailTo = str(value['settings']['mailTo'])
            subject = str(value['settings']['subject'])
            context['form'] = get_object_or_404(CustomForm, code=formCode)
            context['mail_to'] = mailTo
            context['subject'] = subject
        except Exception as e:
            pass

        return context


@register("map")
class MapBlock(StylableBlock):
    JS_VARIABLES = {}

    JS_PLUGINS = 'core/djangohyper/mapChooserBlock.js'

    def get_context(self, value, parent_context=None):
        context = super().get_context(value, parent_context=parent_context)
        try:
            map_link = str(value['settings']['mapLink'])
            map_height = int(value['settings']['mapHeight'])
            map_width = int(value['settings']['mapWidth'])
            context['map_link'] = map_link
            context['map_height'] = map_height
            context['map_width'] = map_width
        except Exception as e:
            pass

        return context


@register("faq")
class FaqBlock(StylableBlock):
    JS_VARIABLES = {}

    JS_PLUGINS = 'core/djangohyper/faq.js'


@register("video")
class VideoBlock(StylableBlock):
    JS_VARIABLES = {}

    JS_PLUGINS = 'core/djangohyper/video_block.js'


@register("videoslider")
class VideoImageBlock(StylableBlock):
    JS_VARIABLES = {}

    JS_PLUGINS = 'core/djangohyper/image_videoblock.js'

# Store location block start here
@register("address_location")
class AddressBlock(StylableBlock):
    JS_VARIABLES={}
    
    JS_PLUGINS= 'core/djangohyper/addressBlock.js'