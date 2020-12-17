from autodeploy.dashboard.views import *
from django.urls import path

# loaded by ecommerce.dashboard.extensions.app
autodeploy_dashboard_urls = [
    path('autodeploy/servicerecords/', ServiceRecordListView.as_view(), name='servicerecords-list'),
    path('autodeploy/requests/', ServiceRecordRequestListView.as_view(), name='servicerecords-requests'),
    path('autodeploy/approve/<str:pk>/', ApproveAndDeployView.as_view(), name='servicerecords-approve'),
    path('autodeploy/deactivate/<str:pk>/', DeployDeactivateView.as_view(), name='servicerecords-deactivate'),
]


