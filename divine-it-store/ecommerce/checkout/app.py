from oscar.apps.checkout import app
from django.conf.urls import url


class CheckoutApplication(app.CheckoutApplication):
    pass


application = CheckoutApplication()
