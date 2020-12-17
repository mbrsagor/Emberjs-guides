import ast
import requests
import json
from dateutil.relativedelta import relativedelta
from django.core.serializers.json import DjangoJSONEncoder
from datetime import datetime
from urllib.parse import urljoin
from constance import config
import logging
import threading
from constance import config
from ecommerce.core.adapter import EcommerceAccountAdapter

logger = logging.getLogger(__name__)

ADS_ACTION_DEPLOY = 'process_deploy/'
ADS_ACTION_LICENCE_UPDATE = 'update_subscription_package/'
ADS_ACTION_DEACTIVATE = 'deactivate_subscription/'
ADS_ACTION_ROLLBACK = 'delete_subscription/'
ADS_ACTION_PROGRESS_SCALE = 'resource/progress_scale/'
ADS_ACTION_PROGRESS_TRACK= 'resource/track_progress/'


def get_expiry_date(till_days, from_date=datetime.now().date()):
    return from_date + relativedelta(days=till_days)


def request_ads_to_deploy(deployment):
    service_record = deployment.service_record
    user = service_record.user

    post_data = {
        "product": deployment.product_code,
        "domain": deployment.domain_code,
        "valid_until": deployment.service_record.valid_until,
        "client_info": {
            "name": f'{user.first_name} {user.last_name}',
            "username": user.username,
            "cert_client_code": user.cert_client_code,
            "cert_subscription_code": deployment.cert_subscription_code,
            "code": deployment.sub_domain,
            "company_name": user.company_name,
            "email": user.email,
            "phone": str(user.mobile_number)
        },
        "license": {
            "package_code": deployment.product_code,
            "license_matrices": deployment.get_license_matrics()
        }
    }
    success, response_data = request_to_ads(post_data, action=ADS_ACTION_DEPLOY)
    return success, response_data


def request_ads_to_deactivate(deployment, keep_backup=True):
    try:
        post_data = {
            "cert_client_code": deployment.service_record.user.cert_client_code,
            "cert_subscription_code": deployment.cert_subscription_code,
            "actions": {
                'subscription': 'delete_subscription'
            }
        }

        if keep_backup:
            action = ADS_ACTION_DEACTIVATE
            status = deployment.DEPLOYMENT_INACTIVE
        else:
            action = ADS_ACTION_ROLLBACK
            post_data['actions'].update({
                'subdomain': 'delete_subdomain',
                'client_rollback': '1',
            })
            status = deployment.DEPLOYMENT_DELETED

        success, response_data = request_to_ads(post_data, action=action)
        if success:
            deployment.status = status
            deployment.save()
            return True, None
        else:
            err_msg = response_data.get('reason', 'Failed')

    except Exception as e:
        err_msg = str(e)
    
    return False, err_msg


def request_progress_scale_from_ads():
    url = urljoin(config.ADS_URL, ADS_ACTION_PROGRESS_SCALE)
    return requests.post(url, {}).content


def request_progress_from_ads(client_code):
    url = urljoin(config.ADS_URL, ADS_ACTION_PROGRESS_TRACK)
    return requests.post(url, params={'client_code': client_code}).json()


def request_to_ads(data, action):
    data.update({
        "access_token": config.ADS_ACCESS_TOKEN,
        "client_code": config.ADS_CLIENT_CODE
    })
    url = urljoin(config.ADS_URL, action)
    success = False
    response_data = {"status": "error", "message": "We could not connect to our server. Please contact support.",
                     "reason": "Connection Error!"}
    data_to_post = json.dumps(data, cls=DjangoJSONEncoder)
    logger.info(f'Submitting deploy request with data: {data_to_post}')
    try:
        response = requests.post(url, data={'data': data_to_post})
        try:
            response_data = json.loads(response.content)
        except ValueError:
            try:
                response_data = ast.literal_eval(response.content)
            except SyntaxError:
                response_data = {"status": "error",
                                 "message": "Could not understand server response. Please contact support.",
                                 "reason": "server response: {}".format(response.content)}
        success = response_data.get('status') == 'success'
    except Exception as e:
        logger.exception('Unable to perform')
    return success, response_data


def auto_deploy(deployment):
    logger.info(f'Performing auto deploy for deployment id: {deployment.id}')
    try:
        from autodeploy.models import Deployment, ServiceRecord
        success, response_data = request_ads_to_deploy(deployment)
        if success:
            logger.info(f'Auto deploy success for deployment id: {deployment.id}')
            deployment.deployment_status = Deployment.DEPLOYMENT_COMPLETE
            deployment.app_user = response_data.get('data', {}).get('app_user')
            deployment.app_pass = response_data.get('data', {}).get('app_pass')
            deployment.service_record.user.cert_client_code = response_data.get('data', {}).get('cert_client_code')
            deployment.cert_subscription_code = response_data.get('data', {}).get('cert_subscription_code')
            deployment.service_record.status = ServiceRecord.LICENCE_UPDATED
        else:
            logger.info(f'Auto deploy failed for deployment id: {deployment.id}')
            deployment.deployment_status = Deployment.DEPLOYMENT_ERROR_OCCURRED
            deployment.error = response_data.get('message', '')
            deployment.error_details = response_data.get('reason', '')
        deployment.save()
        deployment.service_record.user.save()
        deployment.service_record.save()

        email_context = {
            'servicerecord': deployment.service_record,
            'user': deployment.service_record.user,
            'deployment': deployment
        }

        if success:
            logger.info(f'Sending success email for deployment: {deployment.id}')
            EcommerceAccountAdapter.send_email('AUTODEPLOY_DONE', deployment.service_record.user.email, context=email_context)
        else:
            logger.info(f'Sending failed email for deployment: {deployment.id}')
            EcommerceAccountAdapter.send_email('AUTODEPLOY_ERROR', config.ADMIN_EMAIL, context=email_context)

        return deployment
    except Exception as e:
        logger.exception('Unable to perform autodeployment')


def auto_deploy_async(deployment):
    threading.Thread(target=auto_deploy, args=[deployment]).start()


def deactivate_deployment(deployment, keep_backup=True):
    from autodeploy.models import Deployment
    success, err_msg = False, ''
    try:
        active_service = deployment.service_record

        # sample POST data
        # post_data = {
        #     "access_token": "22f700f5624964838b4a70c315540469",
        #     "client_code": "testmarketplace",
        #
        #     "cert_subscription_code": 'excel-prism-1',
        #     "actions": {
        #         'subdomain': 'delete_subdomain',
        #         'client': 1,
        #         'subscription': 'delete_subscription'
        #     }
        # }
        post_data = {
            "cert_client_code": active_service.user.cert_client_code,
            "cert_subscription_code": active_service.deployment.cert_subscription_code,
            "actions": {
                'subscription': 'delete_subscription'
            }
        }

        if keep_backup:
            action = ADS_ACTION_DEACTIVATE
            status = Deployment.DEPLOYMENT_INACTIVE
        else:
            action = ADS_ACTION_ROLLBACK
            post_data['actions'].update({
                'subdomain': 'delete_subdomain',
                'client_rollback': '1',
            })
            status = Deployment.DEPLOYMENT_DELETED

        success, response_data = request_to_ads(post_data, action=action)
        if success:
            deployment.deployment_status = status
            deployment.save()
        else:
            err_msg = response_data.get('reason', 'Failed')
    except Exception as e:
        logging.exception('Unable to deactivate deployment')
        err_msg = str(e)

    return success, err_msg
