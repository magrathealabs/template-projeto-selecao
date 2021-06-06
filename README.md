## INSTRUÇÕES PARA RODAR O PROJETO:

ATENÇÃO: Esses passos deverão ser executados caso o intuito seja rodar o projeto localmente.

* Abrir o arquivo gerenciador-hashtags-twitter.sln (template-projeto-selecao/gerenciador-hashtags-twitter/gerenciador-hashtags-twitter.sln) no visual studio 2019.
* Definir o projeto gerenciador-hashtags-twitter.WebAPI como projeto de inicialização.
![image](https://user-images.githubusercontent.com/38192027/120930631-8445f900-c6c4-11eb-91af-b2f90a1df865.png)
* Clique em IIS Express para rodar o projeto. </br>
![image](https://user-images.githubusercontent.com/38192027/120930721-d71fb080-c6c4-11eb-9486-67b94467f749.png)

### Passos genéricos

* A página inicial do projeto será o Swagger da WEBAPI. </br>
![image](https://user-images.githubusercontent.com/38192027/120931282-40a0be80-c6c7-11eb-86cd-96bbb9083049.png) </br>
No Swagger, será possível visualizar todos os métodos contidos na WebAPI e uma breve descrição explicando o que cada um dos métodos faz. 
* Na pasta raiz do projeto, existe uma coleção do postman que poderá ser usada também para testá-lo com todos os métodos contidos na WebAPI.  

## INSTRUÇÕES PARA RODAR OS TESTES:

Os projetos de teste são os que contém o prefixo .Tests no final do nome do projeto. 
Para executá-los, basta clicar com o botão direito em cima do arquivo, no visual studio e clicar em Run Tests.

## Como o projeto funciona?

Inicialmente, o projeto foi desenvolvido apenas com uma base de dados em memória, com o intuito de permitir execução de testes de unidade e validar de uma forma rápida o desenvolvimento dos métodos da WebAPI. Alguns dados já estão pré definidos, sendo carregados em memória ao iniciar o projeto. Ao abrir o projeto, automaticamente conterá 2 usuários, com 2 hashtags vinculadas a cada um deles. </br></br>

Usuário 1: </br>
login: larissamartins </br>
senha: @123456 </br></br>

Hashtags: #pets e #design. <br><br>

Usuário 2: </br>
login: John08 </br>
senha: @123456 </br></br>

Hashtags: #development e #design. <br><br>

## Como funciona a comunicação com a API do twitter para buscar os tweets por hashtag?

A comunicação ocorre através de um job, que é pela primeira vez assim que o projeto é iniciado, e em seguida, a cada 5 minutos. Sendo assim, ao cadastrar uma nova hashtag, pode levar até 5 minutos para a pesquisa de tweets por hashtag conseguir obter tweets relacionados a ela... </br> </br>

OBSERVAÇÕES ADICIONAIS: </br>

Caso multiplos usuários tenham a mesma hashtag cadastrada, como o exemplo dos usuários larissa e john, onde ambos possuem a hashtag #design cadastrada, ao realizar a busca de tweets por essa hashtag, o retorno deverá ser o mesmo para ambos os usuários. 
</br>
## Sugestão de Testes: </br>
Passo 1: Criar um novo usuário. </br>
Passo 2: Obter o token de autenticação com o novo usuário cadastrado. </br>
Passo 3: Criar uma nova hashtag para o usuário que já exista para outros usuários, como #development, #design ou #pets. </br>
Passo 4: Realizar a busca de tweets pela hashtag cadastrada. Como essa hashtag já estava cadastrada no sistema quando ele iniciou (mesmo sendo para outro usuário), espera-se que a pesquisa retorne resultados instantaneamente. </br>
Passo 5: Criar uma nova hashtag que ainda não exixte para nenhum outro usuário na base de dados, como por exemplo, #love. </br>
Passo 6: Aguardar 5 a 6 minutos e realizar a busca de tweets por essa hashtag. A pesquisa já deverá retornar resultados. </br>
Passo 7: Realizar um novo login com outro usuário, como a Larissa ou John. </br>
Passo 8: Pesquisar tweets pela hashtag cadastrada ao usuário com o mesmo nome da hashtag do passo 4, deverão ser retornados os mesmos resultados. </br>
Passo 9: Ao tentar excluir uma hashtag de outro usuário, ou obter twitter com o Id de uma hashtag de não autorizado, o erro 403 deverá ser retornado. </br>

## Dificuldades: </br>

* Implementação de uma aplicação front-end.
* Login com o Twitter.
* Deploy utilizando Docker. 

## Futuras melhorias identificadas/passos para realizar no projeto:

* Deploy da aplicação.
* Implementar login com o Twitter.
* Implementar um banco de dados. 
* Realizar testes de de integração.
* Ajustar validação das entidades no domínio para que ao lançar exceções ao criar objetos no domínio, seja retornado todos os erros de uma única vez. Como por exemplo: Nome e data inválido.
* Criar base classes para as entidades, repositorys e services.
* Incluir token de cancelamento na busca de tweets por hashtag.
