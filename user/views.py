import json
from . import forms

from servicos.Error import (
    exceptionHandler,
    ValidationError
)

from django.shortcuts import render, redirect
from django.views.generic.list import ListView
from django.contrib import messages
from django.views import View
from servicos.Github import Github
from servicos.Pagination import Pagination

from .models import Usuario
from servicos.String import String

class Home(View):
    """Página inicial do sistema, se estiver logado, redireciona para perfil
            se não, redireciona para criar

    Args:
        View (View): Herança da View do Django
    """

    def get(self, *args, **kwargs):
        if self.request.COOKIES.get('context'):
            return redirect('user:perfil')
        
        return redirect('user:criar')

class BasePerfil(View):
    """Faz a validação do formulário, invalidando os campos que não satisfazem as restrições

    Args:
        View (View): Herança da View do Django

    Raises:
        ValidationError: Retorna erro se o usuário estiver logado e tenta acessar a página inicial

    Returns:
        renderizar: Retorna para a View Criar a validação do formulário
    """
    
    template_name = 'user/criar.html'

    @exceptionHandler
    def setup(self, *args, **kwargs):
        super().setup(*args, **kwargs)

        self.contexto = {
                'userform': forms.UsuarioForm(
                    data=self.request.POST or None
                )
            }

        self.userform = self.contexto['userform']
        
        self.renderizar = render(self.request, self.template_name, self.contexto)
    
    @exceptionHandler
    def get(self, *args, **kwargs):
        if self.request.COOKIES.get('context'):
            context_cookie = self.request.COOKIES.get('context')
            user = String.string_to_json(context_cookie)
            raise ValidationError(self.request, 401, user)
        return self.renderizar


class Criar(BasePerfil):
    """Página de criar usuário

    Args:
        BasePerfil (BasePerfil): Herda BasePerfil, onde faz a validação dos formulários

    Returns:
        renderizar: Renderiza para a página inicial, fornecendo o acesso de login no sistema.
    """


    @exceptionHandler
    def post(self, *args, **kwargs):
        
        if not self.userform.is_valid():
            messages.error(
                self.request,
                "Existem erros no formulário de cadastro. Verifique todos os campos"
            )
            return self.renderizar

        usuario = self.userform.cleaned_data.get('login')
        senha = self.userform.cleaned_data.get('senha')
        email = self.userform.cleaned_data.get('email')

        user = Usuario()
        user.login = usuario
        user.senha = senha
        user.email = email

        messages.success(
            self.request,
            'Seu cadastro foi criado com sucesso.'
        )

        user.save()

        return redirect('user:criar')
        return self.renderizar

class Login(View):
    """Login no sistema

    Args:
        View (View): Herança da View do Django

    Raises:
        ValidationError: Retorna erro se o usuário der GET na url login

    Returns:
        response: Encaminha para a página perfil se estiver correto as credenciais,
                    se não, pede login e senha de novo 
    """

    template_name = 'user/criar.html'

    @exceptionHandler
    def get(self, *args, **kwargs):
        if self.request.COOKIES.get('context'):
            return redirect('user:perfil')

        infos = {
            "username" : "", 
            "senha" : "", 
            "autenticacao" : False, 
            "autenticacao_GH" : False,
        }

        raise ValidationError(self.request, 401, infos)

    @exceptionHandler
    def post(self, *args, **kwargs):
        username = self.request.POST.get('login')
        senha = self.request.POST.get('senha')

        autenticacao = Github.is_authenticated(login=username, senha=senha)
        autenticacao_git = autenticacao

        if not username or not senha:
            messages.error(
                self.request,
                "Usuário ou senha incorretos"
            )
            return self.renderizar

        if not autenticacao:
            user = Usuario.objects.filter(login=username, senha=senha)
            if not user:
                messages.error(
                    self.request,
                    "Usuário ou senha incorretos"
                )
                return redirect('user:criar')

            autenticacao = True

        else:
            obj, created = Usuario.objects.get_or_create(
                login=username,
                defaults={
                    "senha" : senha
                }
            )

        infos = json.dumps({
            "username" : username, 
            "senha" : senha, 
            "autenticacao" : autenticacao, 
            "autenticacao_GH" : autenticacao_git,
        })

        self.request.session['context'] = infos

        response = redirect('user:perfil')
        response.set_cookie('context', self.request.session['context'])
        return response
        

class Logout(View):
    """Logout no sistema

    Args:
        View (View): Herança da View do Django

    Raises:
        ValidationError: Retorna erro se o usuário der um GET na página se não estiver logado

    Returns:
        redirect: Retorna para a página inicial (criação)
    """

    infos = {
        "username" : "", 
        "senha" : "", 
        "autenticacao" : False, 
        "autenticacao_GH" : False,
    }

    @exceptionHandler
    def get(self, *args, **kwargs):
        if not self.request.COOKIES.get('context') or not self.request.session.get('context'):
            raise ValidationError(self.request, 403, self.infos)

        response = redirect('user:criar')

        response.delete_cookie('context')
        self.request.COOKIES.popitem()
        self.request.session.pop('context')
        return response



class Perfil(ListView):
    """Perfil do usuário que contém os repositórios do GitHub

    Args:
        ListView (ListView): Herança da ListView do Django

    Raises:
        ValidationError: Retorna erro se o usuário não logado der um GET na página

    Returns:
        paginacao: Retorna o total de repositórios paginados
    """


    template_name = "user/perfil.html"
    infos = {
        "username" : "", 
        "senha" : "", 
        "autenticacao" : False, 
        "autenticacao_GH" : False,
    }

    @exceptionHandler
    def get(self, *args, **kwargs):

        if not self.request.session.get('context'):
            raise ValidationError(self.request, 401, self.infos)
    
        if not self.request.COOKIES.get('context'):
            self.request.COOKIES['context'] = self.request.session['context']
        context_cookie = self.request.COOKIES.get('context')
        self.infos = String.string_to_json(context_cookie)        

        query = Github.get_user_repositorios(login=self.infos["username"], senha=self.infos["senha"])

        page = Pagination.paginacao(query, self.request.GET.get('page'))

        return render(self.request, 'user/perfil.html', {"infos" : self.infos, "page" : page})