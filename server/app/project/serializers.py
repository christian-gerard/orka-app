"""
Serializers for the Account API
"""
from rest_framework import serializers
from user.serializers import UserSerializer
from client.serializers import ClientSerializer

from core.models import Task, Expense, Project, Budget, Expense, Client, User, Message

import pdb


class ExpenseSerializer(serializers.ModelSerializer):
    """Serializes Account Data"""

    class Meta:
        model = Expense
        fields = ['amount']
        read_only_fields = ["id"]


class ExpenseDetailSerializer(ExpenseSerializer):
    """Serializes Account Detail Data"""
    # users = UserSerializer(many=True, read_only=True)

    class Meta(ExpenseSerializer.Meta):
        fields = ExpenseSerializer.Meta.fields

class MessageSerializer(serializers.ModelSerializer):
    """Serializes Message Data"""

    class Meta:
        model = Message
        fields = ['message', 'time_sent', 'user']



class BudgetSerializer(serializers.ModelSerializer):
    """Serializes Account Data"""

    class Meta:
        model = Budget
        fields = ['budget_name', 'amount', 'category', 'project']
        read_only_fields = ["id"]


class BudgetDetailSerializer(BudgetSerializer):
    """Serializes Account Detail Data"""
    # users = UserSerializer(many=True, read_only=True)

    class Meta(BudgetSerializer.Meta):
        fields = BudgetSerializer.Meta.fields


class TaskSerializer(serializers.ModelSerializer):
    """Serializes Account Data"""
    def __init__(self, *args, **kwargs):
        # Import UserSerializer lazily to avoid circular import
        from user.serializers import UserSerializer
        self.fields['users'] = UserSerializer(many=True, read_only=True)
        super().__init__(*args, **kwargs)

    class Meta:
        model = Task
        fields = ['id', 'deadline', 'description', 'note', 'category', 'status', 'project', 'users']
        read_only_fields = ["id"]




class TaskDetailSerializer(TaskSerializer):
    """Serializes Account Detail Data"""



    class Meta(TaskSerializer.Meta):
        fields = TaskSerializer.Meta.fields



class ProjectSerializer(serializers.ModelSerializer):
    """Serializes Account Data"""

    client_id = serializers.PrimaryKeyRelatedField(
        queryset=Client.objects.all(),
        source='client',
        write_only=True
    )


    class Meta:
        model = Project
        fields = ['id', 'name', 'deadline', 'description', 'project_budget', 'project_type', 'client_id']
        read_only_fields = ["id"]



class ProjectDetailSerializer(ProjectSerializer):
    """Serializes Account Detail Data"""

    # tasks = TaskSerializer(many=True, read_only=True)
    client = ClientSerializer(read_only=True)

    def __init__(self, *args, **kwargs):
        # Import UserSerializer lazily to avoid circular import
        from user.serializers import UserSerializer
        self.fields['users'] = UserSerializer(many=True, read_only=True)
        super().__init__(*args, **kwargs)


    class Meta(ProjectSerializer.Meta):
        fields = ProjectSerializer.Meta.fields + ['client']
        read_only_fields = ["users", "tasks"]