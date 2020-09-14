from django.db.models import Q
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from starred_repos.models import GitHubRepo, Tag
from starred_repos.forms import GitHubRepoForm


@login_required
def tagged(request, id):
    tag = get_object_or_404(Tag, pk=id)
    repositorios = GitHubRepo.objects.filter(tags=tag).all()

    dados = {
        'tag': tag,
        'repositorios': repositorios
    }
    return render(request, 'tag.html', dados)

@login_required
def deletar_tag(request, id):
    tag = get_object_or_404(Tag, pk=id)
    tag.delete()
    return redirect('home')

@login_required
def editar_tag(request, id):
    if request.method == 'POST':
        tag = get_object_or_404(Tag, pk=id)
        novo_nome = request.POST['tags']
        tag.editar_tag(novo_nome)
        tag.save()
        return redirect('home')
    return render(request, 'editar_tag.html')

@login_required
def buscar(request):
    lista_tags = Tag.objects.all()

    if 'buscar' in request.GET:
        nome_a_buscar = request.GET['buscar']
        lista_tags = Tag.objects.filter(Q(nome__startswith=nome_a_buscar))
        
    dados = {
        'tags': lista_tags
    }
    return render(request, 'buscar.html', dados)

@login_required
def tag(request, id):
    tag = get_object_or_404(Tag, pk=id)
    
    tag_a_exibir = {
        'tag': tag
    }
    return render(request, 'tag.html', tag_a_exibir)
