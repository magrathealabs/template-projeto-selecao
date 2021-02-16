# Repo-Manager
Projeto para seleção de estágio da Magrathea Labs. 

##  Funcionalidade

- Cadastro de conta com Github
    - Captura de nome a registro com Github


### Administraçao de tags
1. Adiçao
2. Remoçao
3. Edicao

- Busca por tags 
- Controla tags repetidas para um repositório

<br />

### Status do projeto:  **Em desenvolvimento**  

<br />

####  Desenvolvimentos seguintes:
- Interface mais user-friendly
- Melhoria na estruturaçao do banco de dados

<br />

### Deploy da Aplicação com Hukoru:

>   https://django-repo-manager.herokuapp.com/

<br />

### Construido com: 
- Django 3.1.5
- SQLite
- Coverage para testes
  
<br />

### Instalacao:

-  -git clone https://github.com/luismomm2110/repo-manager
-  cd repo-manager 
-  python manage.py runserver

<br />

<img src= "https://scontent.fjoi2-1.fna.fbcdn.net/v/t1.0-9/145439713_3928870463824690_9102559612396937847_o.jpg?_nc_cat=110&ccb=2&_nc_sid=730e14&_nc_ohc=_yZ2cBFini8AX8L-HZi&_nc_ht=scontent.fjoi2-1.fna&oh=b81dfd2bf1f048d04e73be11eff9d9cd&oe=60425E2C " >

*exemplo de tela inicial com tags inseridas e busca por uma delas*

### Testes

<br />

- python manage.py test
  
- python manage.py test network.tests.test_views

- -  *especifico para Views. O nome do usuario pode ser mudado em IndexTestCase para certificar que carrega os repositorios favoritados usando force_login*

- python manage.py test network.tests.test_models