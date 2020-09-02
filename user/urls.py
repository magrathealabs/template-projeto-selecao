from django.urls import path
from . import views

app_name = "user"

urlpatterns = [
    path('', views.Home.as_view(), name='home'),
    path('criar/', views.Criar.as_view(), name="criar"),
    path('perfil/', views.Perfil.as_view(), name="perfil"),
    path('login/', views.Login.as_view(), name="login"),
    path('logout/', views.Logout.as_view(), name="logout"),
]

