# CLIENTE TWITTER

**ALERTA!**: O Twitter está limitando o acesso a chaves da API. Recomendamos você a escolher outro projeto, ou terá que esperar algum tempo pela sua chave.

O [Twitter](https://www.twitter.com) é uma rede social de microblogging, que permite aos usuários enviar e receber atualizações pessoais em textos de até 280 caracteres, conhecidos como "tweets", por meio do website do serviço, por SMS e por softwares específicos de gerenciamento. O Twitter também possui uma [API aberta](https://developer.twitter.com).

## CASO DE USO

Você está desenvolvendo um projeto para uma agência de mídias digitais que precisa monitorar algumas hashtags no Twitter. Porém, como o Twitter não possui essa funcionalidade, você deseja criar um sistema simples que possa ajudar nessa tarefa.

## REQUISITOS

Deve-se criar uma aplicação web onde podemos:

* Fazer autenticação e autorização de usuário;
* Adicionar e remover hashtags que queremos acompanhar;
* Coletar de forma assíncrona mensagens publicadas no Twitter contendo as hashtags (dentro do limite da API);
* Listar as mensagens coletadas mostrando: mensagem, autor e data de publicação;
* Filtrar as mensagens listadas por hashtag.

## HISTÓRIAS DE USUÁRIO

1. Autenticação de usuário

> Como usuário, quero me cadastrar e fazer login no sistema. Desejo que minhas tags e repositórios sejam vistos apenas por mim mesmo.

Você pode usar a funcionalidade "login com o Twitter" para a autenticação, ou fazer autenticação com usuário e senha.

2. Adicionar hashtags

> Como usuário, desejo poder adicionar hashtags para poder pesquisá-las posteriormente por tag.

Não pode ter hashtags duplicadas. Usando a API do Twitter, obtenha as mensagens com a hashtag. As informações que devem ser recuperadas são: mensagem, autor e data de publicação. Faça esta busca de forma assíncrona usando background jobs ou outro artifício.

3. Remover hashtags

> Como usuário, desejo poder remover hashtags.

Todas as mensagens associadas a esta hashtag devem ser apagadas.

4. Pesquisar tweets por hashtags

> Como usuário, desejo poder fornecer uma hashtag para listar as menssagens que têm essa hashtag associada.

A pesquisa deve funcionar para consultas com seqüências de caracteres ao meio (por exemplo, digitando doc, as mensagens com hashtag "docker" e "documentação" devem ser retornados).
