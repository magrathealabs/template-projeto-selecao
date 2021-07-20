# RepoTag/Front-end

### Como executar

#### Instalar

- Node.js

#### Execução

Pelo terminal:

$ npm install -g @angular/cli

$ ng serve -o

#### Troubleshooting

ng : File C:\Users\Glaucia\AppData\Roaming\npm\ng.ps1 cannot be loaded because running scripts is
disabled on this system

$ set-ExecutionPolicy RemoteSigned -Scope CurrentUser

### Bibliotecas utilizadas

- Storybook

### Estrutura dos módulos

modulo-x

|__ **state**

|__ **view-models**

|__ **services**

|__ **common**

|____ component-x

|____ component-y

|__ **pages**

|____ page-x

|______ component-a

|____ page-y

|______ component-b

|__ modulo-filho-x

|__ modulo-filho-y

**state:** contém os serviços de gerenciamento de estado;

**view-models:** contém as view models;

**services:** contém os serviços de api e das páginas;

**common:** contém componentes que são usadas em mais de um lugar no módulo;

**pages:** contém as páginas;
