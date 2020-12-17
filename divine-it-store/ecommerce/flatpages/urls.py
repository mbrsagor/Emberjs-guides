from ecommerce.flatpages import views
from django.urls import path

urlpatterns = [
    path('<path:url>', views.flatpage, name='ecommerce.flatpages.views.flatpage'),
]
