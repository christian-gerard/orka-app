"""
Serializer for Projects
"""
from rest_framework import serializers

from core.models import Project


class ProjectSerializer(serializers.ModelSerializer):
    """Serializes Account Data"""

    class Meta:
        model = Project
        fields = ['id', 'name', 'deadline', 'description', 'project_type']
        read_only_fields = ["id"]


class ProjectDetailSerializer(ProjectSerializer):
    """Serializes Account Detail Data"""

    class Meta(ProjectSerializer.Meta):
        fields = ProjectSerializer.Meta.fields
