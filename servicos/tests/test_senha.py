from django.test import TestCase
from servicos.PasswordValidation import PasswordValidation

class TestSenha(TestCase):
    def test_senha_curta(self):
        senha = "Ariel12"
        validacao = PasswordValidation.validate_password(senha)

        self.assertFalse(validacao)

    def test_senha_sem_digito(self):
        senha = "Magrathea"
        validacao = PasswordValidation.validate_password(senha)

        self.assertFalse(validacao)
        
    def test_senha_longa(self):
        senha = "Ariel123"
        validacao = PasswordValidation.validate_password(senha)

        self.assertTrue(validacao)

    def test_senha_sem_letra(self):
        senha = "12345678"
        validacao = PasswordValidation.validate_password(senha)

        self.assertFalse(validacao)

