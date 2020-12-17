from django.shortcuts import render, get_object_or_404
from ecommerce.order.models import Order
from ecommerce.quotation.models import Quotation
from django.http.response import HttpResponse, JsonResponse


def quotation_status_view(request, pk):
    quotation = get_object_or_404(Quotation, pk=pk)
    if quotation.generated_pdf:
        return JsonResponse({
            'status': 'generated',
            'downloadUrl': quotation.generated_pdf.url
        })
    else:
        return JsonResponse({
            'status': 'not generated'
        })


def test(request):
    order = Order.objects.first()
    order.quotation.build()
    return HttpResponse("Ok!")
