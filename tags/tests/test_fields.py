from django.test import TestCase
from tags.models import Tag
from repos.models import Repositorio

class TestFieldsTag(TestCase):
    def setUp(self):
        repositorio = Repositorio()
        repositorio.id = 1
        repositorio.nome = "repositorio"
        repositorio.save()

    def test_fields_tag(self):
        tag = Tag()
        tag.nome = "teste1"
        tag.repositorio = Repositorio.objects.get(id=1)
        tag.save()

        queryset = Tag.objects.get(repositorio=1)

        self.assertEquals(queryset, tag)
