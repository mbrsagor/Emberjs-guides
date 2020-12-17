from oscar.apps.basket import abstract_models
from django.utils.encoding import smart_text


class Basket(abstract_models.AbstractBasket):

    def get_stock_info(self, product, options):
        return self.strategy.fetch_for_product(product, options=options)


class Line(abstract_models.AbstractLine):

    def description(self):
        d = smart_text(self.product)
        ops = []
        for attribute in self.attributes.all():
            if attribute.value is not None and attribute.value != '':
                ops.append("<span>%s: %s</span>" % (attribute.option.name, attribute.value))
        if ops:
            d = "<h5>%s</h5> <p>%s</p>" % (d, " ".join(ops))
        return d


from oscar.apps.basket.models import *  # noqa isort:skip
