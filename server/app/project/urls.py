"""
URL MAPPINGS FOR Project
"""

from django.urls import (
    path,
    include,
)

from rest_framework.routers import DefaultRouter

from project import views

router = DefaultRouter()
router.register('', views.ProjectViewSet)

app_name = 'project'

urlpatterns = [
    path('', include(router.urls)),
]