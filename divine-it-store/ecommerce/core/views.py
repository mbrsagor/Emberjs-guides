import json

from django.shortcuts import render, reverse, redirect
from django.core.mail import EmailMessage
from django.http import HttpResponse, HttpResponseRedirect, Http404, HttpResponseNotAllowed
from django.shortcuts import get_object_or_404
from django.template.loader import get_template
from django.views import generic
from haystack.query import SearchQuerySet
from allauth.account.utils import send_email_confirmation
from .models import CustomForm, CustomFormData
from django.contrib.auth.decorators import login_required
from allauth.account.models import EmailAddress
from django.http.response import JsonResponse


@login_required
def resend_verification_email(request):
    if request.method == 'POST':
        if not EmailAddress.objects.filter(user=request.user,
                                               verified=True).exists():
            send_email_confirmation(request, request.user)
            return render(request,
                          'account/verified_email_required.html')
        else:
            raise Http404('Email address already verified')
    else:
        raise Http404('Invalid request')


def autocomplete(request):
    sqs = SearchQuerySet().autocomplete(title=request.GET.get('q', ''))[:5]
    suggestions = [result.title for result in sqs]
    # Make sure you return a JSON object, not a bare list.
    # Otherwise, you could be vulnerable to an XSS attack.
    the_data = json.dumps({
        'results': suggestions
    })
    return HttpResponse(the_data, content_type='application/json')


class CustomFormDataSubmit(generic.View):

    def post(self, request, *args, **kwargs):
        custom_form_pk = kwargs.get('pk')
        mail_to = kwargs.get('mail_to')
        subject = kwargs.get('subject')
        custom_form_obj = get_object_or_404(CustomForm, pk=custom_form_pk)
        user = request.user
        frm_data = dict(request.POST)
        form_data = json.dumps({k: v for k, v in frm_data.items() if k != 'csrfmiddlewaretoken'})
        try:
            CustomFormData.objects.get_or_create(form=custom_form_obj, user=user, form_data=form_data)
            ## The following code is for mail sender
            subject = subject
            to = [mail_to]
            from_email = ''

            user = "{} {}".format(frm_data.get('first-name')[0], frm_data.get('last-name')[0])

            ctx = {
                'subject': frm_data.get('subject')[0],
                'user': user,
            }

            message = get_template('core/form_snippets/email_template.html').render(ctx)
            msg = EmailMessage(subject, message, to=to, from_email=from_email)
            msg.content_subtype = 'html'
            msg.send()
        except:
            raise ValueError("Value Error")
        return HttpResponseRedirect('/')


def menu_api_view(request):
    if request.user.is_authenticated:
        if request.user.email:
            username = request.user.email.split('@')[0]
        else:
            username = request.user.username
    else:
        username = None
    return render(request, 'api/menu.html', context={
        'username': username,
        'basket_count': request.basket.num_lines
    })


def change_currency_view(request):
    if request.method == 'POST':
        currency = request.POST.get('currency')
        if currency == 'USD':
            request.session['SELECTED_CURRENCY'] = 'USD'
        elif currency == 'BDT':
            request.session['SELECTED_CURRENCY'] = 'BDT'
        next_path = request.META.get('HTTP_REFERER', None) or '/'
        return redirect(next_path)
    else:
        return HttpResponseNotAllowed(permitted_methods=['post'])
    #
    # if request.user.is_authenticated:
    #     return JsonResponse({
    #         'status': 'success',
    #         'items': [
    #             {
    #                 'name': 'Profile',
    #                 'url': request.build_absolute_uri('/accounts/profile/')
    #             },
    #             {
    #                 'name': 'Cart',
    #                 'url': request.build_absolute_uri(reverse('basket:summary'))
    #             }
    #         ]
    #     })
    # else:
    #     return JsonResponse({
    #         'status': 'success',
    #         'items': [
    #             {
    #                 'name': 'Login',
    #                 'url': request.build_absolute_uri('/accounts/login/')
    #             },
    #             {
    #                 'name': 'Signup',
    #                 'url': request.build_absolute_uri('/accounts/signup/')
    #             }
    #         ]
    #     })