from oscar.core.loading import get_model, get_class
from allauth.account.adapter import DefaultAccountAdapter
from django.conf import settings

CommunicationEventType = get_model('customer', 'CommunicationEventType')
Dispatcher = get_class('customer.utils', 'Dispatcher')


class EcommerceAccountAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=True):
        user = super().save_user(request, user, form, commit=commit)
        user.company_name = form.cleaned_data['company_name']
        user.mobile_number = form.cleaned_data['mobile_number']
        if commit:
            user.save()
        return user

    def send_mail(self, template_prefix, email, context):
        """
        Override Django allauth to use Oscar email sending functionality
        :param template_prefix:
        :param email:
        :param context:
        :return:
        """
        self.send_email(template_prefix, email, context)

    @staticmethod
    def send_email(template_prefix, email, context):
        code = template_prefix.split('/')[-1].upper()
        msgs = CommunicationEventType.objects.get_and_render(
            code=code, context=context)
        Dispatcher().dispatch_anonymous_messages(email, msgs)

    def is_safe_url(self, url):
        from django.utils.http import is_safe_url
        return any([
            is_safe_url(url, allowed_hosts=settings.ALLOWED_HOSTS),
            is_safe_url(url, allowed_hosts=settings.CSRF_TRUSTED_ORIGINS)
        ])

    def get_email_confirmation_redirect_url(self, request):
        if request.user.is_authenticated:
            next_url = request.session.get(settings.SESSION_NEXT_URL_KEY)
            if next_url:
                del request.session[settings.SESSION_NEXT_URL_KEY]
                return next_url
        return super().get_email_confirmation_redirect_url(request)
