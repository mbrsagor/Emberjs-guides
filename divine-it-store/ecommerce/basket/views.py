from oscar.apps.basket import views
from oscar.core.loading import get_model
from django.shortcuts import redirect, get_object_or_404, reverse, render
from django.views.generic import TemplateView
from django.conf import settings
from allauth.account.utils import send_email_confirmation
import json


Product = get_model('catalogue', 'Product')

#
# class BasketView(views.BasketView):
#
#     def dispatch(self, request, *args, **kwargs):
#         if request.basket.is_empty:
#             return super().dispatch(request, *args, **kwargs)
#         else:
#             return redirect('checkout:preview')


class BasketAddView(views.BasketAddView):
    http_method_names = ['get', 'post']
    session_data_key = 'UNAUTH_USER_BASKET_ADD_DATA'

    def get(self, request, *args, **kwargs):
        self.product = get_object_or_404(
            self.product_model, pk=kwargs['pk'])
        if self.request.session.get(self.session_data_key):
            kwargs = self.get_form_kwargs()
            kwargs['data'] = json.loads(self.request.session[self.session_data_key])
            form = self.get_form_class()(**kwargs)
            del self.request.session[self.session_data_key]
            if form.is_valid():
                return self.form_valid(form)
            else:
                return self.form_invalid(form)
        return redirect(reverse('catalogue:detail', kwargs={'slug': self.product.slug}))

    def form_valid(self, form):
        if self.request.user.is_authenticated and self.request.user.email_verified:
            return super().form_valid(form)
        else:
            self.request.session[self.session_data_key] = json.dumps(self.request.POST)
            next_url = reverse('basket:add', kwargs={'pk': self.product.id})
            if not self.request.user.is_authenticated:
                return redirect('%s?next=%s' % (settings.LOGIN_URL, next_url))
            else:
                self.request.session[settings.SESSION_NEXT_URL_KEY] = next_url
                send_email_confirmation(self.request, self.request.user)
                return render(self.request, 'account/verified_email_required.html')


class AddToBasketFormPartial(TemplateView):
    template_name = 'catalogue/partials/add_to_basket_form.html'

    def dispatch(self, request, pk, **kwargs):
        self.product = get_object_or_404(Product, pk=pk)
        return super().dispatch(request, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['product'] = self.product
        context['popup'] = True
        context['is_hidden'] = False

        return context
