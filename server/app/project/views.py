"""
Views for Project API
"""

from rest_framework import viewsets, status, permissions

from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model

from core.models import Project, Task, Budget, Expense, User
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
        return self.queryset.all().order_by('id')

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
        return self.queryset.all().order_by('id')

    def get_serializer_class(self):
        """Return the serializer per request"""
        if self.action == 'list':
            return TaskSerializer
        return self.serializer_class

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, id=self.kwargs['pk'])
        self.check_object_permissions(self.request, obj)
        return obj

    def create(self, request, *args, **kwargs):
        """Custom create method for POST requests"""
        try:
            user_ids = request.data.pop('users', None)
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            task = serializer.save()
            if user_ids:
                task.users.set(user_ids)
            response_serializer = self.get_serializer(task)
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, *args, **kwargs):
        """Custom PATCH request handling"""
        try:
            # Retrieve the object to update
            instance = self.get_object()
            user_ids = request.data.pop('users', None)
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            task = serializer.save()
            if user_ids:
                task.users.set(user_ids)
            response_serializer = self.get_serializer(task)
            return Response(response_serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            # Handle any errors
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


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

