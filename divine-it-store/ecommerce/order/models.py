from django.db import models
from oscar.apps.order import abstract_models
from django.conf import settings
from django.forms.models import model_to_dict
from django.utils.encoding import smart_text


class Order(abstract_models.AbstractOrder):

    @property
    def quotation(self):
        from ecommerce.quotation.models import Quotation
        if Quotation.objects.filter(order=self).exists():
            return Quotation.objects.filter(order=self).last()
        else:
            return None

    def get_line_dict(self):
        from pricing.pyapp.models import Configuration
        lines = []
        for line in self.lines.all():
            line_dict = model_to_dict(line)
            line_dict['attributes'] = {}
            for attribute in line.attributes.all():
                if attribute.type == settings.CUSTOMIZABLE_PRODUCT_OPTION_CODE:
                    if attribute.value is not None and attribute.value.strip() != '':
                        line_dict['attributes'][attribute.type] = Configuration.objects.get(ref=attribute.value).parsed_configuration
                else:
                    line_dict['attributes'][attribute.type] = attribute.value
            lines.append(line_dict)
        return lines

    def get_order_config_dict(self):
        """
        Generate a single nested dictionary with all lines and line attributes.
        This is usefull to build docx or pdf for quotation
        :return:
        """
        order_dict = model_to_dict(self)
        order_dict['user'] = model_to_dict(self.user)
        order_dict['lines'] = self.get_line_dict()
        return order_dict


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

from oscar.apps.order.models import *  # noqa isort:skip
