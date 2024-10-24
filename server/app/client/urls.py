"""
URL MAPPINGS FOR THE CLIENT API
"""

from django.urls import path, include
from client import views

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', views.ClientViewSet)

app_name = 'client'

urlpatterns = [
    path('', include(router.urls))
]
