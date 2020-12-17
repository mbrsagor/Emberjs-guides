import django_tables2
import django_tables2 as tables
from oscar.apps.dashboard.tables import DashboardTable

from .models import Snippet
class SnippetTable(DashboardTable):
    ACTION_TEMPLATE = '''
            
                <a class='btn btn-danger btn-sm' href='{% url 'dashboard:delete.snippet' pk=record.pk %}'>Delete</a>
                <a class='btn btn-warning btn-sm' href='{% url 'dashboard:edit.snippet' pk=record.pk%}'>Edit</a>
            
        '''
    action = django_tables2.TemplateColumn(ACTION_TEMPLATE)

    class Meta(DashboardTable.Meta):
        model = Snippet
        fields = ['title','code', 'action']
        template_name = 'django_tables2/bootstrap.html'