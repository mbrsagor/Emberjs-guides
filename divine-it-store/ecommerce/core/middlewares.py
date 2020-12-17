from django.contrib.gis.geoip2 import GeoIP2
import logging

logger = logging.getLogger(__name__)


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def currency_middleware(get_response):
    # One-time configuration and initialization.

    def middleware(request):
        g = GeoIP2()
        client_ip = get_client_ip(request)

        if request.basket.currency is None:
            selected_currency = request.session.get('SELECTED_CURRENCY')
            if selected_currency:
                setattr(request, 'currency', selected_currency)
            else:
                try:
                    country = g.country(client_ip)
                    logger.info(country)
                    if country['country_code'] != 'BD':
                        setattr(request, 'currency', 'USD')
                    else:
                        setattr(request, 'currency', 'BDT')
                except Exception as _:
                    setattr(request, 'currency', 'BDT')
                    logger.error(f'Unable to find country for ip {client_ip}')
        else:
            setattr(request, 'currency', request.basket.currency)

        # setattr(request, 'currency', 'USD')
        response = get_response(request)
        # Code to be executed for each request/response after
        # the view is called.

        return response

    return middleware