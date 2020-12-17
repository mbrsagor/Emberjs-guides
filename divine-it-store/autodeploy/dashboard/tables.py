from oscar.core.loading import get_class
from autodeploy.models import ServiceRecord
import django_tables2 as tables

DashboardTable = get_class('dashboard.tables', 'DashboardTable')


class ServiceRecordTable(DashboardTable):



    action = tables.TemplateColumn("""
        <a href="{% url 'dashboard:servicerecords-deactivate' pk=record.pk %}">Deactivate</a>
    """)

    class Meta(DashboardTable.Meta):
        model = ServiceRecord
        fields = ('user', 'product', 'updated', 'status', 'deployment.deployment_status')
        order_by = '-updated'


class ServiceRecordRequestTable(DashboardTable):

    action = tables.TemplateColumn("""
    <form method="post" action="{% url 'dashboard:servicerecords-approve' pk=record.pk %}">
        {% csrf_token %}
        <button type="submit" class="btn btn-primary">Approve & Deploy</button>
    </form>
    """)

    class Meta(DashboardTable.Meta):
        model = ServiceRecord
        fields = ('user', 'product', 'updated', 'status')
        order_by = '-updated'
