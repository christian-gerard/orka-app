"""
Views for the user api
"""

from rest_framework import generics, authentication, permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from core.models import User
from user.serializers import (
    RefreshSerializer,
    AuthSerializer,
    UserSerializer,
    UserDetailSerializer,
    ProfileImageSerializer
)

class UserViewSet(viewsets.ModelViewSet):
    """Manager User Methods"""
    serializer_class = UserDetailSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Retrieves Accounts for Authenticated User"""
        return self.queryset.all().order_by('id')

    def get_serializer_class(self):
        """Return the serializer per request"""
        if self.action == 'list':
            return UserSerializer
        elif self.action == 'upload_image':
            return ProfileImageSerializer
        return self.serializer_class

    def get_object(self):
        return self.request.user
    
    

    @action(methods=['POST'], detail=True, url_path='upload-image')
    def upload_image(self, request, pk=None):
        """Upload an image to Client"""
        client = self.get_object()
        serializer = self.get_serializer(client, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ManageUserView(TokenRefreshView):
    """Manage the authenticated user"""
    serializer_class = RefreshSerializer

    def get_object(self):
        """Retrieve and Return Auth User"""
        return self.request.user

class LoginView(TokenObtainPairView):
    """Login the user"""
    serializer_class = AuthSerializer




