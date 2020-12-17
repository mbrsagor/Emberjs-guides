from django.contrib import admin
from django.utils.encoding import force_text
from django.contrib.admin import SimpleListFilter
from django.utils.translation import ugettext_lazy as _
from django.template.defaultfilters import title
from autodeploy.models import *
# Register your models here.

def get_default_filter(field, choices, default, field_title=None, all_val='*', all_text=_('All')):
    """
    Get a default filter for any filter.

    :param field: field name
    :param choices: filter choices
    :param default: default value if no filter chosen
    :param field_title: Field title to show by default capfirst value of field name
    :param all_val: value, for which no filter to apply
    :param all_text: title for all value
    :return: a list filter class to use in list_filter attribute in Django ModelAdmin
    """
    class DefaultFilterValue(SimpleListFilter):
        parameter_name = field
        title = field_title or _(title(field))

        all_value = all_val
        all_title = all_text

        default_value = default

        def lookups(self, request, model_admin):
            return ((self.all_value, all_text),) + choices

        def queryset(self, request, queryset):
            value = self.value()

            if not value:
                value = self.default_value
            elif value == self.all_value:
                return queryset

            return queryset.filter(**{field: value})

        def choices(self, changelist):
            for lookup, title in self.lookup_choices:
                yield {
                    'selected': self.value() == force_text(lookup),
                    'query_string': changelist.get_query_string({self.parameter_name: lookup}, []),
                    'display': title,
                }

    return DefaultFilterValue


@admin.register(ServiceRecord)
class ServiceRecordAdmin(admin.ModelAdmin):
    search_fields = ['product.title', 'user__email', 'user__company_name', 'sub_domain']
    list_filter = ['licence_type', 'created', 'valid_until', 'product', 'user']
    list_display = ['user', 'product', 'licence_type', 'sub_domain', 'domain_code', 'domain_ext', 'status', 'valid_until', 'created']


@admin.register(Deployment)
class DeploymentAdmin(admin.ModelAdmin):
    # search_fields = ['product.title', 'user__email', 'user__company_name', 'sub_domain']
    list_filter = ['deployment_status', 'service_record__user']
    list_display = ['service_record', 'deployment_status', 'app_user', 'app_pass']

