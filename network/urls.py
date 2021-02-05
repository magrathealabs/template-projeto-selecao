
from django.urls import path, include
from django.contrib.auth import views as auth_views
from django.conf.urls import url


from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("repo/<int:repo_id>", views.repo, name="repo"),
    path("repo/<int:repo_id>/add", views.add,  name= "add"),
    path("repo/<int:repo_id>/delete", views.delete,  name= "delete"),
    path("repo/<int:repo_id>/edit", views.edit,  name= "edit"),
    url('', include('social_django.urls', namespace='social')),

]
