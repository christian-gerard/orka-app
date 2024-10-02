"""
Serializers for the Account API
"""
from rest_framework import serializers

from core.models import Account, Project, Client
from user.serializers import UserSerializer



class ProjectSerializer(serializers.ModelSerializer):
    """Serializes Account Data"""

    class Meta:
        model = Project
        fields = ['id', 'name', 'deadline', 'description', 'project_type', 'budget']
        read_only_fields = ["id"]


class ProjectDetailSerializer(ProjectSerializer):
    """Serializes Account Detail Data"""

    class Meta(ProjectSerializer.Meta):
        fields = ProjectSerializer.Meta.fields

class ClientSerializer(serializers.ModelSerializer):
    """Serializes Account Data"""
    projects = ProjectSerializer(many=True, read_only=True)

    class Meta:
        model = Client
        fields = ['id', 'name', 'projects']
        read_only_fields = ["id"]


class ClientDetailSerializer(ClientSerializer):
    """Serializes Account Detail Data"""

    class Meta(ClientSerializer.Meta):
        fields = ClientSerializer.Meta.fields + ['projects']

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
