<<<<<<< HEAD
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
=======
# PROJETO DE SELEÇÃO

Ao conhecer uma pessoa que está aplicando para a Magrathea gostamos de ter uma conversa sobre código. Afinal, escrever, ler e discutir sobre código faz parte da nossa rotina diária de trabalho.

Você pode implementar o projeto usando qualquer linguagem de sua preferência. Lembre-se: use a linguagem com a qual você tem mais familiaridade.

## O QUE VAMOS AVALIAR

Queremos avaliar sua capacidade de fornecer um produto simples com documentação suficiente para outros desenvolvedores contribuírem ativamente para o projeto posteriormente. Na entrevista vamos prestar atenção nos seguintes itens:

* Comunicação na revisão do código presencial;
* Argumentos sobre desafios enfrentados e escolhas realizadas na implementação;

Ao revisar seu código vamos prestar atenção nos seguintes itens:

* Organização do código;
* Código bem escrito, limpo e coeso;
* Arquitetura e princípios de desenvolvimento;
* Documentação (README.md) com instruções claras para reproduzir o projeto;
* Uso adequado de versionamento do código em git;
* Uso de testes automatizados;
* Deploy da aplicação: recomendamos Heroku por ter plano free;
* O design da API RESTful é implementado, usando corretamente os verbos HTTP e o código de status apropriado;
* Uso adequado de HTML5, CSS3 e JavaScript em um front-end minimamente estruturado.

Caso você não se sinta confortável com algum desses itens, tudo bem, apenas nos fale sobre isso, ok? O objetivo aqui não é você programar de graça para nós, nem te fazer perder tempo com algo irrelevante. Nosso objetivo aqui é ter um código sobre o qual podemos conversar. Como você deve ter notado, a gente preza muito por colaboração, trabalho em time e comunicação. O objetivo aqui é ter, minimamente, essa experiência com você.

Respeite o seu nível de conhecimento e experiência, o importante é você saber dizer o motivo das suas escolhas. Se você tiver qualquer dúvida, por favor, entre em contato com a gente. Se quiser uma revisão no seu código em um Pull Request no Github, pode nos chamar. Estamos disponíveis para te ajudar a finalizar esse processo.
Ah, por último. Você acha que consegue nos responder em quanto tempo? Duas semanas é ok para você?

## IDEIAS DE PROJETOS

A seguir seguem algumas ideias de projetos que você pode implementar:

* [Cliente para o GitHub](https://github.com/magrathealabs/template-projeto-selecao/blob/master/projects/GITHUB.md);
* [Cliente para o Twitter](https://github.com/magrathealabs/template-projeto-selecao/blob/master/projects/TWITTER.md);
* [Cliente para o Meetup](https://github.com/magrathealabs/template-projeto-selecao/blob/master/projects/MEETUP.md).

Tem alguma outra ideia? Tem algum projeto que já está pronto e gostaria de apresentar? Fale com a gente :)

## COMO COMPARTILHAR O PROJETO CONOSCO

1. Apague este README.md e adicione informações que achar relevante como configurar o projeto, contendo os comandos que devem ser executados para executar ele e os testes;
2. Abra um PR apontando para a branch master deste repositório;
3. Escreva qualquer consideração na descrição do PR e faça qualquer comentário que achar pertinente no código.
>>>>>>> ca284b77d8e14f3d3a9c134a90044373fa21de92
