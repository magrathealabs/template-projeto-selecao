from django.test import TestCase
from servicos.Busca import Busca
from servicos.Github import Github

class TestBusca(TestCase):
    def test_pegar_tags_sem_login(self):
        usuario = ""
        senha = ""
        query = "ocev"
        escolha = "Tag"

        qs = Busca.busca(query, escolha, usuario, senha, False)

        self.assertEquals(qs, [])

    def test_pegar_repositorio(self):
        usuario = ""
        senha = ""
        query = "ocev"
        escolha = "Repositorio"
        autenticado = False
        
        qs_busca = Busca.busca(query, escolha, usuario, senha, autenticado)
        qs_github = Github.get_infos(query, usuario, senha, autenticado)

        self.assertEquals(qs_busca, qs_github)
