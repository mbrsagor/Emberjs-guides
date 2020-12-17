from decimal import Decimal as D
from oscar.apps.partner import strategy
from oscar.core.loading import get_class
from constance import config

Unavailable = get_class('partner.availability', 'Unavailable')
Available = get_class('partner.availability', 'Available')
RequirementNotMeet = get_class('partner.availability', 'RequirementNotMeet')
UnavailablePrice = get_class('partner.prices', 'Unavailable')
FixedPrice = get_class('partner.prices', 'FixedPrice')
DynamicPrice = get_class('partner.prices', 'DynamicPrice')


class Selector(object):

    def strategy(self, request=None, user=None, **kwargs):
        """
        Return an instanticated strategy instance
        """
        # Default to the backwards-compatible strategy of picking the first
        # stockrecord but charging zero tax.
        return CustomStrategy(request)


def get_price_val(stockrecord):
    if hasattr(stockrecord, 'converted_price'):
        return stockrecord.converted_price
    else:
        return stockrecord.price_excl_tax


def preprocess_stockrecord_for_currency(requested_currency, stockrecord):
    if stockrecord.price_currency != requested_currency:
        if requested_currency == 'USD':
            stockrecord.converted_price = stockrecord.price_excl_tax / config.USD_TO_BDT_RATE
        else:
            stockrecord.converted_price = stockrecord.price_excl_tax * config.USD_TO_BDT_RATE
    else:
        stockrecord.converted_price = stockrecord.price_excl_tax
    return stockrecord


class CustomStrategy(strategy.Default):

    def select_stockrecord(self, product, currency=None):
        if currency is None:
            currency = self.request.currency
        try:
            if product.stockrecords.filter(price_currency=currency).exists():
                return product.stockrecords.filter(price_currency=currency)[0]
            else:
                return product.stockrecords.filter()[0]
        except IndexError:
            return None

    def select_children_stockrecords(self, product, currency=None):
        records = []
        for child in product.children.all():
            # Use tuples of (child product, stockrecord)
            records.append((child, self.select_stockrecord(child, currency)))
        return records

    def parent_pricing_policy(self, product, children_stock):
        stockrecords = [x[1] for x in children_stock if x[1] is not None]
        if not stockrecords:
            return UnavailablePrice()

        stockrecords = [preprocess_stockrecord_for_currency(self.request.currency, stockrecord) for stockrecord in stockrecords]

        # We take price from first record
        stockrecords = sorted(stockrecords, key=get_price_val)
        stockrecord = stockrecords[0]
        return FixedPrice(
            currency=self.request.currency,
            excl_tax=get_price_val(stockrecord),
            tax=D('0.00'))

    def availability_policy(self, product, stockrecord, pricing_policy=None):
        """
        If product is customizable, its available.
        Otherwise default behaviour
        :param product:
        :param stockrecord:
        :return:
        """
        if product.is_customizable:
            if pricing_policy is not None and stockrecord is not None:
                stockrecord = preprocess_stockrecord_for_currency(self.request.currency, stockrecord)
                if pricing_policy.excl_tax and pricing_policy.excl_tax < stockrecord.converted_price:
                    return RequirementNotMeet('Please add more item to ask for quote or choose a package')
            return Available()
        else:
            return super().availability_policy(product, stockrecord)

    def pricing_policy(self, product, stockrecord, options=None):
        """
        If product is customizable then Pricing will be dynamic
        Otherwise default behaviour
        :param product:
        :param stockrecord:
        :param options:
        :return:
        """
        # Check stockrecord has the appropriate data
        if not product.is_customizable or product.uses_stock_price:
            if not stockrecord or stockrecord.price_excl_tax is None:
                return UnavailablePrice()
            stockrecord = preprocess_stockrecord_for_currency(self.request.currency, stockrecord)
            return FixedPrice(
                currency=self.request.currency,
                excl_tax=get_price_val(stockrecord),
                tax=D('0.00'))
        else:
            return DynamicPrice(self.request.currency, options)

    def fetch_for_product(self, product, stockrecord=None, options=None, currency=None):
        """
        Get strategy for a product with or without options
        :param product:
        :param stockrecord:
        :param options:
        :return:
        """
        if stockrecord is None:
            stockrecord = self.select_stockrecord(product, currency)
        pricing_policy = self.pricing_policy(product, stockrecord, options)
        return strategy.PurchaseInfo(
            price=pricing_policy,
            availability=self.availability_policy(product, stockrecord, pricing_policy=pricing_policy),
            stockrecord=stockrecord)

    def fetch_for_line(self, line, stockrecord=None):
        """
        Get Strategy for a line
        """
        return self.fetch_for_product(line.product, options=line.attributes.all())
