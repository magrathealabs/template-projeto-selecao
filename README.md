# [Git Tag](https://gittag.herokuapp.com)
Solução para organização de repositórios estrelados do Github, disponível em: https://gittag.herokuapp.com

# Requisitos
- [x] Fazer autenticação e autorização de usuário;
- [x] Buscar todos os repositórios em que o usuário fornecido adicionou estrela ***;
- [x] Gerenciar tags de repositórios listados (por exemplo, adicionar, editar, excluir);
- [x] Filtrar repositórios por tags.
## Adicional
- [x] Opção de tornar tags públicas

*** A solução não considera a paginação do github. Portanto apenas um subconjunto dos repositórios são apresentados.

---

## Dependências para instalação
- [GithubApp](https://github.com/settings/applications/)
- [Heroku](herokuapp.com/) 
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)
- [Docker](https://www.docker.com/) 
- [AtlasDB](https://www.mongodb.com/cloud/atlas)

#### Documentação auxiliar
- [Registro de containers do Heroku](https://devcenter.heroku.com/articles/container-registry-and-runtime)
- [Dockerfile](https://docs.docker.com/engine/reference/builder/)
- [NestJS](https://docs.nestjs.com/)
- [ReactJS](https://reactjs.org/docs/getting-started.html)

# Instalação
- [Setup](#parte-1---setup)
- [Desenvolvimento](#parte-2---desenvolvimento)
- [Deploy](#parte-3---deploy)

## Parte 1 - Setup
- Clonar este repositório
- Criar um arquivo `.env.production` na pasta raíz
- Preencher `.env.prodction` com:
  - REACT_APP_CLIENT_ID=client_id # obtido ao [criar uma aplicação do github](https://github.com/settings/applications/new).
  - CLIENT_ID=client_id # o mesmo 
  - CLIENT_SECRET=client_secret # também obtido ao criar aplicação do github
  - DB_URL=mongodb+srv://<username>:<password>@<project>.unfhn.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority # Obtido ao criar um projeto e db no atlas

## Parte 2 - Desenvolvimento
Se for do interesse contribuir (tipo com testes), ou alterar algo, é só criar um `.env.development` na pasta `backend` e outro na `frontend`:

#### Backend
- `/backend/.env.development`
  - PORT=25565
  - DB_URL=
  - CLIENT_ID=
  - CLIENT_SECRET=
- `/backend/` instalar as dependências com [yarn](https://yarnpkg.com/)  `yarn`
- `/backend/` rodar o backend `yarn start`
- `/backend/` para rodar os testes `yarn test`

#### Frontend
- `/frontend/.env.development`
  - REACT_APP_BE_PORT=25565
  - PORT=80
  - REACT_APP_HOME_URL=localhost
  - REACT_APP_CLIENT_ID=
- `/frontend/` instalar as dependências `yarn`
- `/frontend/` rodar o frontend `yarn start`

#### Alterações
- Para ver as alterações feitas basta acessar [localhost](http://localhost) e navegar
- Se ficou muito massa faz um PR :)

## Parte 3 - Deploy
- Criar uma aplicação no [Heroku](herokuapp.com/). **Ex: gittag** (não é preciso escolher buildpack)
- Na pasta raíz do repositório, montar a imagem `docker build . -t gittag`
- Fazer login nos registros de container do Heroku `heroku container:login`
- É preciso marcar o projeto como web nos registros do Heroku `docker tag gittag registry.com/gittag/web`
- Em seguida enviamos a imagem criada para o registro `docker push registry.heroku.com/gittag/web`
- Por fim é só lançar a versão `heroku container:release web` e não esquecer de ativar os dynos no Heroku.

---

# Considerações
- No front faltou muita organização no projeto. Fui aprendendo enquanto fazia e não quis voltar atrás.
- Tenho noção que falta testes. Tentei implementar no back, valeu @VGasparini pela ajuda, mas tive muita dificuldade com jest e mongo. Ainda mais com a injeção de dependências, não fazia ideia de como mockar os models... Só um breve desabafo.
- No back a estrutura ficou *um pouco melhor*, embora também fui aprendendo enquanto fazia. Comecei só com express, mas decidi utilizar o framework Nest. Ele ajudou bastante na arquitetura, mas eu consegui bagunçar o services de qualquer maneira :P.
- Curti muito desenvolver esse projeto (embora tenha ficado parado por meses), aprendi muita coisa quando foquei em desenvolver. Valeu pela oportunidade!
- A usabilidade não ficou boa, sofri pra conseguir deixar o sistema funcional com React. A dica é que as ações com tags são executadas após pressionar Enter e tirar o mouse da tag remove o foco dela.

# That's all folks
