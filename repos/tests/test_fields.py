from django.test import TestCase
from repos.models import Repositorio

class TestFields(TestCase):
    def test_fields_model_repos(self):
        repositorio = Repositorio()
        repositorio.nome = "Teste"
        repositorio.id = 1
        repositorio.descricao = "descricao"
        repositorio.save()

        queryset = Repositorio.objects.get(pk=1)

        self.assertEquals(queryset, repositorio)

