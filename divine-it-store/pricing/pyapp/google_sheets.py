import os
from oauth2client.service_account import ServiceAccountCredentials
from googleapiclient.discovery import build


def get_credentials():
    scope = [
        'https://spreadsheets.google.com/feeds',
        'https://www.googleapis.com/auth/drive'
    ]
    credentials_file_path = os.path.join(os.path.dirname(__file__), 'credentials.json')
    return ServiceAccountCredentials.from_json_keyfile_name(credentials_file_path, scope)


def get_service(service_type, api_version='v3', cache_discovery=False):
    return build(service_type, api_version, credentials=get_credentials(), cache_discovery=cache_discovery)


def update_values(sheet_id, range_name, values):
    service = get_service('sheets', 'v4')
    body = {
        'values': values
    }
    result = service.spreadsheets().values().update(
        spreadsheetId=sheet_id,
        range=range_name,
        valueInputOption='RAW',
        body=body).execute()
