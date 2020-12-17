from oscar.apps.customer import app as baseapp
from django.conf.urls import url
from ecommerce.customer.views import ServicesList


class CustomerApplication(baseapp.CustomerApplication):

    def get_urls(self):
        urls = super().get_urls()
        urls += [
            url(r'^services/$', ServicesList.as_view(), name='services')
        ]
        return self.post_process_urls(urls)


application = CustomerApplication()

