from django.db import migrations

def create_email_tempates(apps, schema_editor):
    EmailTemplate = apps.get_model('dit_email_addon', 'EmailTemplate')
    email_body = ''' <html><body>
                    Name: {{ name }}<br>
                    Company Name: {{ company_name }}<br>
                    Job Title: {{ job_title }}<br>
                    Employees: {{ employees }}<br>
                    Yearly Turnover: {{ yearly_turnover }}<br>
                    Type of Business: {{ type_of_business }}<br>
                    Interested In: {{ interested_in }}<br>
                    Phone: {{ phone }}<br>
                    Email: {{ email }}<br>
                    Country: {{ country }}<br>
                    Message: {{ message }}<br>
                    </body></html>'''
    email_body = email_body.replace('\n', '').replace('\t', '')
    EmailTemplate.objects.get_or_create(
        code="qoute",
        defaults={
            'title': 'Qoutation Request to Admin',
            'subject': 'New Qoutation form submitted',
            'body': email_body
        }
    )

    EmailTemplate.objects.get_or_create(
        code="qoute_reply",
        defaults={
            'title': 'Qoute Reply to User',
            'subject': 'Thank You for Contacting Us',
            'body': '''<html><body><h2>Thank You for contacting Us</h2><p>We will get back to you soon!</p></body></html>'''
        }
    )

class Migration(migrations.Migration):

    dependencies = [
        ('divineit', '0019_auto_20180813_1258')
    ]

    operations = [
        migrations.RunPython(create_email_tempates),
    ]
