"""
Views for the user api
"""

from rest_framework import generics, authentication, permissions, status, viewsets
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from core.models import User
from user.serializers import (
    RefreshSerializer,
    AuthSerializer,
    UserSerializer,
    UserDetailSerializer
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
        return self.serializer_class

    def get_object(self):
        return self.request.user

class ManageUserView(TokenRefreshView):
    """Manage the authenticated user"""
    serializer_class = RefreshSerializer

    def get_object(self):
        """Retrieve and Return Auth User"""
        return self.request.user

class LoginView(TokenObtainPairView):
    """Login the user"""
    serializer_class = AuthSerializer




