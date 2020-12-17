from django.views import View
from oscar.core.loading import get_model, get_class
from django.shortcuts import get_object_or_404, render
from django.http.response import HttpResponseRedirect
from django.contrib import messages
from pricing.pyapp.models import PricingVersion, Configuration
from oscar.apps.dashboard.catalogue import views


ProductClass = get_model('catalogue', 'ProductClass')
Product = get_model('catalogue', 'Product')
ProductAttributeValue = get_model('catalogue', 'ProductAttributeValue')
LinkFormSet = get_class('dashboard.catalogue.forms', 'LinkFormSet')


class ProductCreateUpdateView(views.ProductCreateUpdateView):

    link_formset = LinkFormSet

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.formsets['link_formset'] = self.link_formset


class SyncPricingWithGoogleSheetView(View):
    http_method_names = ['post']

    def post(self, request, pk):
        product = get_object_or_404(Product, pk=pk)

        attr_vals = {}
        for attr_val in product.attribute_values.all():
            attr_vals[attr_val.attribute.code] = attr_val.value

        google_sheet_id = attr_vals.get(ProductClass.GOOGLE_SHEET_ID_ATTR_CODE)
        sheet_names = attr_vals.get(ProductClass.SHEET_NAMES_ATTR_CODE)
        if google_sheet_id is not None and sheet_names is not None:
            sheet_names = list(
                filter(
                    lambda x: x != '',
                    [x.strip() for x in sheet_names.split(',')]
                )
            )
            pv = PricingVersion.parse(
                google_sheet_id,
                sheet_names
            )

            last_version_attr = product.last_version_attr

            pav, _ = ProductAttributeValue.objects.get_or_create(
                attribute=last_version_attr,
                product=product,
                defaults={
                    'product': product,
                    'value_integer': pv.id
                }
            )
            pav.value_integer = pv.id
            pav.save()
            messages.success(request, "Successfully Synced")
        else:
            messages.error(
                request,
                'Google Sheet ID or Sheet Names are not provided. Please Edit the product and provide required info.'
            )
        return HttpResponseRedirect(request.META.get('HTTP_REFERER', '/'))


class AddUpdatePricingConfigForVariant(View):

    def get(self, request, pk):
        product = get_object_or_404(Product, pk=pk)
        old_config = product.cart_default_config
        context = {
            'product': product,
            'old_config': old_config
        }
        return render(request, template_name='dashboard/catalogue/update_pricing_config.html', context=context)

    def post(self, request, pk):

        product = get_object_or_404(Product, pk=pk)
        old_config = product.cart_default_config
        ref = None

        if old_config:
            ref = old_config.ref

        config = Configuration.store(
            ref=ref,
            identifier=None,
            product=product,
            user=request.user,
            data=request.POST['config']
        )
        product.update_cart_default_config(config.ref)

        return self.get(request, pk)