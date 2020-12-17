from oscar.apps.basket import app
from django.conf.urls import url
from django.contrib.auth.decorators import login_required
from ecommerce.core.decorators import verified_email_required
from ecommerce.basket.views import AddToBasketFormPartial


def apply_decorators(view):
    return verified_email_required(login_required(view))


class BasketApplication(app.BasketApplication):

    def get_urls(self):
        urls = [
            url(r'^$', self.summary_view.as_view(), name='summary'),
            url(r'^add/(?P<pk>\d+)/$', self.add_view.as_view(), name='add'),
            url(r'^vouchers/add/$', apply_decorators(self.add_voucher_view.as_view()),
                name='vouchers-add'),
            url(r'^vouchers/(?P<pk>\d+)/remove/$',
                apply_decorators(self.remove_voucher_view.as_view()), name='vouchers-remove'),
            url(r'^saved/$', apply_decorators(self.saved_view.as_view()),
                name='saved'),
            url(r'^addToBasketFormPartial/(?P<pk>\d+)/$', AddToBasketFormPartial.as_view()),
        ]
        return self.post_process_urls(urls)


application = BasketApplication()
