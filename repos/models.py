from django.db import models
from user.models import Usuario

class Repositorio(models.Model):    

    id = models.IntegerField(primary_key=True)
    nome = models.CharField(max_length=255)
    descricao = models.TextField(null=True, blank=True)
    url = models.URLField()

    def __str__(self):
        return self.nome

    class Meta:
        verbose_name = 'Repositorio'
        verbose_name_plural = 'Repositorios'
        ordering = ['id']


