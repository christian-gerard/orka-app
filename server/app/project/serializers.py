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
    user_name = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ['message', 'time_sent', 'user', 'task', 'user_name']

    def get_user_name(self,obj):
        """Retrieve and Return User Name"""
        return f"{obj.user.first_name} {obj.user.last_name}" if obj.user else None


class MessageDetailSerializer(MessageSerializer):
    """Serializes Message Data"""

    class Meta(MessageSerializer.Meta):
        fields = MessageSerializer.Meta.fields



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
    messages = MessageSerializer(many=True, read_only=True)
    project_name = serializers.SerializerMethodField()
    client_name = serializers.SerializerMethodField()

    def __init__(self, *args, **kwargs):
        # Import UserSerializer lazily to avoid circular import
        from user.serializers import UserSerializer
        self.fields['users'] = UserSerializer(many=True, read_only=True)
        super().__init__(*args, **kwargs)

    class Meta:
        model = Task
        fields = ['id', 'deadline', 'description', 'note', 'category', 'status', 'project', 'project_name', 'client_name', 'users', 'messages']
        read_only_fields = ["id"]

    def get_project_name(self, obj):
        """Retrieve the name of the project associated with the task"""
        # Ensure project exists before trying to access its name
        return obj.project.name if obj.project else None

    def get_client_name(self,obj):
        """Retrieve the name of the client"""
        return obj.project.client.name if obj.project else None





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