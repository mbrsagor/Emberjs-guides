from django.shortcuts import get_object_or_404, reverse, redirect
from django.views.generic import FormView, DetailView, View, ListView
from django.http.response import JsonResponse, HttpResponse
from autodeploy.forms import AutodeployForm
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from oscar.core.loading import get_model
from autodeploy.models import ServiceRecord, Deployment
from django.contrib import messages
from autodeploy.utils import request_progress_scale_from_ads, request_progress_from_ads, auto_deploy_async
from django.forms.models import model_to_dict

from ecommerce.core.adapter import EcommerceAccountAdapter
from constance import config

Product = get_model('catalogue', 'Product')


def get_product_remote_menu(product):
    return product.remote_menu_url if product.remote_menu_url and product.remote_menu_url != '' else product.parent.remote_menu_url


@method_decorator(login_required, name='dispatch')
class StartTrialFormView(FormView):
    form_class = AutodeployForm
    template_name = 'autodeploy/autodeploy.html'
    product = None
    eligible = True

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        kwargs['initial'] = kwargs.get('initial', {})
        kwargs['initial']['product'] = self.product
        return kwargs

    def dispatch(self, request, *args, **kwargs):
        product_slug = kwargs.pop('slug')
        self.product = get_object_or_404(Product, slug=product_slug)
        self.eligible, message = ServiceRecord.check_for_eligibility(request.user, self.product)
        if not self.eligible:
            messages.error(request, message)
        return super().dispatch(request, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(StartTrialFormView, self).get_context_data(**kwargs)
        context['eligible'] = self.eligible
        context['product'] = self.product
        context['remote_product_menu_url'] = get_product_remote_menu(self.product)
        return context

    def form_valid(self, form):

        if not self.eligible:
            return redirect(reverse('autodeploy:start-free-trial', kwargs={'product_id': self.product.id}))

        service_record = ServiceRecord.create_new(
            product=self.product, user=self.request.user, sub_domain=form.cleaned_data['sub_domain'])
        if self.product.auto_deploy_approval_required:
            EcommerceAccountAdapter.send_email('AUTODEPLOY_APPROVAL_REQUEST', config.ADMIN_EMAIL, context={
                'servicerecord': service_record,
                'user': service_record.user,
                'request': self.request,
                'config': config
            })

        return redirect(reverse('autodeploy:status', kwargs={'pk': service_record.id}))


@method_decorator(login_required, name='dispatch')
class Autodeploy(View):
    http_method_names = ['post']

    def post(self, request, **kwargs):
        if request.user.is_staff or request.user.is_superuser:
            servicerecord = get_object_or_404(ServiceRecord, id=kwargs['pk'])
        else:
            servicerecord = get_object_or_404(ServiceRecord, id=kwargs['pk'], user=request.user)
        if servicerecord.approved_for_deploy:
            if servicerecord.deployment is not None and servicerecord.deployment.deployment_status == Deployment.DEPLOYMENT_COMPLETE:
                return JsonResponse({'status': 'already_deployed'})
            elif servicerecord.deployment is not None:
                return JsonResponse({'status': 'in_progress'})
            else:
                deployment = Deployment.create(servicerecord)
                deployment = auto_deploy_async(deployment)
                return JsonResponse({'status': 'deploy_started'})
        else:
            return JsonResponse({'status': 'not_approved'})


@method_decorator(login_required, name='dispatch')
class AutoDeployStatus(DetailView):
    model = ServiceRecord

    def get_template_names(self):
        if self.object.approved_for_deploy:
            return ['autodeploy/status.html']
        else:
            return ['autodeploy/waiting_for_approval.html']

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['remote_product_menu_url'] = get_product_remote_menu(self.object.product)
        return context


@method_decorator(login_required, name='dispatch')
class TrackProgress(View):
    http_method_names = ['get']

    def get(self, request, pk, **kwargs):
        if request.user.is_staff or request.user.is_superuser:
            service_record = get_object_or_404(ServiceRecord, id=pk)
        else:
            service_record = get_object_or_404(ServiceRecord, id=pk, user=request.user)
        resp = request_progress_from_ads(service_record.sub_domain)

        resp.update({
            'deployment': model_to_dict(service_record.deployment) if service_record.deployment else {},
            'url': service_record.url
        })
        return JsonResponse(resp)


@method_decorator(login_required, name='dispatch')
class GetProgressBarScale(View):
    http_method_names = ['get']

    def get(self, request, pk, **kwargs):
        return HttpResponse(request_progress_scale_from_ads())
