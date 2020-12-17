from django.contrib import admin
from treebeard.admin import TreeAdmin
from treebeard.forms import movenodeform_factory
from base import models

admin.site.register(models.PaymentVerify)
admin.site.register(models.UpcomingEvent)
admin.site.register(models.EmailSubscription)
admin.site.register(models.ContentForm3)
