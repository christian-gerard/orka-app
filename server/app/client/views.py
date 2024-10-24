"""
Views for Account API
"""

from rest_framework import viewsets, mixins
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


    def get_queryset(self):
        """Retrieves Accounts for Authenticated User"""
        return self.queryset.all().order_by('id')

    def get_serializer_class(self):
        """Return the serializer per request"""
        if self.action == 'list':
            return ClientSerializer
        return self.serializer_class

    def perform_create(self, serializer):
        """Override the create method to add the authenticated user"""
        serializer.save()


class ContactViewSet(viewsets.ModelViewSet):
    """View for Manage Client APIs"""
    serializer_class = ContactDetailSerializer
    queryset = Contact.objects.all()

    def get_queryset(self):
        """Retrieves Accounts for Authenticated User"""
        return self.queryset.all().order_by('id')

    def get_serializer_class(self):
        """Return the serializer per request"""
        if self.action == 'list':
            return ContactSerializer
        return self.serializer_class

    def perform_create(self, serializer):
        """Override the create method to add the authenticated user"""
        serializer.save()
