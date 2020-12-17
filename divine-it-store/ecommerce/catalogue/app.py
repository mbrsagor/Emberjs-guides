from oscar.apps.catalogue import app
from ecommerce.catalogue.views import ProductCustomizeView, ProductWithPricingPartailView
from django.conf.urls import url


class BaseCatalogueApplication(app.BaseCatalogueApplication):
    customize_view = ProductCustomizeView

    def get_urls(self):
        urls = [
            url(r'^partial/(?P<slug>[\w-]*)/$',
                ProductWithPricingPartailView.as_view(), name='partial'),

            url(r'^customize/(?P<slug>[\w-]*)/$',
                self.customize_view.as_view(), name='customize'),
            url(r'^category/(?P<category_slug>[\w-]+(/[\w-]+)*)/$',
                self.category_view.as_view(), name='category'),
            url(r'^ranges/(?P<slug>[\w-]+)/$',
                self.range_view.as_view(), name='range'),
            url(r'^$', self.catalogue_view.as_view(), name='index'),
            url(r'^(?P<slug>[\w-]*)/$',
                self.detail_view.as_view(), name='detail'),

        ]
        return self.post_process_urls(urls)


class CatalogueApplication(BaseCatalogueApplication, app.ReviewsApplication):
    """
    Composite class combining Products with Reviews
    """


application = CatalogueApplication()
