from django.views.generic import TemplateView
from ecommerce.flatpages.models import FlatPage
from django.shortcuts import redirect


class HomeView(TemplateView):
    """
    This is the home page and will typically live at /
    """
    template_name = 'promotions/home.html'

    def dispatch(self, request, *args, **kwargs):
        try:
            flatPage = FlatPage.objects.get(url='/')
            return redirect('/', True)
        except Exception as e:
            return super().dispatch(request, *args, **kwargs)