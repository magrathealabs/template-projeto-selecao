# CLIENTE GITHUB

O [GitHub](https://www.github.com) é uma rede social de programadores que possui uma funcionalidade interessante que permite "colocar estrelas" em repositórios dos seus usuários.

## CASO DE USO

Você é um usuário ativo do GitHub, que está sempre procurando novos projetos e curtindo aqueles que são interessantes. Você gostaria de poder adicionar uma tag a um repositório para que ele possa ser encontrado facilmente. Por exemplo: você encontrou um repositório chamado react e gostaria de adicionar tags javascript e frontend. Como o GitHub não possui essa funcionalidade, você deseja criar um sistema simples que possa ajudar nessa tarefa.

## REQUISITOS

Deve-se criar uma aplicação web onde podemos:

* Fazer autenticação e autorização de usuário;
* Buscar todos os repositórios em que o usuário fornecido adicionou estrela;
* Gerenciar tags de repositórios listados (por exemplo, adicionar, editar, excluir);
* Filtrar repositórios por tags.

Extra: Sugerir tags para os repositórios.

## HISTÓRIAS DE USUÁRIO

1. Autenticação de usuário

> Como usuário, quero me cadastrar e fazer login no sistema. Desejo que minhas tags e repositórios sejam vistos apenas por mim mesmo.

Você pode usar a funcionalidade "login com o GitHub" para a autenticação, ou fazer autenticação com usuário e senha.

2. Buscar repositórios

> Como usuário, desejo fornecer meu nome de usuário para recuperar todos os repositórios, para que eu possa adicionar, editar ou excluir minhas tags posteriormente.

Usando a API do GitHub, obtenha repositórios com estrela. As informações que devem ser recuperadas são: id do repositório, nome do repositório, descrição e url HTTP.

3. Adicionar tags aos repositórios

> Como usuário, desejo poder adicionar tags a cada repositório para poder pesquisá-las posteriormente por tag.

Um repositório não pode ter tags duplicadas.

4. Pesquisar repositórios por tags

> Como usuário, desejo poder fornecer uma tag para listar os repositórios que têm essa tag associada.

A pesquisa deve funcionar para consultas com seqüências de caracteres ao meio (por exemplo, digitando doc, os repositórios com tag "docker" e "documentação" devem ser retornados).
