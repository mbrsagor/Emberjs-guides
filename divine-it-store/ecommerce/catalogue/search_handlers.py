from oscar.apps.catalogue import search_handlers
from django.conf import settings
from oscar.core.loading import get_class, get_model
from ecommerce.catalogue.forms import AttributeFilterForm
from django.conf import settings

Product = get_model('catalogue', 'Product')


class SimpleProductSearchHandler(search_handlers.SimpleProductSearchHandler):

    def __init__(self, request_data, full_path, categories=None):
        self.paginate_by = request_data.get('per_page', settings.OSCAR_PRODUCTS_PER_PAGE)
        self.filterForm = AttributeFilterForm(categories, data=request_data)
        if self.filterForm.is_valid():
            self.option_ids = []
            for _, val in self.filterForm.cleaned_data.items():
                if val is not None and val != '':
                    self.option_ids.append(int(val))
        super().__init__(request_data, full_path, categories)

    def get_queryset(self):
        qs = Product.browsable.base_queryset()

        qs = qs.filter(inactive=False)

        if self.categories:
            qs = qs.filter(categories__in=self.categories)

        if hasattr(self, 'option_ids') and len(self.option_ids) > 0:
            if settings.FILTERING_STRATEGY_AND:
                for option_id in self.option_ids:
                    qs = qs.filter(attribute_values__value_option_id=option_id)
            else:
                qs = qs.filter(attribute_values__value_option_id__in=self.option_ids)

        return qs.distinct().order_by('ordering')
