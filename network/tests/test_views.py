from django.test import TestCase, Client
from ..models import Repo, User, Tag
from django.contrib.auth import authenticate, login, logout
from ..forms  import RepoForm


class IndexTestCase(TestCase):

    @classmethod
    def setUpClass(cls):
            
        cls.c= Client()
        #meu usuario no Github, pode ser trocado para testar qualquer um
        cls.user11 = User.objects.create(username='luismomm2110', password='12345', is_active=True, is_staff=True, is_superuser=True) 
        cls.user12 = User.objects.create(username='12', password='12345', is_active=True, is_staff=True, is_superuser=True) 
        cls.user13 = User.objects.create(username='13', password='12345', is_active=True, is_staff=True, is_superuser=True)

        cls.tag11=  Tag.objects.create(id=11,  name="tag2")
        cls.tag12=  Tag.objects.create(id=12,  name="tag2")
        cls.tag13=  Tag.objects.create(id=13,  name="tag3")   #tag inserida para repo1 no user1 mas nao em user2

            
        cls.user11.tags.add(cls.tag11)
        cls.user11.tags.add(cls.tag12)
        cls.user11.tags.add(cls.tag13)
           
        super(IndexTestCase, cls).setUpClass()

    #testa  acesso e se retorna numero de repo e tags
    def test_index(self):
            
        self.c.force_login(self.user11)

        response = self.c.get("")
            
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.context['repos']), 4)
        self.assertEqual(len(response.context['tags']), 3)
    
class RepoTestCase(TestCase):

    @classmethod
    def setUpClass(cls):
            
        cls.c= Client()
        #meu usuario no Github, pode ser trocado para testar qualquer um
        cls.user15 = User.objects.create(username='15', password='12345', is_active=True, is_staff=True, is_superuser=True) 
        cls.tag15=  Tag.objects.create(id=15,  name="tag2")

        cls.user15.tags.add(cls.tag15)
        super(RepoTestCase, cls).setUpClass()


    #testa acesso
    def test_repo_acess(self):
        
        self.c.force_login(self.user15)
        repo15 = Repo.objects.create(id=15, name="15", description="A little test2", link="wwww.test.ts2")
        self.user15.repos.add(repo15)

        response = self.c.get(f"/repo/{repo15.id}")

        self.assertEqual(response.status_code, 200)
           
     
class  AddTestCase(TestCase):

    @classmethod
    def setUpClass(cls):
            
        cls.c= Client()
        cls.user16 = User.objects.create(username='16', password='12345', is_active=True, is_staff=True, is_superuser=True) 
        cls.tag16=  Tag.objects.create(id=16,  name="tagTest")

        cls.user16.tags.add(cls.tag16)
        super(AddTestCase, cls).setUpClass()

    #testa acesso
    def test_add_acess(self):
        
        self.c.force_login(self.user16)
        repo16 = Repo.objects.create(id=16, name="16", description="A little test2", link="wwww.test.ts2")
        self.user16.repos.add(repo16)

        response = self.c.get(f"/repo/{repo16.id}/add")

        self.assertEqual(response.status_code, 302)

    #testa se adiciona tag
    def test_add_valid(self):
        
        self.c.force_login(self.user16)
        repo17 = Repo.objects.create(id=17, name="15", description="A little test2", link="wwww.test.ts2")
        self.user16.repos.add(repo17)

        response = self.c.post(f"/repo/{repo17.id}/add",  {
                    "name" : "tag for test"
        })

        self.assertEqual(response.status_code, 302)
        self.assertEqual(repo17.tags.count(), 1)

    #testa se nao adiciona com mesmo nome
    def test_add_same(self):

        self.c.force_login(self.user16)
        repo18 = Repo.objects.create(id=18, name="18", description="A little test2", link="wwww.test.ts2")
        self.user16.repos.add(repo18)
        tag18  =  Tag.objects.create(name="old tag")
        repo18.tags.add(tag18)
        self.user16.tags.add(tag18)

        response = self.c.post(f"/repo/{repo18.id}/add",  {
                    "name" : "old tag"
        })

        self.assertEqual(response.status_code, 302)
        self.assertEqual(repo18.tags.count(), 1)

class  DelTestCase(TestCase):

    @classmethod
    def setUpClass(cls):
            
        cls.c= Client()
        cls.user20 = User.objects.create(username='20', password='12345', is_active=True, is_staff=True, is_superuser=True) 
        cls.tag20=  Tag.objects.create(id=20,  name="tagTest")

        cls.user20.tags.add(cls.tag20)
        super(DelTestCase, cls).setUpClass()


     #testa acesso
    def test_del_acess(self):
        
        self.c.force_login(self.user20)
        repo20 = Repo.objects.create(id=20, name="20", description="A little test2", link="wwww.test.ts2")
        self.user20.repos.add(repo20)

        response = self.c.get(f"/repo/{repo20.id}/delete")

        self.assertEqual(response.status_code, 302)

    #testa se deleta tag
    def test_del_confirm(self):
        
        self.c.force_login(self.user20)
        repo21 = Repo.objects.create(id="21", name="21", description="A little test2", link="wwww.test.ts2")
        self.user20.repos.add(repo21)
        repo21.tags.add(self.tag20)

        response = self.c.post(f"/repo/{repo21.id}/delete",  {
            'delete' : "20"
        })

        self.assertEqual(repo21.tags.count(), 0)
        self.assertEqual(response.status_code, 302)

    #testa que tag deixa de existir quando nao é ligada a nenhuma repo
    def test_del_empty(self):
        
        self.c.force_login(self.user20)
        repo22 = Repo.objects.create(id="22", name="catch22", description="A little test2", link="wwww.test.ts2")
        tag22 = Tag.objects.create(id=22, name="catch22")
        self.user20.repos.add(repo22)
        repo22.tags.add(tag22)

        response = self.c.post(f"/repo/{repo22.id}/delete",  {
            'delete' : "22"
        })

        self.assertTrue(tag22.DoesNotExist)
        self.assertEqual(response.status_code, 302)

class  EditTestCase(TestCase):
    
    @classmethod
    def setUpClass(cls):
            
        cls.c= Client()
        cls.user23 = User.objects.create(username='23', password='12345', is_active=True, is_staff=True, is_superuser=True) 
        cls.tag23=  Tag.objects.create(id=23,  name="tagTest")

        cls.user23.tags.add(cls.tag23)
        super(EditTestCase, cls).setUpClass()

    #testa acesso
    def test_edit_acess(self):
        
        self.c.force_login(self.user23)
        repo23 = Repo.objects.create(id=23, name="23", description="A little test2", link="wwww.test.ts2")
        self.user23.repos.add(repo23)

        response = self.c.get(f"/repo/{repo23.id}/edit")

        self.assertEqual(response.status_code, 302)

    #testa se consegue editar quando nao ha outra com esse nome
    def test_edit_sucess(self):

        self.c.force_login(self.user23)
        repo24 = Repo.objects.create(id=24, name="24", description="A little test2", link="wwww.test.ts2")
        repo24.tags.add(self.tag23)
        self.user23.repos.add(repo24)

        response = self.c.post(f"/repo/{repo24.id}/edit",{
            'edit' :  '23',
            'name' : 'EditTag',
        })

        listNameTag=  []
        for x in repo24.tags.all():
            listNameTag.append(x.name)

        self.assertEqual(response.status_code, 302)
        self.assertFalse("24" in listNameTag)

    #testa se nao consegue mudar tag que ja esta no repositorio
    def test_edit_already(self):
        
        self.c.force_login(self.user23)
        repo24 = Repo.objects.create(id=24, name="24", description="A little test2", link="wwww.test.ts2")
        self.user23.repos.add(repo24)
        
        tag25 = Tag.objects.create(id=25, name="25")
        repo24.tags.add(tag25)
        self.user23.tags.add(tag25)
        
        tag26 = Tag.objects.create(id=26, name="26")
        repo24.tags.add(tag26)
        self.user23.tags.add(tag26)
        
        response = self.c.post(f"/repo/{repo24.id}/edit",{
            'edit' : '25',
            'name' : '26',
        })

        self.assertEqual(response.status_code, 302)
        self.assertEqual(tag25.name,"25")









