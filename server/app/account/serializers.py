"""
Serializers for the Account API
"""
from rest_framework import serializers

from core.models import Account, Project, Client
from user.serializers import UserSerializer
from client.serializers import ContactSerializer
from project.serializers import TaskSerializer, ExpenseSerializer


class ProjectSerializer(serializers.ModelSerializer):
    """Serializes Account Data"""

    class Meta:
        model = Project
        fields = ['id', 'name', 'deadline', 'description', 'project_type', 'budget', 'client']
        read_only_fields = ["id"]


class ProjectDetailSerializer(ProjectSerializer):
    """Serializes Account Detail Data"""
    users = UserSerializer(many=True, read_only=True)
    tasks = TaskSerializer(many=True, read_only=True)
    expenses = ExpenseSerializer(many=True, read_only=True)

    class Meta(ProjectSerializer.Meta):
        fields = ProjectSerializer.Meta.fields + ['users', 'tasks', 'expenses']


class ClientSerializer(serializers.ModelSerializer):
    """Serializes Account Data"""
    projects = ProjectSerializer(many=True, read_only=True)

    class Meta:
        model = Client
        fields = ['id', 'name', 'description', 'industry', 'ein', 'address_one', 'address_two', 'city', 'state', 'zip_code', 'account', 'projects']
        read_only_fields = ["id"]


class ClientDetailSerializer(ClientSerializer):
    """Serializes Account Detail Data"""
    projects = ProjectSerializer(many=True, read_only=True)
    # contacts = ContactSerializer(many=True, read_only=True)

    class Meta(ClientSerializer.Meta):
        fields = ClientSerializer.Meta.fields + ['projects']


class AccountSerializer(serializers.ModelSerializer):
    """Serializes Account Data"""
    users = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Account
        fields = ['id', 'name', 'type', 'users']
        read_only_fields = ["id"]


class AccountDetailSerializer(AccountSerializer):
    """Serializes Account Detail Data"""
    users = UserSerializer(many=True, read_only=True)
    clients = ClientSerializer(many=True, read_only=True)

    class Meta(AccountSerializer.Meta):
        fields = AccountSerializer.Meta.fields + ['clients', 'users']
