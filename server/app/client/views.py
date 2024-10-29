"""
Views for Client API
"""

from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from core.models import Client, Contact
from client.serializers import (
    ClientSerializer,
    ClientDetailSerializer,
    ClientImageSerializer,
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
        elif self.action == 'upload_image':
            return ClientImageSerializer
        return self.serializer_class

    @action(methods=['POST'], detail=True, url_path='upload-image')
    def upload_image(self, request, pk=None):
        """Upload an image to Client"""
        client = self.get_object()
        serializer = self.get_serializer(client, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




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

