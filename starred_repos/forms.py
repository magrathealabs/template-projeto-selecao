from django import forms
from .models import GitHubRepo


class GitHubRepoForm(forms.ModelForm):
    class Meta:
        model = GitHubRepo
        fields = [
            'tags'
        ]