import requests
import json
from requests.auth import HTTPBasicAuth
from repos.models import Repositorio
from tags.models import Tag
from user.models import Usuario
from servicos.String import String
from django.db.models import Q

class Github:
    authenticated = False
    
    def request_user(login=None, *args, **kwargs):
        """Verifica se tem um usuário cadastrado no github com o login informado

        Args:
            login (str, optional): Login do usuário que esta fazendo o cadastro. Defaults to None.

        Returns:
            bool: valor booleano dizendo se tem um usuário ou não
        """
        user = requests.get("https://api.github.com/users/" + login)

        if user.status_code == 200:
            return True

        return False

    def request_login(function):
        """Verifica se o login é válido

        Args:
            function (wrapper): Utilizada como decorador de função
        """
        def wrapper(login, senha):
            log = requests.get("https://api.github.com/user", auth=HTTPBasicAuth(login, senha))

            if(log.status_code == 200):
                return function(login, senha)
            else:
                return False

        return wrapper
    
    @request_login
    def is_authenticated(login, senha):
        return True


    @request_login
    def get_user_repositorios(login, senha):
        """Pega os repositórios do usuário que esta fazendo o login

        Args:
            login (str): Login do usuário
            senha (str): Senha do usuário

        Returns:
            list: Lista de repositório do usuário que esta fazendo o cadastro
        """
        infos = []
        url = "https://api.github.com/user/repos"

        try:
            repositorios = requests.get(url, auth=HTTPBasicAuth(login, senha))
        except Exception as ex:
            repositorios = Usuario.objects.filter(login=login, senha=senha)

        for repositorio in json.loads(repositorios.text):
            tag = Github.get_tags(repositorio["id"], login)

            infos.append({
                "id" : repositorio["id"],
                "nome" : repositorio["name"],
                "descricao" : repositorio["description"],
                "url" : repositorio["html_url"],
                "tag" : tag,
            })

        return infos

    def get_infos(termo, login, senha, autenticado):
        """Busca no github os repositórios que o usuário fez a pesquisa

        Args:
            termo (str): Termo de busca requisitado pelo usuário
            login (str): Login do usuário
            senha (str): Senha do usuário
            autenticado (bool): Valor booleano demonstrando se o usuário esta autenticado pelo Github ou não

        Returns:
            list: Lista de repositórios que o usuário fez a pesquisa
        """
        values = []
        url = "https://api.github.com/search/repositories?q="+termo
        infos = None

        if autenticado:
            infos = requests.get(url, auth=HTTPBasicAuth(login, senha))
        else:
            infos = requests.get(url)

        infos = json.loads(infos.text)
        
        for info in infos["items"]:
            tag = Github.get_tags(info["id"], login)

            total_estrela = "https://api.github.com/repos/"+info["owner"]["login"]+"/"+info["name"]+"/stargazers"

            if len(total_estrela):
                values.append({
                    "id" : info["id"],
                    "nome" : info["name"],
                    "descricao" : info["description"],
                    "url" : info["html_url"],
                    "tag" : tag
                })
        
        return values


    def get_tags(id_repositorio, login):
        """Pega as tags do repositório de que o usuário separou

        Args:
            id_repositorio (id): ID do repositório para recuparar a tag
            login (str): Login do usuário que fez a requisição dos repositórios

        Returns:
            str: Tags no formato de string, separado por vírgula
        """

        tag = list(Tag.objects.filter(
                    Q(repositorio_id=id_repositorio) &
                    Q(usuario=login)
                ).values_list('nome', flat=True))

        if not tag:
            tag = ""
        else:
            tag = ','.join(tag)

        return tag
