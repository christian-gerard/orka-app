"""
Serializers for the Account API
"""
from rest_framework import serializers

from core.models import Task, Expense
from user.serializers import UserSerializer


class TaskSerializer(serializers.ModelSerializer):
    """Serializes Account Data"""

    class Meta:
        model = Task
        fields = ['id', 'deadline', 'description', 'category', 'status', 'project']
        read_only_fields = ["id"]


class TaskDetailSerializer(TaskSerializer):
    """Serializes Account Detail Data"""
    users = UserSerializer(many=True, read_only=True)

    class Meta(TaskSerializer.Meta):
        fields = TaskSerializer.Meta.fields + ['users']


class ExpenseSerializer(serializers.ModelSerializer):
    """Serializes Account Data"""

    class Meta:
        model = Expense
        fields = ['id', 'date', 'description', 'amount', 'category', 'status', 'project']
        read_only_fields = ["id"]


class ExpenseDetailSerializer(ExpenseSerializer):
    """Serializes Account Detail Data"""

    class Meta(TaskSerializer.Meta):
        fields = TaskSerializer.Meta.fields
