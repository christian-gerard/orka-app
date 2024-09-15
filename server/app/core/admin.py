"""
Django Admin Customization
"""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

from core import models


class UserAdmin(BaseUserAdmin):
    """Define the admin pages for users"""
    ordering = ['id']
    list_display = ['email']
    fieldsets = (
        (None, {'fields': ('email', 'password', 'accounts')}),
        (
            _('Permissions'),
            {
                'fields': (
                    'is_active',
                    'is_staff',
                    'is_superuser',
                )
            }
        ),
        (_('Important Dates'), {'fields': ('last_login',)}),
    )
    readonly_fields = ['last_login']
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'email',
                'password1',
                'password2',
                'first_name',
                'last_name',
                'is_active',
                'is_staff',
                'is_superuser',
            )
        }),
    )


class AccountAdmin(admin.ModelAdmin):
    """Define the admin pages for Accounts"""
    ordering = ['id']
    list_display = ['name', 'type']
    filter_horizontal = ('users',)
    fieldsets = (
        (None, {'fields': ('name', 'type')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'name',
                'type',

            )
        }),
    )


admin.site.register(models.User, UserAdmin)
admin.site.register(models.Account, AccountAdmin)
admin.site.register(models.Client)
admin.site.register(models.Project)
admin.site.register(models.Contact)
