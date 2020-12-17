from django.views import generic
from django_tables2.views import SingleTableView
from autodeploy.dashboard import tables
from autodeploy.models import ServiceRecord
from autodeploy.utils import deactivate_deployment
from django.shortcuts import redirect, reverse
from datetime import datetime
from autodeploy.dashboard.forms import *
from django.contrib import messages


class ServiceRecordListView(SingleTableView):
    table_class = tables.ServiceRecordTable
    context_table_name = 'servicerecords'
    template_name = 'autodeploy/dashboard/servicerecord_list.html'
    queryset = ServiceRecord.objects.all()


class ServiceRecordRequestListView(SingleTableView):
    table_class = tables.ServiceRecordRequestTable
    context_table_name = 'servicerecords'
    template_name = 'autodeploy/dashboard/servicerecordrequest_list.html'
    queryset = ServiceRecord.objects.filter(approved_for_deploy=False)


class ApproveAndDeployView(generic.DetailView):
    model = ServiceRecord
    http_method_names = ['post']

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        self.object.approved_for_deploy = True
        self.object.approved_by = request.user
        self.object.approved_at = datetime.now()
        self.object.save()
        return redirect(reverse('autodeploy:status', kwargs={'pk': self.object.id}))


class DeployDeactivateView(generic.DetailView):
    template_name = 'autodeploy/dashboard/deactivate_service.html'
    http_method_names = ['get', 'post']
    context_object_name = 'service'
    model = ServiceRecord

    def post(self, request, **kwargs):
        self.object = self.get_object()
        keep_backup = not request.POST.get('delete', False)
        if self.object.deployment:
            success, err = deactivate_deployment(self.object.deployment, keep_backup=keep_backup)
            if success:
                messages.success(request, f'Successfully Deactivated Deployment {self.object.deployment.id} of Service {self.object.id}')
            else:
                messages.error(request, f'Unable to deactivate Deployment {self.object.deployment.id} of Service {self.object.id}. {err}')
        else:
            messages.error(request, f'No deployment found for Service {self.object.id}')
        return redirect(reverse('dashboard:servicerecords-list'))