from django.urls import path
from .views import store_user_configuration

app_name = 'pricing'

urlpatterns = [
    path('save-configuration/', store_user_configuration, name='save-config')
]