from oscar.apps.dashboard.catalogue import app
from ecommerce.dashboard.catalogue.views import SyncPricingWithGoogleSheetView, AddUpdatePricingConfigForVariant
from django.conf.urls import url


class CatalogueApplication(app.CatalogueApplication):
    product_sync_view = SyncPricingWithGoogleSheetView
    add_update_pricing_config = AddUpdatePricingConfigForVariant

    def get_urls(self):
        urls = super().get_urls()
        urls += self.post_process_urls([
            url(r'^products/sync-with-google-sheet/(?P<pk>\d+)/$',
                self.product_sync_view.as_view(),
                name='catalogue-product-sync'),
            url(r'^products/(?P<pk>\d+)/update-pricing-config/',
                self.add_update_pricing_config.as_view(),
                name='catalogue-pricingconfig')
        ])
        return urls

application = CatalogueApplication()
