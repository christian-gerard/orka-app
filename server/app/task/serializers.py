"""
Serializers for the Account API
"""
from rest_framework import serializers

from core.models import Task


class TaskSerializer(serializers.ModelSerializer):
    """Serializes Account Data"""

    class Meta:
        model = Task
        fields = ['id', 'deadline', 'description', 'category', 'status', 'project']
        read_only_fields = ["id"]


class TaskDetailSerializer(TaskSerializer):
    """Serializes Account Detail Data"""
    # users = UserSerializer(many=True, read_only=True)

    class Meta(TaskSerializer.Meta):
        fields = TaskSerializer.Meta.fields