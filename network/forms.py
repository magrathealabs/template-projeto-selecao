from django.forms import ModelForm
from network.models import Tag, Repo, User
from django import forms

class RepoForm(ModelForm):
    class Meta: 
        model = Tag 
        fields = ['name']


class EditForm(ModelForm):
        class Meta:
            model = Tag
            fields = ['name']