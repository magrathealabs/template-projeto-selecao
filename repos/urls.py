from django.urls import path
from . import views

app_name = "repos"

urlpatterns = [
    path('list/', views.List.as_view(), name="list"),
    path('edit/', views.EditarTag.as_view(), name="edit"),
    path('tag/', views.SaveTag.as_view(), name="tag"),
]