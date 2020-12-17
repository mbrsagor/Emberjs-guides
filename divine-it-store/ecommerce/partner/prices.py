from oscar.apps.partner import prices
from decimal import Decimal as D
from django.conf import settings
from django.db.models import QuerySet
from oscar.core.loading import get_model
from constance import config


LineAttribute = get_model('basket', 'LineAttribute')


class DynamicPrice(prices.Base):

    exists = True
    is_tax_known = True
    tax = D(0.0)

    def __init__(self, currency, options):
        self.currency = currency

        ref = None

        if options is not None and isinstance(options, list):
            for option in options:
                if isinstance(option, dict) and option['option'].code == settings.CUSTOMIZABLE_PRODUCT_OPTION_CODE:
                    ref = option['value']
        elif isinstance(options, QuerySet):
            for lineattribute in options:
                if lineattribute.option.code == settings.CUSTOMIZABLE_PRODUCT_OPTION_CODE:
                    ref = lineattribute.value

        if ref is not None:
            from pricing.pyapp.models import Configuration
            configuration = Configuration.objects.filter(ref=ref)
            if len(configuration) > 0:
                price = configuration[0].price

                if price is not None:
                    self.retail = price
                    self.excl_tax = price
                    self.incl_tax = price
                else:
                    self.retail = D(0.0)
                    self.excl_tax = D(0.0)
                    self.incl_tax = D(0.0)
