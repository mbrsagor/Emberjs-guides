from datetime import datetime, timedelta
from urllib import parse
from django.conf import settings
from django.http import Http404, HttpResponseRedirect, HttpResponsePermanentRedirect
from django.utils.http import urlquote
from django.views.generic.list import ListView
from oscar.apps.catalogue import views as core_views
from oscar.core.loading import get_model
from pricing.pyapp.models import Configuration
from allauth.account.forms import LoginForm


from .forms import AttributeFilterForm

Category = get_model('catalogue', 'Category')
Product = get_model('catalogue', 'Product')
ProductAttr = get_model('catalogue', 'ProductAttribute')

#
# class ProductCategoryView(core_views.ProductCategoryView):
#
#     def get_category(self):
#         self.kwargs['category_slug'] = self.kwargs['slug']
#         return super().get_category()


class ProductDetailView(core_views.ProductDetailView):

    def get_queryset(self):
        return super().get_queryset().filter(inactive=False)

    def redirect_if_necessary(self, current_path, product):
        params = parse.urlencode(self.request.GET)
        if self.enforce_parent and product.is_child:
            return HttpResponsePermanentRedirect(
                product.parent.get_absolute_url() + f'?{params}')

        if self.enforce_paths:
            expected_path = product.get_absolute_url()
            if expected_path != urlquote(current_path):
                return HttpResponsePermanentRedirect(expected_path + f'?{params}')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['remote_product_menu_url'] = self.object.remote_menu_url
        return context


class ProductCustomizeView(core_views.ProductDetailView):
    customize_for = None

    def get_queryset(self):
        return super().get_queryset().filter(inactive=False)

    def dispatch(self, request, *args, **kwargs):
        self.customize_for = request.GET.get(settings.CONFIG_IDENTIFIER_OPTION_CODE)
        self.ref = request.GET.get('ref')
        if self.ref == '':
            self.ref = None

        if self.customize_for:
            return super().dispatch(request, *args, **kwargs)
        else:
            raise Http404('Need info regarding which company or domain you are customizing for!')

    def get(self, request, **kwargs):
        """
        Check if ref exists in url. If not exists check a last version of configuration exists
        for current user and customize_for. Else create new Configuration
        :param request:
        :param kwargs:
        :return:
        """
        if self.ref is None and request.user.is_authenticated:
            product = self.get_object()
            try:
                configuration = Configuration.objects.filter(
                    product=product, identifier=self.customize_for, user=request.user
                ).order_by('-updated_at')[0]
            except Exception as _:
                configuration = Configuration.store(None, self.customize_for, product, request.user, '{}')
            url = '%s?%s=%s&ref=%s' % (
                product.get_customize_url(),
                settings.CONFIG_IDENTIFIER_OPTION_CODE,
                self.customize_for,
                configuration.ref
            )
            return HttpResponseRedirect(url)
        return super().get(request, **kwargs)

    def redirect_if_necessary(self, current_path, product):
        return None

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['CUSTOMIZABLE_PRODUCT_OPTION_CODE'] = settings.CUSTOMIZABLE_PRODUCT_OPTION_CODE
        context['CONFIG_IDENTIFIER_OPTION_CODE'] = settings.CONFIG_IDENTIFIER_OPTION_CODE
        context['CUSTOMIZE_FOR'] = self.customize_for
        context['login_form'] = LoginForm
        if self.ref:
            context['CONFIGURATION_REF'] = self.ref
            context['SAVED_CONFIGURATION'] = Configuration.objects.get(ref=self.ref)
        context['remote_product_menu_url'] = self.object.remote_menu_url if self.object.remote_menu_url and self.object.remote_menu_url != '' else self.object.parent.remote_menu_url
        return context

    def get_template_names(self):
        if self.object.is_customizable:
            return ['%s/detail_customizable.html' % self.template_folder]
        else:
            return super().get_template_names()


class ProductCategoryView(core_views.ProductCategoryView):

    def get_context_data(self, **kwargs):
        context = super(ProductCategoryView, self).get_context_data(**kwargs)
        context['filter_form'] = AttributeFilterForm(self.get_categories())
        # context['category'] = catetory
        return context

    def get_template_names(self):
        if self.request.is_ajax():
            self.template_name = 'catalogue/category_grid_ajax.html'
        return super().get_template_names()


class CatalogueView(core_views.CatalogueView):
    def get_context_data(self, **kwargs):
        context = super(CatalogueView, self).get_context_data(**kwargs)
        categories = Category.objects.filter()
        li = list(map(lambda x:x.name, categories))
        print(li)
        context['categories'] = categories
        return context


class ProductWithPricingPartailView(core_views.DetailView):
    template_name = 'catalogue/partials/product_with_pricing.html'
    model = Product
    context_object_name = 'product'

    def get_queryset(self):
        return super().get_queryset().filter(inactive=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['request_originating_from'] = self.request.META.get('HTTP_REFERER')
        return context
