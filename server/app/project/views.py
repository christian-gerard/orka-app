"""
View for Projects
"""
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Project
from project.serializers import ProjectSerializer, ProjectDetailSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    """View for Manage Client APIs"""
    serializer_class = ProjectDetailSerializer
    queryset = Project.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Retrieves Accounts for Authenticated User"""
        return self.queryset.all().order_by('id')

    def get_serializer_class(self):
        """Return the serializer per request"""
        if self.action == 'list':
            return ProjectSerializer
        return self.serializer_class
