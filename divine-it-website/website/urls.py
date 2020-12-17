from django.conf import settings
from django.conf.urls import include, url
from django.urls import path
from django.contrib import admin

from wagtail.admin import urls as wagtailadmin_urls
from wagtail.core import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls

from search import views as search_views
from divineit import views as divineit_views
from wagtail.contrib.sitemaps.views import sitemap

urlpatterns = [
    url(r'^django-admin/', admin.site.urls),

    url(r'^admin/', include(wagtailadmin_urls)),
    url(r'^documents/', include(wagtaildocs_urls)),

    url(r'^search/$', search_views.search, name='search'),

    url(r'^remote_toolbar/$', divineit_views.remote_toolbar, name='remote_toolbar'),
    url(r'^api/customers/$', divineit_views.customers_api, name='customer_api'),
    url(r'^api/products/$', divineit_views.products_api, name='product_api'),
    url(r'^api/services/$', divineit_views.services_api, name='service_api'),
    url(r'^api/industries/$', divineit_views.industries_api, name='industry_api'),
    url(r'^api/solutions/$', divineit_views.solutions_api, name='solutions_api'),
    url(r'^api/partial/$', divineit_views.partial_render_api, name='solutions_api'),
    path('events/event-details/<title>', divineit_views.event_details, name='event_details'),

    url(r'^hyperEditor/', include('wagtailhyper.urls')),
    # For anything not caught by a more specific rule above, hand over to
    # Wagtail's page serving mechanism. This should be the last pattern in
    # the list:

    path('sitemap.xml', sitemap, name='django.contrib.sitemaps.views.sitemap'),

    url(r'', include(wagtail_urls)),

    # Alternatively, if you want Wagtail pages to be served from a subpath
    # of your site, rather than the site root:
    #    url(r'^pages/', include(wagtail_urls)),
]


if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
