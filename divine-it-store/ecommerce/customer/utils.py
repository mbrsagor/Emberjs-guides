from oscar.apps.customer import utils
from dit_email_addon.api import DitEmailAddon
from constance import config


class Dispatcher(utils.Dispatcher):

    def dispatch_order_messages(self, order, messages, event_type=None, **kwargs):
        """
        Dispatch order-related messages to the customer.
        """
        files = kwargs.get('files', [])
        if order.is_anonymous:
            email = kwargs.get('email_address', order.guest_email)
            dispatched_messages = self.dispatch_anonymous_messages(email, messages)
        else:
            dispatched_messages = self.dispatch_user_messages(order.user, messages, files)

        self.create_communication_event(order, event_type, dispatched_messages)

    def dispatch_user_messages(self, user, messages, files=[]):
        """
        Send messages to a site user
        """
        dispatched_messages = {}
        if messages['subject'] and (messages['body'] or messages['html']):
            dispatched_messages['email'] = self.send_user_email_messages(user, messages, files)
        if messages['sms']:
            dispatched_messages['sms'] = self.send_text_message(user, messages['sms'])
        return dispatched_messages

    def send_user_email_messages(self, user, messages, files=[]):
        """
        Send message to the registered user / customer and collect data in database.
        """
        if not user.email:
            self.logger.warning("Unable to send email messages as user #%d has"
                                " no email address", user.id)
            return None, None

        email = self.send_email_messages(user.email, messages, files)
        return email, self.create_customer_email(user, messages, email)

    def send_email_messages(self, recipient, messages, files=[]):

        DitEmailAddon().send_email_raw(
            recipient,
            messages['subject'],
            messages.get('html', messages.get('body')),
            bcc=getattr(config, 'DEFAULT_BCC_FOR_ALL_EMAIL', ''),
            files=files
        )

