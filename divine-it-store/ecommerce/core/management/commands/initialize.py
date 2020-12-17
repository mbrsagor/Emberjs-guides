from django.core.management.base import BaseCommand, CommandError
from oscar.core.loading import get_model
from django.core.management import call_command
from django.conf import settings
from django.template.loaders.app_directories import get_app_template_dirs
from django.apps import apps
import os
from oscar.core.loading import get_model


CommunicationEventType = get_model("customer", "CommunicationEventType")

Option = get_model('catalogue', 'Option')
Partner = get_model('partner', 'Partner')


class Command(BaseCommand):
    help = 'Initializes An E-Commerce Project'

    def handle(self, *args, **options):
        self.initialdata()
        call_command("rebuild_index", "--noinput")
        call_command("populate_email_templates", "EMAIL_CHANGED", "ORDER_PLACED", "PASSWORD_CHANGED", "PASSWORD_RESET", "PRODUCT_ALERT", "REGISTRATION")

    def initialdata(self):
        self.initialize_allauth_templates()
        option, created = Option.objects.get_or_create(
            code=settings.CUSTOMIZABLE_PRODUCT_OPTION_CODE,
            defaults={
                'name': 'Ref',
                'code': settings.CUSTOMIZABLE_PRODUCT_OPTION_CODE,
                'type': Option.REQUIRED
            }
        )
        if not created:
            option.name = 'Ref'
            option.save()

        Option.objects.get_or_create(
            code=settings.CONFIG_IDENTIFIER_OPTION_CODE,
            defaults={
                'name': settings.CONFIG_IDENTIFIER_OPTION_CODE.capitalize(),
                'code': settings.CONFIG_IDENTIFIER_OPTION_CODE,
                'type': Option.REQUIRED
            }
        )

        Partner.objects.get_or_create(
            code=settings.DEFAULT_PARTNER,
            defaults={
                'name': 'Default Partner',
                'code': settings.DEFAULT_PARTNER
            }
        )

    def initialize_allauth_templates(self):
        template_dir = None
        for app_config in apps.get_app_configs():
            if app_config.label == 'allauth':
                template_dir = os.path.join(app_config.path, 'templates', 'account', 'email')
                break
        templates = ['email_confirmation', 'email_confirmation_signup', 'password_reset_key']
        for template in templates:
            message_file = os.path.join(template_dir, f'{template}_message.txt')
            subject_file = os.path.join(template_dir, f'{template}_subject.txt')

            with open(message_file) as f:
                message = f.read()

            with open(subject_file) as f:
                subject = f.read()

            CommunicationEventType.objects.get_or_create(
                code=template.upper(),
                defaults={
                    'name': template.upper(),
                    'category': CommunicationEventType.USER_RELATED,
                    'email_subject_template': subject,
                    'email_body_template': message,
                    'email_body_html_template': message,
                }
            )
