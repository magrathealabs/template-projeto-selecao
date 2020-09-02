from . import models
from django import forms
from servicos.Github import Github
from servicos.PasswordValidation import PasswordValidation

class UsuarioForm(forms.ModelForm):
    """Formulário de cadastro, faz a validação dos campos

    Args:
        forms (Formulário): Herança do formulário do Django
    """

    def __init__(self, usuario=None, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.usuario = usuario
        self.error = False

    senha = forms.CharField(
        widget=forms.PasswordInput(),
        help_text="A senha precisa de pelo menos 8 caracteres com digitos e"\
            " pelo menos uma letra minúscula."
    )
    
    confirma_senha = forms.CharField(
        widget=forms.PasswordInput(),
        label="Confirmação Senha"
    )
    
    class Meta:
        model = models.Usuario
        fields = ('login', 'email', 'senha', 'confirma_senha')

    def clean(self, *args, **kwargs):
        data = self.data
        cleaned = self.cleaned_data
        validation_error_msg = {}

        login_data = cleaned.get('login')
        email_data = cleaned.get('email')
        senha = cleaned.get('senha')

        login_git = Github.request_user(login=login_data)
        login_db = models.Usuario.objects.values_list().filter(login=login_data)
        email_db = models.Usuario.objects.get(email=email_data)

        if email_db:
            validation_error_msg['email'] = "Email ja cadastrado"

        if login_db or login_git:
            validation_error_msg['login'] = "Usuário ja cadastrado"

        if not (PasswordValidation.validate_password(data["senha"])):
            validation_error_msg['senha'] = "Formato da senha inválido"

        if not (data['senha'] == data['confirma_senha']):
            validation_error_msg['confirma_senha'] = "Senhas não conferem"
 
        if not data['senha']:
            validation_error_msg['senha'] = "Campo obrigatório"

        if not data['confirma_senha']:
            validation_error_msg['confirma_senha'] = "Campo obrigatório"

        if validation_error_msg:
            self.error = True
            raise(forms.ValidationError
                (
                    validation_error_msg
                )
            )
