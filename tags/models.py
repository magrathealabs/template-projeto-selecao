from django.db import models
from repos.models import Repositorio

class Tag(models.Model):
    nome = models.CharField(max_length=255)
    usuario = models.CharField(max_length=255)

    repositorio = models.ForeignKey(
                Repositorio, 
                on_delete=models.DO_NOTHING, 
            )

    def __str__(self):
        return self.usuario + " ", self.repositorio , " [" + self.nome + "]"
    

    class Meta:
        verbose_name = 'Tag'
        verbose_name_plural = 'Tags'

