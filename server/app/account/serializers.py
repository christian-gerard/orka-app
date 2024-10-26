"""
Serializers for the Account API
"""
from rest_framework import serializers

from core.models import Account, Project, Client
from user.serializers import UserSerializer
from client.serializers import ClientSerializer
from project.serializers import TaskSerializer, ExpenseSerializer


class AccountSerializer(serializers.ModelSerializer):
    """Serializes Account Data"""
    users = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Account
        fields = ['id', 'name', 'type', 'users']
        read_only_fields = ["id"]


class AccountDetailSerializer(AccountSerializer):
    """Serializes Account Detail Data"""
    users = UserSerializer(many=True)
    clients = ClientSerializer(many=True)

    class Meta(AccountSerializer.Meta):
        fields = AccountSerializer.Meta.fields + ['clients', 'users']
