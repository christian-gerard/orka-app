"""
Views for Project API
"""

from rest_framework import viewsets, status, permissions

from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import get_user_model

from core.models import Project, Task, Budget, Expense
from user.serializers import UserSerializer
from project.serializers import (
    ProjectDetailSerializer,
    ProjectSerializer,
    TaskSerializer,
    TaskDetailSerializer,
    BudgetSerializer,
    BudgetDetailSerializer,
    ExpenseDetailSerializer,
    ExpenseSerializer
)

import pdb

class ExpenseViewSet(viewsets.ModelViewSet):
    """View for Manage Client APIs"""
    serializer_class = ExpenseDetailSerializer
    queryset = Expense.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Retrieves Accounts for Authenticated User"""
        return self.queryset.all().filter(users=self.request.user).order_by('id')

    def get_serializer_class(self):
        """Return the serializer per request"""
        if self.action == 'list':
            return ExpenseSerializer
        return self.serializer_class


class BudgetViewSet(viewsets.ModelViewSet):
    """View for Manage Client APIs"""
    serializer_class = BudgetDetailSerializer
    queryset = Budget.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Retrieves Accounts for Authenticated User"""
        return self.queryset.all().order_by('id')

    def get_serializer_class(self):
        """Return the serializer per request"""
        if self.action == 'list':
            return BudgetSerializer
        return self.serializer_class


class TaskViewSet(viewsets.ModelViewSet):
    """View for Manage Client APIs"""
    serializer_class = TaskDetailSerializer
    queryset = Task.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Retrieves Accounts for Authenticated User"""
        return self.queryset.all().filter(users=self.request.user).order_by('id')

    def get_serializer_class(self):
        """Return the serializer per request"""
        if self.action == 'list':
            return TaskSerializer
        return self.serializer_class

    def perform_create(self, serializer):
        """Override the create method to add the authenticated user"""
        serializer.save(users=self.request.user)

    @action(detail=True, methods=['post'], url_path='update-users', url_name='update-users')
    def update_task_users(self, request, pk=None):
        """Add a user to a project"""
        task = self.get_object()
        users = request.data.get('user', [])
        res = []
        try:
            task.users.clear()
            for user_id in users:
                user = get_user_model().objects.get(id=user_id)
                user_data = UserSerializer(user).data
                res.append(user_data)
                task.users.add(user)
            return Response(res, status=status.HTTP_200_OK)
        except get_user_model().DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)


class ProjectViewSet(viewsets.ModelViewSet):
    """View for Manage PROJECT APIs"""
    serializer_class = ProjectDetailSerializer
    queryset = Project.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Retrieves Projects"""
        return self.queryset.all().order_by('id')

    def get_serializer_class(self):
        """Return the serializer per request"""
        if self.action == 'list':
            return ProjectSerializer
        return self.serializer_class

    # def perform_create(self, serializer):
    #     """Override the create method to add the authenticated user"""
    #     serializer.save(users=[self.request.user])

    @action(detail=True, methods=['post'], url_path='update-users', url_name='update-users')
    def update_users(self, request, pk=None):
        """Add a user to a project"""
        project = self.get_object()
        users = request.data.get('user', [])
        res = []
        try:
            project.users.clear()
            for user_id in users:
                user = get_user_model().objects.get(id=user_id)
                user_data = UserSerializer(user).data
                res.append(user_data)
                project.users.add(user)
            return Response(res, status=status.HTTP_200_OK)
        except get_user_model().DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

