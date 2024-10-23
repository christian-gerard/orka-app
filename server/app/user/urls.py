"""
URL MAPPINGS FOR THE USER API
"""

from django.urls import path
from user import views

app_name = 'user'

urlpatterns = [
    path('login/', views.LoginView.as_view(), name='login'),
    path('me/', views.ManageUserView.as_view(), name='me')
]
