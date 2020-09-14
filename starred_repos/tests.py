from django.test import TestCase
from django.contrib.auth.models import User
from .views import repositorios_favoritos_do_usuario
from .models import GitHubRepo
import unittest

class TestGitHubAPI(TestCase):

    def setUp(self):
        self.github_username = 'andressadotpy'
        self.email = 'test@test.com'
        self.password = 'password'
        self.usuario = User.objects.create_user(username=self.github_username, email=self.email, password=self.password)

    def test_if_values_from_api_are_being_saved_in_db(self):
        repositorios_favoritos_do_usuario(self.usuario)
        self.assertTrue(User.objects.filter(username=self.github_username).exists())
        self.assertTrue(GitHubRepo.objects.filter(usuario=self.usuario).exists())
