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
router.register('accounts', views.AccountViewSet)
router.register('clients', views.ClientViewSet)
router.register('projects', views.ProjectViewSet)


app_name = 'account'

urlpatterns = [
    path('', include(router.urls)),
]
