"""
URL MAPPINGS FOR ACCOUNT MAP
"""

from django.urls import (
    path,
    include,
)

from rest_framework.routers import DefaultRouter

from account import views

router = DefaultRouter()
router.register('', views.AccountViewSet)
router.register('projects', views.ProjectViewSet)
router.register('clients', views.ClientViewSet)


app_name = 'account'

urlpatterns = [
    path('', include(router.urls)),
]
