"""
Serializers for the Account API
"""
from rest_framework import serializers

from core.models import Account
from client.serializers import ClientSerializer
# from project.serializers import TaskSerializer, ExpenseSerializer


class AccountSerializer(serializers.ModelSerializer):
    """Serializes Account Data"""

    class Meta:
        model = Account
        fields = ['id', 'name', 'type', 'clients', 'users']
        read_only_fields = ["id"]


class AccountDetailSerializer(AccountSerializer):
    """Serializes Account Detail Data"""

    class Meta(AccountSerializer.Meta):
        fields = AccountSerializer.Meta.fields
