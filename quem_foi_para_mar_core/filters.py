from .models import Viagem
import django_filters


class ViagemFilter(django_filters.FilterSet):
    class Meta:
        model = Viagem
        fields = ('destino', 'data_partida', 'data_chegada_prevista',
                  'tripulacao', 'embarcacao_id', 'pescador_id')
