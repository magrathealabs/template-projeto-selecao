from django.test import (
    SimpleTestCase, 
    Client, 
    TestCase
)

from django.urls import (
    reverse, 
    resolve
)

from user.views import (
    Home, 
    Criar, 
    Login, 
    Logout, 
    Perfil
)

class TestUrls(TestCase):
    
    def test_home_url_is_available(self):
        url = resolve("/")
        self.assertEquals(url.func.view_class, Home)

    def test_perfil_url_is_available(self):
        url = resolve('/perfil/')
        self.assertEquals(url.func.view_class, Perfil)

    def test_criar_url_is_available(self):
        url = resolve('/criar/')
        self.assertEquals(url.func.view_class, Criar)

    def test_login_url_is_available(self):
        url = resolve('/login/')
        self.assertEquals(url.func.view_class, Login)

    def test_logout_url_is_available(self):
        url = resolve('/logout/')
        self.assertEquals(url.func.view_class, Logout)

