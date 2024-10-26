"""
URL MAPPINGS FOR THE USER API
"""

from django.urls import path, include
from user import views

from rest_framework.routers import DefaultRouter

from user import views

router = DefaultRouter()
router.register('', views.UserViewSet)

app_name = 'user'

urlpatterns = [
    path('login/', views.LoginView.as_view(), name='login'),
    path('refresh/', views.ManageUserView.as_view(), name='me'),
    path('', include(router.urls))
]
