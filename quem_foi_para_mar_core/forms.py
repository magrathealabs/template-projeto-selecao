from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Viagem, Pescador, Embarcacao
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.mixins import LoginRequiredMixin, AccessMixin


class LoginForm(AuthenticationForm, AccessMixin):
    username = forms.CharField(widget=forms.TextInput(attrs={'class':'form-control'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class':'form-control'}))


class CriarNovoUsuarioForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        fields = UserCreationForm.Meta.fields + ("email",)


class ViagemForm(forms.ModelForm):
    class Meta:
        model = Viagem
        fields = ('destino', 'data_partida', 'data_chegada_prevista',
                  'tripulacao', 'embarcacao_id', 'pescador_id')


class PescadorForm(forms.ModelForm):
    class Meta:
        model = Pescador
        fields = ('nome', 'endereco', 'telefone', 'email', 'contato')


class EmbarcacaoForm(forms.ModelForm):
    class Meta:
        model = Embarcacao
        fields = ('nome', 'numeracao', 'modelo', 'caracteristicas')
