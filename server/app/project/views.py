"""
Views for Account API
"""

from rest_framework import viewsets, mixins
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from core.models import Task, Expense
from project.serializers import (
    TaskSerializer,
    TaskDetailSerializer,
    ExpenseSerializer,
    ExpenseDetailSerializer
)


class TaskViewSet(viewsets.ModelViewSet):
    """View for Manage Client APIs"""
    serializer_class = TaskDetailSerializer
    queryset = Task.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

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

class ExpenseViewSet(viewsets.ModelViewSet):
    """View for Manage Client APIs"""
    serializer_class = ExpenseDetailSerializer
    queryset = Expense.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Retrieves Accounts for Authenticated User"""
        return self.queryset.all().filter(users=self.request.user).order_by('id')

    def get_serializer_class(self):
        """Return the serializer per request"""
        if self.action == 'list':
            return ExpenseSerializer
        return self.serializer_class

    def perform_create(self, serializer):
        """Override the create method to add the authenticated user"""
        serializer.save(users=self.request.user)
