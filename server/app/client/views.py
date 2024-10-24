"""
Views for Client API
"""

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from core.models import Client, Contact
from client.serializers import (
    ClientSerializer,
    ClientDetailSerializer,
    ContactSerializer,
    ContactDetailSerializer
)

class ClientViewSet(viewsets.ModelViewSet):
    """View for Manage Client APIs"""
    serializer_class = ClientDetailSerializer
    queryset = Client.objects.all()
    permission_classes = [IsAuthenticated]


    def get_queryset(self):
        """Retrieves Accounts for Authenticated User"""
        return self.queryset.all().filter(account=self.request.user.account).order_by('id')

    def get_serializer_class(self):
        """Return the serializer per request"""
        if self.action == 'list':
            return ClientSerializer
        return self.serializer_class



class ContactViewSet(viewsets.ModelViewSet):
    """View for Manage Client APIs"""
    serializer_class = ContactDetailSerializer
    queryset = Contact.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Retrieves Accounts for Authenticated User"""
        return self.queryset.all().order_by('id')

    def get_serializer_class(self):
        """Return the serializer per request"""
        if self.action == 'list':
            return ContactSerializer
        return self.serializer_class

