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
router.register('tasks', views.TaskViewSet)
router.register('expenses', views.ExpenseViewSet)

app_name = 'project'

urlpatterns = [
    path('', include(router.urls)),
]
