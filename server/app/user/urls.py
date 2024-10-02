"""
URL MAPPINGS FOR THE USER API
"""

from django.urls import path
from user import views

app_name = 'user'

urlpatterns = [
    path('create/', views.CreateUserView.as_view(), name='create'),
    path('session/', views.CreateSessionView.as_view(), name='session'),
    path('me/', views.ManageUserView.as_view(), name='me'),
]
