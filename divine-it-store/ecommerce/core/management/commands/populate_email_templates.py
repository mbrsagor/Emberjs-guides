from copy import deepcopy
from unittest import mock

from django.conf import settings
from django.core.management.base import BaseCommand
from django.utils.translation import override
from django.template import base as template
from django.template import defaulttags

from oscar.core.loading import get_model


CommunicationEventType = get_model("customer", "CommunicationEventType")


# override forloop registration
def do_not_change_anything(parser, token):  # pylint: disable=unused-argument
    return template.TextNode("{%s}" % "% {} %".format(token.contents))


# override filters, leave them unchanged
class NoFilterExpression(template.FilterExpression):
    def resolve(self, context, ignore_failures=False):
        if "|" in self.token:
            return "{{ %s }}" % self.token
        return super().resolve(context)


# override parse so filters will not be changed
class NoFilterParser(template.Parser):
    def compile_filter(self, token):
        return NoFilterExpression(token, self)


# make sure variables are rendered unchanged.
class DotPath(object):
    def __init__(self, *names):
        self.names = names

    def __getitem__(self, name):
        return DotPath(*self.names, name)

    def __str__(self):
        return "{{ %s }}" % ".".join(self.names)


class Command(BaseCommand):
    help = "Populate the email communications in the dashboard"

    def add_arguments(self, parser):
        parser.add_argument(
            "event_types", nargs="+", help="CommunicationEventType code names"
        )
        parser.add_argument(
            "--language-code",
            "-l",
            default=settings.LANGUAGE_CODE,
            help="language code to activate",
        )
        parser.add_argument(
            "--variable",
            nargs="*",
            help="additional context variables used in the template",
        )
        parser.add_argument(
            "--dry-run",
            default=False,
            action="store_true",
            help="Do not really save the CommunicationEventTypes",
        )
        parser.add_argument(
            "--show-html",
            default=False,
            action="store_true",
            help="Show html template also",
        )
        parser.add_argument(
            "--is-order-email",
            default=False,
            action="store_true",
            help="Use if the communicationevent is not user but order related",
        )

    def handle(self, *args, **options):
        # make a copy of the tags for that can be changed and used in this command
        default_tags_copy = deepcopy(defaulttags.register.tags)

        with mock.patch.object(
            defaulttags.register, "tags", default_tags_copy
        ), mock.patch.object(template, "Parser", NoFilterParser):
            defaulttags.register.tag("if", do_not_change_anything)
            defaulttags.register.tag("else", do_not_change_anything)
            defaulttags.register.tag("elif", do_not_change_anything)
            defaulttags.register.tag("endif", do_not_change_anything)

            defaulttags.register.tag("for", do_not_change_anything)
            defaulttags.register.tag("endfor", do_not_change_anything)

            with override(options["language_code"]):
                for code in options["event_types"]:
                    if (
                        CommunicationEventType.objects.filter(code=code).exists()
                        and not options["dry_run"]
                    ):
                        self.stdout.write(
                            self.style.WARNING("%s allready exists, skipping." % code)
                        )
                    else:
                        ctx = {
                            "user": DotPath("user"),
                            "site": DotPath("site"),
                            "order": DotPath("order"),
                            "status_url": DotPath("status_url"),
                            "static_base_url": DotPath("static_base_url"),
                            "tracking_url": DotPath("tracking_url"),
                            "line": DotPath("line"),
                            "field": DotPath("field"),
                            "reset_url": DotPath("reset_url"),
                            "new_email": DotPath("new_email"),
                            "alert": DotPath("alert"),
                            "lines": DotPath("lines"),
                            "quantity": DotPath("quantity"),
                            "option": DotPath("option"),
                        }
                        extra_context = options["variable"] or []
                        for var in extra_context:
                            ctx[var] = DotPath(var)

                        messages = CommunicationEventType(code=code).get_messages(ctx)

                        if not messages["subject"] or not messages["body"]:
                            self.stdout.write(
                                self.style.ERROR(
                                    "skipping %s, no template found" % code
                                )
                            )
                            continue

                        if options["is_order_email"]:
                            messages["body"] = (
                                "{% load currency_filters %}\n" + messages["body"]
                            )
                            if messages["html"]:
                                messages["html"] = (
                                    "{% load currency_filters %}\n" + messages["html"]
                                )
                            else:
                                messages["html"] = None

                        if options["dry_run"]:
                            self.stdout.write(self.style.SUCCESS("subject:"))
                            self.stdout.write("%(subject)s\n\n" % messages)
                            self.stdout.write(self.style.SUCCESS("body:"))
                            self.stdout.write("%(body)s" % messages)
                            if options["show_html"]:
                                self.stdout.write(self.style.SUCCESS("html"))
                                self.stdout.write("%(html)s:" % messages)
                        else:
                            if options["is_order_email"]:
                                category = CommunicationEventType.ORDER_RELATED
                            else:
                                category = CommunicationEventType.USER_RELATED

                            CommunicationEventType.objects.create(
                                code=code,
                                name=code,
                                category=category,
                                email_subject_template=messages["subject"],
                                email_body_template=messages["body"],
                                email_body_html_template=messages["html"],
                            )

        self.stdout.write(
            self.style.SUCCESS(
                "populating emails for events: %(event_types)s in language %(language_code)s done."
                % options
            )
        )





