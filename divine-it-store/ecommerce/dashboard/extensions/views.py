from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views import generic
from filer.models import Folder, Image, File
from django.urls import reverse, reverse_lazy
from django.db.models import Q
from oscar.core.loading import get_class, get_model

from django.urls import reverse_lazy
from django.views.generic import edit as editViews
from django_tables2.views import SingleTableMixin, SingleTableView
from ecommerce.core.models import Snippet
from ecommerce.core.tables import SnippetTable
from django.http import HttpResponseRedirect

import json

from ecommerce.core.models import Menu, CustomForm, CustomFormData
from ecommerce.flatpages.models import FlatPage

Category = get_model('catalogue', 'category')

# Create your views here.

class MenuCreateView(generic.CreateView):
    model = Menu
    template_name = 'core/menu_builder.html'
    fields = ('name', 'code', 'content')

    def get_context_data(self, *args, **kwargs):
        context = super(MenuCreateView, self).get_context_data(*args, **kwargs)
        context['categories'] = Category.objects.all()
        context['flatpages'] = FlatPage.objects.all()
        context['all_menus'] = Menu.objects.all()
        return context

class MenuUpdateView(generic.UpdateView):
    model = Menu
    template_name = 'core/menu_builder.html'
    fields = ('name', 'code', 'content')

    def get_context_data(self, *args, **kwargs):
        context = super(MenuUpdateView, self).get_context_data(*args, **kwargs)
        context['categories'] = Category.objects.all()
        context['flatpages'] = FlatPage.objects.all()
        context['all_menus'] = Menu.objects.all()
        context['current_menu'] = json.loads(self.get_object().content)
        return context

class MenuDeleteView(generic.DeleteView):
    model = Menu
    success_url = reverse_lazy('dashboard:extensions-create-menu')



class CustomFormCreateView(generic.CreateView):
    model = CustomForm
    template_name = 'core/form_builder.html'
    fields = ('name', 'code', 'content')

    def get_context_data(self, *args, **kwargs):
        context = super(CustomFormCreateView, self).get_context_data(*args, **kwargs)
        context['all_forms'] = CustomForm.objects.all()
        return context

class CustomFormUpdateView(generic.UpdateView):
    model = CustomForm
    template_name = 'core/form_builder.html'
    fields = ('name', 'code', 'content')

    def get_context_data(self, *args, **kwargs):
        context = super(CustomFormUpdateView, self).get_context_data(*args, **kwargs)
        context['all_forms'] = CustomForm.objects.all()
        context['current_form'] = json.loads(self.get_object().content)
        return context

class CustomFormDeleteView(generic.DeleteView):
    model = CustomForm
    success_url = reverse_lazy('dashboard:extensions-create-form')


class CustomFormRenderView(generic.DetailView):
    model = CustomForm
    template_name = 'core/form_render.html'



class BaseSearchView(generic.ListView):
    paginate_by = 20
    ordering = ('id',)

    def render_to_response(self, context, **response_kwargs):
        return JsonResponse(
            self.get_data(context),
            **response_kwargs
        )


class ImageSearchView(BaseSearchView):

    def get_queryset(self):
        q = self.request.GET.get('q', None)
        if q is None:
            return Image.objects.filter()
        else:
            return Image.objects.filter(Q(name__icontains=q) | Q(original_filename__icontains=q))

    def get_data(self, context):
        current_page = self.request.GET.get('page', 1)
        return {
            'total': context['paginator'].count,
            'num_pages': context['paginator'].num_pages,
            'per_page': context['paginator'].per_page,
            'current_page': current_page,
            'result': list(map(lambda x: {
                'title': x.name if x.name and x.name != '' else x.original_filename,
                'url': x.url,
                'id': x.id
            }, context['image_list']))
        }


class SVGSearchView(BaseSearchView):

    def get_queryset(self):
        q = self.request.GET.get('q', None)
        queryset = File.objects.filter(original_filename__endswith='.svg')
        if q is None:
            return queryset
        else:
            return queryset.filter(Q(name__icontains=q) | Q(original_filename__icontains=q))

    def get_data(self, context):
        current_page = self.request.GET.get('page', 1)
        return {
            'total': context['paginator'].count,
            'num_pages': context['paginator'].num_pages,
            'per_page': context['paginator'].per_page,
            'current_page': current_page,
            'result': list(map(lambda x: {
                'title': x.name if x.name and x.name != '' else x.original_filename,
                'url': x.url,
                'id': x.id
            }, context['object_list']))
        }


class BrowseIframeView(generic.TemplateView):
    template_name = 'dashboard/filemanager/browse_iframe.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['iframe_url'] = "%s?_popup" % reverse('admin:filer_folder_changelist')
        return context


class SnippetCreateView(editViews.CreateView):
    model = Snippet
    fields = '__all__'
    template_name = 'core/snippet/snippet_create.html'
    success_url = reverse_lazy('dashboard:list.snippet')

class SnippetListView(SingleTableMixin, generic.ListView):
    table_class = SnippetTable
    queryset = Snippet.objects.all()
    template_name = 'core/snippet/snippet_list.html'

class SnippetDeleteView(generic.DeleteView):
    model = Snippet
    success_url = reverse_lazy('dashboard:list.snippet')

class SnippetEditView(generic.UpdateView):
    model = Snippet
    fields = '__all__'
    template_name = 'core/snippet/snippet_edit.html'
    success_url = reverse_lazy('dashboard:list.snippet')

