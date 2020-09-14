from django.db import models
from django.contrib.auth.models import User

class Tag(models.Model):
    nome = models.CharField(max_length=40)
    
    def __str__(self):
        return self.nome
    
    def editar_tag(self, novo_nome):
        if self._novo_nome_e_valido(novo_nome):
            self.nome = novo_nome
    
    def _novo_nome_e_valido(self, novo_nome):
        tag = list(novo_nome)
        if len(tag) > 1:
            return False
        return True

class GitHubRepo(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    repo_id = models.CharField(max_length=30)
    descricao = models.CharField(max_length=400)
    nome = models.CharField(max_length=200)
    url = models.TextField()
    tags = models.ManyToManyField(Tag)

    def __str__(self):
        return self.descricao
