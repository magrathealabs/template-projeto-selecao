from django.test import (
    SimpleTestCase, 
    Client, 
    TestCase
)

from django.urls import (
    reverse, 
    resolve
)

from repos.views import (
    List, 
    EditarTag, 
    SaveTag
)

class TestUrls(TestCase):
    pass
    def test_list_url_is_available(self):
        url = resolve('/repos/list/')
        self.assertEquals(url.func.view_class, List)
    

    def test_editar_tag_url_is_available(self):
        url = resolve('/repos/edit/')
        self.assertEquals(url.func.view_class, EditarTag)


    def test_save_tag_url_is_available(self):
        url = resolve('/repos/tag/')
        self.assertEquals(url.func.view_class, SaveTag)
