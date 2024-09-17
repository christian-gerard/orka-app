"""
Views for Client API
"""
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Client
from client.serializers import ClientSerializer, ClientDetailSerializer

import pdb

class ClientViewSet(viewsets.ModelViewSet):
    """View for Manage Client APIs"""
    serializer_class = ClientDetailSerializer
    queryset = Client.objects.all()
    authentication_classes = [TokenAuthentication]
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
