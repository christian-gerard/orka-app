"""
Serializers for the Account API
"""

from django.contrib.auth import (
    get_user_model,
    authenticate,
)

from rest_framework import serializers
from django.utils.translation import gettext as _

from core.models import Account


class AccountSerializer(serializers.ModelSerializer):
    """Serializes Account Data"""

    class Meta:
        model = Account
        fields = ['id', 'name', 'type']
        read_only_fields = ["id"]


