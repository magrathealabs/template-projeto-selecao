from django.db import models
from django.core.validators import MinLengthValidator


class Pescador(models.Model):
    class Meta:
        verbose_name_plural = "Pescadores"

    nome = models.CharField("Nome", max_length=254)
    endereco = models.CharField("Endereço", max_length=254)
    telefone = models.CharField("Telefone", max_length=50)
    email = models.EmailField("Email")
    contato = models.CharField("Contato em terra(nome e telefone)",
                               default=0, max_length=150)

    def __str__(self):
        return self.nome


class Embarcacao(models.Model):
    class Meta:
        verbose_name_plural = "Embarcações"
    nome = models.CharField("Nome", max_length=254)
    numeracao = models.CharField("Numeração", max_length=50)
    modelo = models.CharField("Modelo", max_length=100)
    caracteristicas = models.CharField("características", max_length=254)

    def __str__(self):
        return self.nome


class Viagem(models.Model):
    class Meta:
        verbose_name_plural = "Viagens"
    destino = models.CharField("Destino", max_length=254)
    data_partida = models.DateField("Data de partida", auto_now=False)
    data_chegada_prevista = models.DateField("Data de chegada prevista",
                                             auto_now=False)
    tripulacao = models.CharField("Nome dos tripulantes", max_length=254)
    embarcacao_id = models.ForeignKey(Embarcacao, on_delete=models.PROTECT)
    pescador_id = models.ForeignKey(Pescador, default=1, on_delete=models.PROTECT)

    def __str__(self):
        return self.destino
