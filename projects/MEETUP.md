# CLIENTE MEETUP

O [Meetup](https://www.meetup.com/) é uma rede social de comunidades que incentiva as pessoas a se encontrarem presencialmente.

## CASO DE USO

A comunidade de tecnologia de Joinville está crescendo, e em um meetup a galera teve a ideia de criar um portal para listar todas as comunidades ativas e os próximos eventos da região.

## REQUISITOS

Deve-se criar uma aplicação web onde podemos:

* Os meetups que queremos monitorar devem ser configurados em um arquivo estático;
* Coletar de forma assíncrona os meetups monitorados;
* Mostrar na tela inicial os meetups monitorados usando o padrão de cards ([um exemplo com bootstrap](https://getbootstrap.com/docs/4.3/components/card/)). Os cards devem conter: imagem logo do meetup, nome do meetup, na descrição o título e a data do próximo evento;
* Ao clicar no card do meetup, deve mostrar todos os eventos atuais e passados.

## HISTÓRIAS DE USUÁRIO

1. Visualizar Meetups ativos

> Como usuário, desejo visualizar quais são os meetups ativos da cidade de Joinville e região.

Os dados devem ser coletados de forma assíncrona e salvos em um banco de dados.

2. Visualizar próximos eventos e eventos passados de um Meetup

> Como usuário, quero saber quais serão os próximos eventos e os eventos passados de um Meetup.
