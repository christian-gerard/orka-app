"""
Serializers for the Account API
"""
from rest_framework import serializers
from client.serializers import ClientSerializer

from core.models import Task, Expense, Project, Budget, Expense


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

    class Meta:
        model = Task
        fields = ['id', 'deadline', 'description', 'category', 'status', 'project']
        read_only_fields = ["id"]


class TaskDetailSerializer(TaskSerializer):
    """Serializes Account Detail Data"""
    # users = UserSerializer(many=True, read_only=True)

    class Meta(TaskSerializer.Meta):
        fields = TaskSerializer.Meta.fields


class ProjectSerializer(serializers.ModelSerializer):
    """Serializes Account Data"""
    client = ClientSerializer(read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'name', 'deadline', 'description', 'project_budget', 'project_type', 'client']
        read_only_fields = ["id"]



class ProjectDetailSerializer(ProjectSerializer):
    """Serializes Account Detail Data"""

    tasks = TaskSerializer(many=True, read_only=True)

    def __init__(self, *args, **kwargs):
        # Import UserSerializer lazily to avoid circular import
        from user.serializers import UserSerializer
        self.fields['users'] = UserSerializer(many=True, read_only=True)
        super().__init__(*args, **kwargs)


    class Meta(ProjectSerializer.Meta):
        fields = ProjectSerializer.Meta.fields + ['users', 'tasks']
        read_only_fields = ["users", "tasks"]