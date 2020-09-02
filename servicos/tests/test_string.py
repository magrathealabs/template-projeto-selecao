from django.test import TestCase
from servicos.String import String

class TestString(TestCase):
    def test_string_to_json(self):
        cadeia = "{'nome': 'ariel', 'senha' : 'teste123', 'flag': True, 'flag2': False}"

        retorno_json = String.string_to_json(cadeia)

        self.assertEquals(type(retorno_json), dict)