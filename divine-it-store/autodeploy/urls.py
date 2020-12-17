from django.urls import path
from ecommerce.core.decorators import verified_email_required
from autodeploy.views import *

app_name = 'autodeploy'

urlpatterns = [
    path('start-trial/<str:slug>/', verified_email_required(StartTrialFormView.as_view()), name='start-free-trial'),
    path('deploy/<str:pk>/perform/', verified_email_required(Autodeploy.as_view()), name='autodeploy'),
    path('deploy/<str:pk>/status/', verified_email_required(AutoDeployStatus.as_view()), name='status'),
    path('deploy/<str:pk>/progress-scale/', verified_email_required(GetProgressBarScale.as_view()), name='progress-scale'),
    path('deploy/<str:pk>/track-progress/', verified_email_required(TrackProgress.as_view()), name='track-progress'),
]
