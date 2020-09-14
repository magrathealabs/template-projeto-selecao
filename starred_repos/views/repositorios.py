from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from starred_repos.models import GitHubRepo, Tag
from starred_repos.forms import GitHubRepoForm
import requests

GITHUB_API_INICIO_URL = 'https://api.github.com/users/'
GITHUB_API_FINAL_URL = '/starred'

@login_required
def home(request):
    usuario = request.user
    repositorios_favoritos_do_usuario(usuario)
    repositorios = GitHubRepo.objects.filter(usuario=usuario)

    dados = {
        'repositorios' : repositorios
    }
    return render(request, 'home.html', dados)

@login_required
def repositorio(request, id):
    repositorio = get_object_or_404(GitHubRepo, pk=id)
    if request.method == 'POST':
        tags = request.POST['tags']
        tags = tags.split(',')
        for nome_tag in tags:
            if _tag_nao_esta_na_db(nome_tag):
                tag = Tag.objects.create(nome=nome_tag)
                tag.save()
                repositorio.tags.add(tag)
            else:
                tag = Tag.objects.filter(nome=nome_tag).get()
                repositorio.tags.add(tag)
            repositorio.save()
        return redirect('home')
    elif request.method == 'GET':
        form = GitHubRepoForm()
        
    dados = {
        'repositorio': repositorio,
        'form': form,
    }
    return render(request, 'repositorio.html', dados)

def repositorios_favoritos_do_usuario(usuario):
    github_username = usuario.username
    github_url = formata_url_api_github(github_username)
    resposta = requests.get(github_url)
    lista_de_repos = resposta.json()
    
    for repo in lista_de_repos:
        if _repo_nao_esta_na_db(repo):
            _salva_repo_na_db(repo, github_username)

def formata_url_api_github(username):
    """ Retorna url no formato <https://api.github.com/users/:username/starred>."""
    GITHUB_API_URL = GITHUB_API_INICIO_URL + username + GITHUB_API_FINAL_URL
    return GITHUB_API_URL

def _salva_repo_na_db(repo, github_username):
    usuario = User.objects.filter(username=github_username).get()
    nome = repo['name']
    repo_id = repo['id']
    descricao = repo['description']
    url = repo['html_url']
    repositorio = GitHubRepo.objects.create(usuario=usuario, repo_id=repo_id, descricao=descricao, url=url)
    repositorio.save()

def _tag_nao_esta_na_db(nome_da_tag):
    if Tag.objects.filter(nome=nome_da_tag).exists():
        return False
    return True

def _repo_nao_esta_na_db(repo):
    if GitHubRepo.objects.filter(descricao=repo['description']).exists():
        return False
    return True