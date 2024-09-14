"""
Serializer for the client class
"""
from rest_framework import serializers

from core.models import Client

from project.serializers import ProjectSerializer


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
