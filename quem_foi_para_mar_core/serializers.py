from rest_framework import serializers
from .models import Pescador, Embarcacao, Viagem


class PescadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pescador
        fields = ("nome", "endereco", "telefone", "email", "contato")


class EmbarcacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Embarcacao
        fields = ("nome", "numeracao", "modelo", "caracteristicas")


class ViagemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Viagem
        fields = ("destino", "data_partida", "data_chegada_prevista",
                  "tripulacao")
