"""
Views for Account API
"""

from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Account, Client
from account.serializers import AccountSerializer, AccountDetailSerializer
from client.serializers import ClientSerializer, ClientDetailSerializer

import pdb


class AccountViewSet(viewsets.ModelViewSet):
    """View for Manage Account APIs"""
    serializer_class = AccountDetailSerializer
    queryset = Account.objects.all()
    authentication_classes = [TokenAuthentication]
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

