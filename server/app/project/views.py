"""
Views for Project API
"""

from rest_framework import viewsets

from core.models import Project
from project.serializers import ProjectDetailSerializer, ProjectSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    """View for Manage PROJECT APIs"""
    serializer_class = ProjectDetailSerializer
    queryset = Project.objects.all()

    def get_queryset(self):
        """Retrieves Projects"""
        return self.queryset.all().filter(users=self.request.user).order_by('id')

    def get_serializer_class(self):
        """Return the serializer per request"""
        if self.action == 'list':
            return ProjectSerializer
        return self.serializer_class

    def perform_create(self, serializer):
        """Override the create method to add the authenticated user"""
        serializer.save(users=[self.request.user])
