from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from .forms import RepoForm, EditForm
from django.views.generic import CreateView
from django.contrib.auth.decorators import login_required
import requests, json
from django.contrib import messages
from django.shortcuts import redirect

from .models import User, Repo, Tag

@login_required
def index(request):

    name = request.user.username 
    r = requests.get(f"https://api.github.com/users/{name}/starred")
    data = json.loads(r.content)
    listId =[]

    for index in data:

        repo = Repo(id = index["id"], name = index["name"], description = index["description"], 
                    link = index["html_url"])
       
        if  not any (x.id == repo.id for x in Repo.objects.all()):
            repo.save()
        
        request.user.repos.add(repo)
        listId.append(index["id"])
        
    for x in request.user.repos.all():
           if int(x.id) not in listId:
               x.delete()

    return render(request, "network/index.html", {
      #  "repos": request.user.repos.all(),
      #  "tags": request.user.tags.all(),
    })

def login_view(request):
    return render(request, "network/login.html")

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("login"))

def repo(request, repo_id):
       
    error = ""
    repo = request.user.repos.get(id = repo_id)

    return render(request, "network/repo.html",{
           "repo" : repo,
           "form_name": RepoForm(),
           "error" : error,
           "form_edit" : EditForm(),
     })

def add(request, repo_id):
    
    if request.method == "POST":

        form_name = RepoForm(request.POST)

        if form_name.is_valid():
            
            tagName = form_name.cleaned_data["name"].lower()
            repo = Repo.objects.get(id= repo_id)

            try:
                
                Tag.objects.get(user=request.user, repo=repo, name=tagName)
                messages.success(request, "Tag already used!")
                
                return HttpResponseRedirect(reverse('repo', args=[repo_id]))
            
            except:
            #se nao tem tem nesse usuario, cria 
                if not any (x.name == tagName for x in request.user.tags.all()):

                    tag = Tag.objects.create(name = tagName.lower(), user=request.user)
                    repo.tags.add(tag)
                    request.user.tags.add(tag)
                
                    return HttpResponseRedirect(reverse('repo', args=[repo_id]))

                else:
                    tag = Tag.objects.get(name=tagName, user=request.user)
                    repo.tags.add(tag)

                    return HttpResponseRedirect(reverse('repo', args=[repo_id]))

def delete(request, repo_id):

    if request.method == "POST":

        repo = Repo.objects.get(pk=repo_id)

        tag_id = int(request.POST["delete"])

        tag = Tag.objects.get(pk=tag_id)

        repo.tags.remove(tag)

        #se ele nao pertence a nenhum repo, desaloca memoria
        if tag.repo.count() == 0:
            tag.delete()

        return HttpResponseRedirect(reverse('repo', args=[repo_id]))
    
def edit(request, repo_id):

    if request.method == "POST":

        tag_id = int(request.POST["edit"])

        form_edit = EditForm(request.POST)

        repo = Repo.objects.get(pk=repo_id)

        if  form_edit.is_valid():

            tagName = form_edit.cleaned_data['name'].lower()

            try:
                
                Tag.objects.get(user=request.user, repo=repo, name=tagName)
                messages.success(request, "Tag already used!")
                
                return HttpResponseRedirect(reverse('repo', args=[repo_id]))

            except:
                pass

                repo = Repo.objects.get(pk=repo_id)
                tag_id = int(request.POST["edit"])
                tag = Tag.objects.get(pk=tag_id)
                
                repo.tags.remove(tag)

                if tag.repo.count() == 0:
                    tag.delete()

                #ve essa tag esta em outra repo para adicionar na atual
                try:
                    newTag = Tag.objects.get(name=tagName, user=request.user)
                    repo.tags.add(newTag)
                        
                    return HttpResponseRedirect(reverse('repo', args=[repo_id]))
                    
                except:
                    tag = Tag.objects.create(name = tagName, user=request.user)
                    repo.tags.add(tag)
                    request.user.tags.add(tag)

                    return HttpResponseRedirect(reverse('repo', args=[repo_id]))