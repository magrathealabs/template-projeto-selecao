from django.urls import path
from . import views
from .views import PescadorViewSet, EmbarcacaoViewSet, ViagemViewSet, LoginView
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r"pescador", PescadorViewSet)
router.register(r"embarcacao", EmbarcacaoViewSet)
router.register(r"viagem", ViagemViewSet)


urlpatterns = [
    path('cadastro/', views.cadastro, name="cadastro"),
    path('', views.ViagemViewSet.lista_barcos, name='lista_barcos'),
    path('cadastrar_viagem/', views.ViagemViewSet.cadastrar_viagem,
         name="cadastrar_viagem"),
    path('detalhe_viagem/<int:pk>', views.ViagemViewSet.detalhes_viagem,
         name="detalhes_viagem"),
    path('cadastrar_pescador/', views.PescadorViewSet.cadastrar_pescador,
         name="cadastrar_pescador"),
    path('detalhe_pescador/<int:pk>', views.PescadorViewSet.detalhes_pescador,
         name="detalhes_pescador"),
    path('cadastrar_embarcacao/', views.EmbarcacaoViewSet.cadastrar_embarcacao,
         name="cadastrar_embarcacao"),
    path('detalhe_embarcacao/<int:pk>', views.EmbarcacaoViewSet.detalhes_embarcacao,
         name="detalhes_embarcacao"),
    path('historico_viagens', views.ViagemViewSet.lista_viagens,
         name="lista_viagens"),
    path('busca_viagens/', views.ViagemViewSet.busca, name="busca"),
    path('login/', LoginView.as_view(), name='login'),
    ]
