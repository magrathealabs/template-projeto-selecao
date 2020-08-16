from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from django.utils import timezone
from django.shortcuts import redirect,  get_object_or_404
from django.contrib.auth import login
from .filters import ViagemFilter
from .models import Pescador, Embarcacao, Viagem
from .serializers import (PescadorSerializer, EmbarcacaoSerializer,
                          ViagemSerializer)
from .forms import ViagemForm, PescadorForm, CriarNovoUsuarioForm, EmbarcacaoForm, LoginForm
from django.contrib.auth import views as views_auth


class LoginView(views_auth.LoginView):
    form_class = LoginForm
    redirect_authenticated_user = True

    def get_success_url(self):
        # write your logic here
        if self.request.user.is_superuser:
            return '/admin'
        return '/index'


@api_view(['GET', 'POST'])
def cadastro(request):
    if request.method == "GET":
        return render(request, "quem_foi_para_mar_core/cadastro.html",
                      {"form": CriarNovoUsuarioForm})
    elif request.method == "POST":
        form = CriarNovoUsuarioForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return render(request, "quem_foi_para_mar_core/index.html", {})


class PescadorViewSet(viewsets.ModelViewSet):
    queryset = Pescador.objects.all()
    serializer_class = PescadorSerializer

    @api_view(['GET', 'POST'])
    def cadastrar_pescador(request):
        if request.method == "POST":
            form = PescadorForm(request.POST)
            if form.is_valid():
                post = form.save(commit=False)
                post.save()
                return redirect('detalhes_pescador', pk=post.pk)
        else:
            form = PescadorForm()
            return render(request,
                          'quem_foi_para_mar_core/cadastrar_pescador.html',
                          {'form': form})

    @api_view(['GET'])
    def detalhes_pescador(request, pk):
        post = get_object_or_404(Viagem, pk=pk)
        return render(request, 'quem_foi_para_mar_core/detalhe_viagem.html',
                      {'post': post})


class EmbarcacaoViewSet(viewsets.ModelViewSet):
    queryset = Embarcacao.objects.all()
    serializer_class = EmbarcacaoSerializer

    @api_view(['GET', 'POST'])
    def cadastrar_embarcacao(request):
        if request.method == "POST":
            form = EmbarcacaoForm(request.POST)
            if form.is_valid():
                post = form.save(commit=False)
                post.save()
                return redirect('detalhes_viagem', pk=post.pk)
        else:
            form = EmbarcacaoForm()
        return render(request,
                      'quem_foi_para_mar_core/cadastrar_embarcacao.html',
                      {'form': form})

    @api_view(['GET'])
    def detalhes_embarcacao(request, pk):
        post = get_object_or_404(Embarcacao, pk=pk)
        return render(request,
                      'quem_foi_para_mar_core/detalhe_embarcacao.html',
                      {'post': post})


class ViagemViewSet(viewsets.ModelViewSet):
    queryset = Viagem.objects.all()
    serializer_class = ViagemSerializer

    @api_view(['GET', 'POST'])
    def cadastrar_viagem(request):
        if request.method == "POST":
            form = ViagemForm(request.POST)
            if form.is_valid():
                post = form.save(commit=False)
                post.save()
                return redirect('detalhes_viagem', pk=post.pk)
        else:
            form = ViagemForm()
        return render(request, 'quem_foi_para_mar_core/cadastrar_viagem.html',
                      {'form': form})

    @api_view(['GET'])
    def detalhes_viagem(request, pk):
        post = get_object_or_404(Viagem, pk=pk)
        return render(request, 'quem_foi_para_mar_core/detalhe_viagem.html',
                      {'post': post})

    @api_view(['GET'])
    def lista_barcos(request):
        barcos_no_mar_hoje = Viagem.objects.filter(data_partida=timezone.now()).order_by('data_partida')
        return render(request, 'quem_foi_para_mar_core/index.html',
                      {'barcos_no_mar_hoje': barcos_no_mar_hoje})

    @api_view(['GET'])
    def lista_viagens(request):
        todas_viagens = Viagem.objects.all()
        return render(request, 'quem_foi_para_mar_core/historico_viagens.html',
                      {'todas_viagens': todas_viagens})

    @api_view(['GET'])
    def busca(request):
        busca_todas_viagens = Viagem.objects.all()
        filtro_viagens = ViagemFilter(request.GET, queryset=busca_todas_viagens)
        return render(request, 'quem_foi_para_mar_core/busca_viagens.html',
                      {'filter': filtro_viagens})
