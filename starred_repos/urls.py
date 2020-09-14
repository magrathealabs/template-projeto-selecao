from django.shortcuts import render
from django.urls import path
from .views import *

urlpatterns = [
    path('', home, name='home'),
    path('repo/<int:id>/', repositorio, name='repositorio'),
    path('<int:id>', tag, name='tag'),
    path('buscar', buscar, name='buscar'),
    path('tag/<int:id>/', tagged, name='tagged'),
    path('editar_tag/<int:id>', editar_tag, name='editar_tag'),
    path('deletar_tag/<int:id>', deletar_tag, name='deletar_tag')
]