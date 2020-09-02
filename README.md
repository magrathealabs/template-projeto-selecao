![PyPI - Python Version](https://img.shields.io/pypi/pyversions/django?color=092E20&logo=Django) [![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

# Cliente GitHub

## Descrição
O sistema apresentado permite usuários logados buscarem repositórios do GitHub e adicionar diferentes tipos de tags aos mesmos, desta forma, possui uma facilidade para acessá-los futuramente. Cada repositório possui seu nome, descrição e uma URL para acessá-lo diretamente no GitHub.


## Tabela de conteúdos

<!--ts-->
   * [Descrição](#Descrição)
   * [Tabela de Conteúdo](#tabela-de-conteudos)
   * [Features](#features)
   * [Dependências](#dependência)
   * [Como usar](#como-usar)
      * [Execução Produção](#execução-produção)
      * [Execução Local](#execução-local)
   * [Tecnologias](#tecnologias)
<!--te-->

## Features

- [X] Fazer autenticação e autorização de usuário.
- [X] Busca de repositórios.
- [X] Gerenciar tags de repositórios listados (por exemplo, adicionar, editar, excluir).
- [X] Filtrar repositórios por tags.

## Dependência

A dependência que consiste no projeto é a instalação do virtual environment.

`$ sudo apt-get install python3-pip`

`$ sudo pip3 install virtualenv `

Em caso de problemas de pacotes instalados dentro do ambiente virtual, o seguinte comando fará a instalação das depedências.

`$ pip install -r requirements.txt `

## Como usar

### Execução Produção

O deploy do sistema foi aplicado no heroku, para acessá-lo basta clicar no link abaixo.

<https://magrathea-project.herokuapp.com>

### Execução Local

* Ativar environment

`$  . venv/bin/activate`

*  Executar o acesso local

`$ heroku local` 

* O servidor iniciará na porta 5000. Acesse:

<http://localhost:5000>

## Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Heroku](https://www.heroku.com/) <img height="16" width="16" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/heroku.svg" />
- [Django](https://www.djangoproject.com/) <img height="16" width="16" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/django.svg" />
- [Python](https://www.python.org/) <img height="16" width="16" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/python.svg" />
