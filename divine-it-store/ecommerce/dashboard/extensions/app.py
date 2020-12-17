from django.conf.urls import url
from django.urls import path
from oscar.core.application import DashboardApplication
from oscar.core.loading import get_class
from autodeploy.dashboard import autodeploy_dashboard_urls


class ExtensionsApplication(DashboardApplication):
    name = None

    default_permissions = ['is_staff', ]
    permissions_map = _map = {
        'file-manager-index': (['is_staff'], ['partner.dashboard_access']),
    }

    browseview = get_class('dashboard.extensions.views', 'BrowseIframeView')
    imagesearchview = get_class('dashboard.extensions.views', 'ImageSearchView')
    createmenuview = get_class('dashboard.extensions.views', 'MenuCreateView')
    editmenuview = get_class('dashboard.extensions.views', 'MenuUpdateView')
    deletemenuview = get_class('dashboard.extensions.views', 'MenuDeleteView')
    createformview = get_class('dashboard.extensions.views', 'CustomFormCreateView')
    editformview = get_class('dashboard.extensions.views', 'CustomFormUpdateView')
    deleteformview = get_class('dashboard.extensions.views', 'CustomFormDeleteView')
    renderformview = get_class('dashboard.extensions.views', 'CustomFormRenderView')
    SnippetCreateView = get_class('dashboard.extensions.views', 'SnippetCreateView')
    SnippetListView = get_class('dashboard.extensions.views', 'SnippetListView')
    SnippetDeleteView = get_class('dashboard.extensions.views', 'SnippetDeleteView')
    SnippetEditView = get_class('dashboard.extensions.views', 'SnippetEditView')



    def get_urls(self):
        urls = [
            url(r'browse$', self.browseview.as_view(), name='extensions-browse'),
            url(r'^api/images/', self.imagesearchview.as_view(), name='extensions-image-api'),
            url(r'menus/$', self.createmenuview.as_view(), name='extensions-create-menu'),
            path('menus/<int:pk>/edit/', self.editmenuview.as_view(), name='extensions-edit-menu'),
            path('menus/<int:pk>/delete/', self.deletemenuview.as_view(), name='extensions-delete-menu'),
            url(r'forms/$', self.createformview.as_view(), name='extensions-create-form'),
            path('forms/<int:pk>/edit/', self.editformview.as_view(), name='extensions-edit-form'),
            path('forms/<int:pk>/delete/', self.deleteformview.as_view(), name='extensions-delete-form'),
            path('forms/<int:pk>/', self.renderformview.as_view(), name='extensions-render-form'),
            path('snippet/create/', self.SnippetCreateView.as_view(), name='create.snippet'),
            path('snippet/list/', self.SnippetListView.as_view(), name='list.snippet'),
            path('snippet/delete/<int:pk>/', self.SnippetDeleteView.as_view(), name='delete.snippet'),
            path('snippet/edit/<int:pk>/', self.SnippetEditView.as_view(), name='edit.snippet'),
        ] + autodeploy_dashboard_urls
        return self.post_process_urls(urls)


application = ExtensionsApplication()


