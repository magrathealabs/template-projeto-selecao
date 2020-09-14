1. # GitHeart

   O projeto escolhido foi o de adicionar Tags nos Repositórios favoritados por um determinado usuário do GitHub. O projeto foi desenvolvido em *Python*, utilizando o framework **Django**.

   Após ter clonado o repositório da aplicação e ativar o virtualenvironment, é necessário instalar os requisitos da aplicação utilizando o **pip**.

   ```bash
   $ pip install -r requirements.txt
   ```

   Nesse projeto foi utilizado para gerenciar a database *githeart* o PostgreSQL. É preciso fazer as migrações para a database.

   ```bash
   $ python manage.py makemigrations
   $ python manage.py migrate
   ```

   ## Estrutura do projeto

   A estrutura do projeto ficou no seguinte formato. `githeart` é o nome do projeto. Um projeto pode ter várias aplicações, nesse caso possui a aplicação `starred_repos` o que torna o projeto `githeart` fácil de ser extendido para próximas versões. 

   ```
   template-projeto-selecao  
   └─── githeart  
       |___ __init__.py
       |___ asgi.py
       └─── settings.py
       |___ urls.py
       |___ wsgi.py
   └─── starred_repos  
       |___ __init__.py
       |___ admin.py
       |___ apps.py
       |___ forms.py
       |___ models.py
       |___ tests.py
       |___ urls.py
       |___ views
       	|___ __init__.py
       	|___ repositorios.py
       	|___ tags.py    	
   |___ static
   |___ templates
   |___ manage.py
   ​```
   ```

   Dentro de `githeart` ficam as configurações de todo o projeto. 

   Dentro de `starred_repos` dois modelos foram criados: 

   - `GitHubRepo` é o modelo responsável por criar os repositórios favoritados no *GitHub* vindos da API do GitHub e que adiciona um campo para receber tags do tipo `Tag`
   - `Tag` é o modelo responsável por criar essas tags.

   É possível criar, adicionar, editar e deletar todas as tags, as funções para isso estão em `views/tags.py`.

   As tags são adicionadas lado a lado utilizando vírgulas como separador, por exemplo: `Django,Python,API` 

   As funções responsáveis por buscar as informações na [API do GitHub](https://api.github.com/users/andressadotpy/starred) e armazenar na aplicação estão em `views/repositorios.py`.

   Para rodar localmente, a partir da pasta root  do projeto:

   ```bash
   $ python manage.py runserver
   ```

   ## Melhorias que poderiam ser realizadas numa segunda versão

   - Deixar os repositórios em `home.html` em cards lado a lado.
   - Melhorar o frontend no geral.
