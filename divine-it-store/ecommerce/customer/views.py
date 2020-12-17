from oscar.apps.customer import views
from autodeploy.models import ServiceRecord
from django.conf import settings


class ServicesList(views.PageTitleMixin, views.generic.ListView):
    context_object_name = "services"
    template_name = 'customer/services/list.html'
    paginate_by = settings.OSCAR_ORDERS_PER_PAGE
    model = ServiceRecord
    # form_class = OrderSearchForm
    page_title = 'Service Records'
    active_tab = 'services'
    ordering = ['-updated']

    def get_queryset(self):
        return ServiceRecord.objects.filter(user=self.request.user)
