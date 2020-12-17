import logging
from .models import Configuration
from django.http.response import JsonResponse
from django.contrib.auth.decorators import login_required
from oscar.core.loading import get_model

logger = logging.getLogger(__name__)
Product = get_model('catalogue', 'Product')


@login_required
def store_user_configuration(request):
    """
    Store configuration api for a particular user and identifier
    :param request:
    :return:
    """
    if request.method == 'POST':
        data = request.POST.get('data')
        identifier = request.POST.get('identifier')
        ref = request.POST.get('ref')
        try:
            product_id = int(request.POST.get('product_id'))
            product = Product.objects.get(pk=product_id)
            instance = Configuration.store(ref=ref, identifier=identifier, product=product, user=request.user, data=data)
            return JsonResponse({'status': 'success', 'ref': instance.ref}, status=200)
        except Exception as e:
            logger.error('Unable to save configuration', e)
            return JsonResponse({'status': 'failed', 'message': str(e)}, status=400)
    else:
        return JsonResponse({'status': 'failed', 'message': 'Invalid request'}, status=404)
