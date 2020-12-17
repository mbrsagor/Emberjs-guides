from django.contrib import admin
from .models import Menu, CustomForm, CustomFormData, Snippet, User, SeoItem
from django.contrib.admin import ModelAdmin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

admin.site.register(Menu)
admin.site.register(CustomForm)
admin.site.register(CustomFormData)
admin.site.register(Snippet)

admin.site.register(SeoItem)


class CustomUserAdmin(UserAdmin):
    model = User
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'email', 'company_name')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
        (_('AutoDeploy'), {'fields': ('max_free_trial_per_product', 'max_total_autodeploy')}),
    )


admin.site.register(User, CustomUserAdmin)
