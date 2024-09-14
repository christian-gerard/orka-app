"""
Serializers for the Account API
"""
from rest_framework import serializers

from core.models import Account
from user.serializers import UserSerializer
from client.serializers import ClientSerializer


class AccountSerializer(serializers.ModelSerializer):
    """Serializes Account Data"""

    class Meta:
        model = Account
        fields = ['id', 'name', 'type']
        read_only_fields = ["id"]


class AccountDetailSerializer(AccountSerializer):
    """Serializes Account Detail Data"""
    users = UserSerializer(many=True, read_only=True)
    clients = ClientSerializer(many=True, read_only=True)

    class Meta(AccountSerializer.Meta):
        fields = AccountSerializer.Meta.fields + ['clients', 'users']
