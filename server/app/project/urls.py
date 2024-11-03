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
router.register('projects', views.ProjectViewSet)
router.register('tasks', views.TaskViewSet)
router.register('budgets', views.BudgetViewSet)
router.register('expenses', views.BudgetViewSet)
router.register('messages', views.MessageViewSet)

app_name = 'project'

urlpatterns = [
    path('', include(router.urls))
]
