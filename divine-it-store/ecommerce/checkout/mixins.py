from oscar.apps.checkout import mixins
from django.http.response import HttpResponseRedirect
import threading
import logging


logger = logging.getLogger(__name__)


def generate_quotation_and_send_email(mixin, order, quotation):
    logger.info("Generating Quotation....")
    from ecommerce.quotation.models import Quotation
    mixin.communication_type_code = 'QUOTATION_REQUESTED'
    quotation.build()
    logger.info("Quotation Generated. Sending Quotation in email...")
    files = [quotation.generated_pdf.path]
    # Send confirmation message (normally an email)
    mixin.send_confirmation_message(order, mixin.communication_type_code, files=files)
    logger.info("Quotation pdf sent!")


class OrderPlacementMixin(mixins.OrderPlacementMixin):

    def handle_successful_order(self, order):
        # Generate Quotation
        from ecommerce.quotation.models import Quotation
        quote = Quotation.generate(order)

        # Build quotation and send email in background
        threading.Thread(target=generate_quotation_and_send_email, args=[self, order, quote]).start()

        # Flush all session data
        self.checkout_session.flush()

        # Save order id in session so thank-you page can load it
        self.request.session['checkout_order_id'] = order.id

        response = HttpResponseRedirect(self.get_success_url())
        self.send_signal(self.request, response, order)
        return response
