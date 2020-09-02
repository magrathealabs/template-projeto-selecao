from django.db import models

class Usuario(models.Model):
    nome = models.CharField(max_length=255)
    login = models.CharField(max_length=255, unique=True)
    senha = models.CharField(max_length=100)
    email = models.EmailField(verbose_name='email', max_length=100, unique=True)

    def __str__(self):
        return self.login

    class Meta:
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'
