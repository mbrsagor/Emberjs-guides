from django.shortcuts import render
from wagtailhyper.models import Menu, MenuItemToMenu
from django.http.response import JsonResponse
from divineit.models import Industry, Product, Solution, Service, Customer, RelatesSolutionToProduct, Event
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.forms.models import model_to_dict
from django.db.models import Q


def remote_toolbar(request):
    menu = Menu.objects.filter(code='toolbar_menu').first()
    result = []
    menuItems = MenuItemToMenu.objects.filter(menu=menu)
    for menuItem in menuItems:
        result.append({
            'title': menuItem.title,
            'url': menuItem.url if menuItem.url else request.build_absolute_uri(menuItem.page.get_url()),
            'description': menuItem.description,
            'image': request.build_absolute_uri(menuItem.image.file.url) if menuItem.image else None
        })
    return JsonResponse({
        'status': 'success',
        'menu_items': result
    })


def __build_contact_list(industry=None, product=None, service=None, solution=None):
    customers = Customer.objects.filter(show_in_site=True)
    if industry:
        try:
            industry = Industry.objects.filter(name=industry).first()
            customers = customers.filter(industries__in=[industry])
        except Exception as e:
            print(e)

    if product or service:
        try:
            product = Product.objects.filter(name=product).first()
            service = Service.objects.filter(name=service).first()
            customers = customers.filter(Q(products__in=[product]) | Q(services__in=[service]))
        except Exception as e:
            print(e)

    if solution:
        try:
            solution = Solution.objects.filter(name=solution).first()
            customers = customers.filter(solutions__in=[solution])
        except Exception as e:
            print(e)

    return customers.order_by('-rating', 'company_name').distinct()


def __build_paginated_list(customer_list, page=1, perPage=20):
    paginator = Paginator(customer_list, perPage)
    try:
        result = paginator.page(page)
    except PageNotAnInteger:
        result = paginator.page(1)
    except EmptyPage:
        result = paginator.page(paginator.num_pages)
    return paginator, result


def customer_to_dict(request, customer):
    result = model_to_dict(customer)
    if customer.logo:
        result['logo'] = request.build_absolute_uri(customer.logo.file.url)
    if customer.background_image:
        result['background_image'] = request.build_absolute_uri(customer.background_image.file.url)
    result['products'] = [item.name for item in customer.products.all()]
    result['services'] = [item.name for item in customer.services.all()]
    result['industries'] = [item.name for item in customer.industries.all()]
    result['solutions'] = [item.name for item in customer.solutions.all()]
    return result


def customers_api(request):
    perPage = request.GET.get('perPage', 20)
    product = request.GET.get('product', None)
    service = request.GET.get('service', None)
    industry = request.GET.get('industry', None)
    solution = request.GET.get('solution', None)
    page = request.GET.get('page', 1)

    customer_list = __build_contact_list(industry=industry, product=product, service=service, solution=solution)

    paginator, result = __build_paginated_list(customer_list, page=page, perPage=perPage)

    to_return = []
    for item in result:
        to_return.append(customer_to_dict(request, item))

    return JsonResponse({
        'status': 'success',
        'total': paginator.count,
        'perPage': perPage,
        'num_pages': paginator.num_pages,
        'current_page': page,
        'result': to_return
    })


def products_api(request):
    products = Product.objects.all()
    results = []
    for product in products:
        solutions = RelatesSolutionToProduct.objects.filter(product=product)
        solutions = [model_to_dict(solution) for solution in solutions]
        tmp = model_to_dict(product)
        tmp['solutions'] = solutions
        results.append(tmp)
    return JsonResponse({
        'results': results
    })


def industries_api(request):
    industries = Industry.objects.order_by('name')
    results = [model_to_dict(industry) for industry in industries]
    return JsonResponse({
        'results': results
    })


def services_api(request):
    services = Service.objects.all()
    results = [model_to_dict(service) for service in services]
    return JsonResponse({
        'results': results
    })


def solutions_api(request):
    solutions = Solution.objects.all()
    results = [model_to_dict(solution) for solution in solutions]
    return JsonResponse({
        'results': results
    })


def partial_render_api(request):
    partial = request.GET.get('partial')
    return render(request, template_name=f'{partial}.html')


def event_details(request, title):
    event = Event.objects.get(title=title)
    context = {
        'event': event
    }
    template_name = 'wagtailhyper/blocks/events/event_details.html'
    return render(request, template_name, context)
