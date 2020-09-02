import json
import re

from servicos.String import String
from django.db.models import Q
from django.shortcuts import render, redirect
from django.views import View
from django.views.generic.list import ListView
from tags.models import Tag
from servicos.Error import (
    page_error,
    exceptionHandler,
    ValidationError
)

from servicos.Pagination import Pagination
from servicos.Busca import Busca
from django.core.cache import cache

from user.models import Usuario
from .models import Repositorio

class List(ListView):
    """Lista os repositórios ou as tags com base na escolha da pesquisa

    Args:
        ListView (ListView): Herança da ListView do django

    Returns:
        render: Redireciona para a página de lista.
    """
    template_name = 'repos/list.html'
    query = None
    escolha = None
    qs = None
    queryset = ""

    @exceptionHandler
    def get(self, *args, **kwargs):
        infos = {
                'username' : "",
                'senha' : "",
                'autenticacao' : False,
                "autenticacao_GH" : False,
            }
        
        contexto = self.request.COOKIES.get('context') or None

        if contexto:
            infos = String.string_to_json(contexto)

        if not (self.query == self.request.GET.get("termo")):
            self.query = self.request.GET.get("termo")

        if not (self.escolha == self.request.GET.get("opcao")):
            self.escolha = self.request.GET.get("opcao")

        self.queryset = "&termo="+self.query+"&opcao=" + self.escolha
        
        if not self.request.GET.get('page'):
            if self.query:
                self.qs = Busca.busca(self.query, self.escolha, infos['username'], infos['senha'], infos["autenticacao_GH"])
                cache.set("opcao", self.qs, 60*5)
        else:   
            self.qs = cache.get("opcao")

        page = Pagination.paginacao(self.qs, self.request.GET.get('page'))

        return render(self.request, 'repos/list.html', {"infos" : infos, "page" : page, "url" : self.queryset})


class EditarTag(View):
    """Pega as informações do repositório e reencaminha para a página de editar tag,
        podendo assim editar, remover ou adicionar tags

    Args:
        View (View): Herança da View do django

    Raises:
        ValidationError: Retornar erro se o usuário fez um get na página

    Returns:
        render: Encaminha para a página tags
    """

    infos = {
                'username' : "",
                'senha' : "",
                'autenticacao' : False,
                "autenticacao_GH" : False,
            }

    @exceptionHandler
    def post(self, *args, **kwargs):
        repositorio_tag_post = self.request.POST.get('infos').split(' }-{ ')
        repositorio = ""
        
        repositorio = String.string_to_json(repositorio_tag_post[0])
        self.infos = String.string_to_json(repositorio_tag_post[1])

        return render(self.request, "parciais/tags.html", {"infos" : self.infos, "repositorio" : repositorio})

    @exceptionHandler
    def get(self, *args, **kwargs):
        if self.request.COOKIES.get('context'):
            context_cookie = self.request.COOKIES.get('context')
            self.infos = String.string_to_json(context_cookie)

        raise ValidationError(self.request, 405, self.infos)

class SaveTag(View):
    """Salva as tags adicionadas/removidas/editadas que um usuário fez ao repositório

    Args:
        View (View): Herança da View do django

    Raises:
        ValidationError: Tamanho máximo de caracteres ser maior que 100
        ValidationError: Banco de dados não encontrou e não criou o repositório
        ValidationError: Banco de dados não encontrou e não criou a tag

    Returns:
        redirect: Página perfil do usuário
    """

    template_name = 'template/tags.html'

    @exceptionHandler
    def post(self, *args, **kwargs):
        contexto = String.string_to_json(self.request.COOKIES.get("context"))

        repositorio = String.string_to_json(self.request.POST.get("infos"))

        tags = ','.join(self.request.POST.getlist("tags_repo"))
        tags = list(set(tags.split(",")))
        tags = [i.strip() for i in tags]
        tags = ','.join(filter(None, tags))

        if len(tags) > 255:
            raise ValidationError(self.request, 400, contexto)

        obj, created = Repositorio.objects.get_or_create(
            id=repositorio["id"],
            defaults={
                "nome" : repositorio["nome"], 
                "descricao" : repositorio["descricao"], 
                "url" : repositorio["url"]
            }
        )
        
        if not (obj or created):
            raise ValidationError(self.request, 400, contexto)

        obj_tag, created_tag = Tag.objects.get_or_create(
                            repositorio_id=repositorio["id"],
                            usuario=contexto["username"],
                            defaults={
                                "nome" : tags
                            }
                        )
        
        if not (obj_tag or created_tag):
            raise ValidationError(self.request, 400, contexto)

        if not created_tag:
            obj_tag.nome = tags
            obj_tag.save()
            
        return redirect('user:perfil')

    @exceptionHandler
    def get(self, *args, **kwargs):
        return self.renderizar
