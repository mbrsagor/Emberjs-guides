from oscar.apps.checkout import views
from django.shortcuts import redirect


class PaymentMethodView(views.PaymentMethodView):

    def get_success_response(self):
        return redirect('checkout:preview')
