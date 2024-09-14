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

app_name = 'account'

urlpatterns = [
    path('', include(router.urls)),
]
