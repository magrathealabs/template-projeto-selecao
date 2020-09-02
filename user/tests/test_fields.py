from django.test import TestCase
from user.models import Usuario

class TestFields(TestCase):
    def test_fields(self):
        usuario = Usuario()
        usuario.login = "teste1"
        usuario.senha = "teste"
        usuario.email = "teste@teste.com"
        usuario.save()

        queryset = Usuario.objects.get(login="teste1")

        self.assertEquals(queryset, usuario)
