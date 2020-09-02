from servicos.Github import Github
from repos.models import Repositorio
from tags.models import Tag

class Busca():

    def busca(query, escolha, login, senha, autenticado):
        """Faz a busca no banco de dados do Github ou local,
            dependendo da opção selecionada na caixa de pesquisa

        Args:
            request (dict): Request
            login (str): Login do usuário
            senha (str): Senha do usuário
            autenticado (bool): Status de autenticação do usuário

        Returns:
            list: Repositórios do Github e 
                    Tag dos repositórios buscados no banco local
        """

        result = []
        
        query = query.strip()
        
        if  escolha == "Repositorio":
            result = Github.get_infos(query, login, senha, autenticado)

        elif escolha == "Tag" and not (login == "" or senha == ""):
            result = Busca.search_query(login)

        return result

    def search_tag(query, login):
        """Busca os repositórios com base na query solicitada e o login do usuário

        Args:
            query (str): Query solicitada na busca
            login (str): Login do usuário

        Returns:
            values: List de dict com os repositórios que possuem a tag da query
        """

        result_query = list(Tag.objects.filter(
                                nome__icontains=query, 
                                usuario=login
                                ).values('repositorio')
                            )
        values = {}
        
        if result_query:
            for qs in result_query:

                repositorio = list(Repositorio.objects.filter(id=qs["repositorio"]).values('id', 'nome', 'descricao', 'url'))
                repositorio = repositorio[0]
                tag = Github.get_tags(repositorio["id"], login)

                values.append({
                    "id" : repositorio["id"],
                    "nome" : repositorio["nome"],
                    "descricao" : repositorio["descricao"],
                    "url" : repositorio["url"],
                    "tag" : tag,
                })

        return values