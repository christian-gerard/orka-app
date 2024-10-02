"""
Views for Account API
"""

from rest_framework import viewsets, mixins
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Account, Client, Project
from account.serializers import (
    AccountSerializer,
    AccountDetailSerializer,
    ClientSerializer,
    ClientDetailSerializer,
    ProjectSerializer,
    ProjectDetailSerializer
)


class ProjectViewSet(viewsets.ModelViewSet):
    """View for Manage Client APIs"""
    serializer_class = ProjectDetailSerializer
    queryset = Project.objects.all()
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Retrieves Accounts for Authenticated User"""
        return self.queryset.all().order_by('id')

    def get_serializer_class(self):
        """Return the serializer per request"""
        if self.action == 'list':
            return ProjectSerializer
        return self.serializer_class

class ClientViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    """View for Manage Client APIs"""
    serializer_class = ClientDetailSerializer
    queryset = Client.objects.all()
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Retrieves Accounts for Authenticated User"""
        account_ids = [account.id for account in self.request.user.accounts.all()]
        return self.queryset.all().filter(account_id__in=account_ids).order_by('id')

    def get_serializer_class(self):
        """Return the serializer per request"""
        if self.action == 'list':
            return ClientSerializer
        return self.serializer_class


class AccountViewSet(viewsets.ModelViewSet):
    """View for Manage Account APIs"""
    serializer_class = AccountDetailSerializer
    queryset = Account.objects.all()
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Retrieves Accounts for Authenticated User"""
        return self.queryset.filter(users=self.request.user).order_by('id')

    def get_serializer_class(self):
        """Return the serializer per request"""
        if self.action == 'list':
            return AccountSerializer
        return self.serializer_class

    def perform_create(self, serializer):
        """Create a new recipe"""
        serializer.save(users=[self.request.user])




