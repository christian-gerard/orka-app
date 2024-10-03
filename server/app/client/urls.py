"""
URL MAPPINGS FOR ACCOUNT MAP
"""

from django.urls import (
    path,
    include,
)

from rest_framework.routers import DefaultRouter

from project import views

router = DefaultRouter()
router.register('contacts', views.TaskViewSet)


app_name = 'client'

urlpatterns = [
    path('', include(router.urls)),
]
