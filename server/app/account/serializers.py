"""
Serializers for the Account API
"""
from rest_framework import serializers

from core.models import Account


class AccountSerializer(serializers.ModelSerializer):
    """Serializes Account Data"""

    class Meta:
        model = Account
        fields = ['id', 'name', 'type']
        read_only_fields = ["id"]
