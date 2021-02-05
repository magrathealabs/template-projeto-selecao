from django.test import TestCase, Client, RequestFactory
from ..models import Repo, User, Tag
from django.contrib.auth import authenticate, login, logout
from ..forms  import RepoForm



# Create your tests here.

class ModelsTestCase(TestCase):

    @classmethod
    def setUpClass(cls):

        cls.user1 = User.objects.create(username='testuser', password='12345', is_active=True, is_staff=True, is_superuser=True) 
        cls.user2 = User.objects.create(username='testuser2', password='12345', is_active=True, is_staff=True, is_superuser=True) 

        cls.repo1 = Repo.objects.create(id=1, name="Test Object", description="A little test", link="wwww.test.ts") 
        cls.repo2 = Repo.objects.create(id=2, name="Test Object2", description="A little test2", link="wwww.test.ts2")
        cls.repo3 = Repo.objects.create(id=3, name="Test Object2", description="A little test2", link="wwww.test.ts2")

        cls.user1.repos.add(cls.repo1)
        cls.user1.repos.add(cls.repo2)
        cls.user2.repos.add(cls.repo3)

    
        cls.tag1 = Tag.objects.create(id=1, name="tag1")
        cls.tag2= Tag.objects.create(id=2,  name="tag2")
        cls.tag3 =Tag.objects.create(id=3,  name="tag3")   #tag inserida para repo1 no user1 mas nao em user2
    
        cls.repo1.tags.add(cls.tag1)
        cls.repo1.tags.add(cls.tag2)
        cls.repo2.tags.add(cls.tag2)
        cls.repo3.tags.add(cls.tag1)
        cls.repo3.tags.add(cls.tag3)

        cls.user1.tags.add(cls.tag1)
        cls.user1.tags.add(cls.tag2)
        cls.user2.tags.add(cls.tag1)
        cls.user2.tags.add(cls.tag3)

        super(ModelsTestCase, cls).setUpClass()

    def test_user_count(self):
        a = User.objects.count()
        self.assertEquals(a, 2)

    def test_user_tags_count(self):
        a1 = self.user1.tags.count()
        a2 = self.user2.tags.count()
        self.assertEquals(a1, 2)
        self.assertEquals(a2, 2)

    def test_repo_count(self):
        self.assertEquals(self.user1.repos.count(), 2)
        self.assertEquals(self.user2.repos.count(), 1)

    
    def test_redundancy_tag(self):
        self.assertTrue(self.tag3 not in self.user1.tags.all())
        self.assertTrue(self.tag3 in self.user2.tags.all())
    
     
    def test_login(self):
        user = User.objects.create(username='newtestuser')
        user.set_password('12345')
        user.save()

        c = Client()
        logged_in = c.login(username='newtestuser', password='12345')
        self.assertTrue(logged_in)
