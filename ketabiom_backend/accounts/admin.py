# accounts/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = [
        'id',
        'username',
        'email',
        'first_name',
        'last_name',
        'is_staff',
    ]

    fieldsets = UserAdmin.fieldsets + (
        ('Profile', {
            'fields': ('profile_image',)
        }),
    )