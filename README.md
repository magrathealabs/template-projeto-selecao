<ul>

  <h1>PDF Manager</h1>


  <li>
    <h2>Sobre este projeto</h2>
  
  Esta aplicação se encontra em desenvolvimento e tem o objetivo de englobar módulos que realizam o gerenciamento de arquivos .pdf .<br>
  No momento está implementado o módulo para o upload de arquivos e inserção de marca d'água nas páginas de documentos .pdf.<br>
  Este módulo foi desenvolvido com propósito de aprendizado e como etapa de aplicação para [Magrathea Labs](https://magrathealabs.com/pt-br/) :rocket:
  </li>
  
  <br>
  
  <li>
  <h3> Tecnologias </h3>

  Este projeto está sendo desenvolvido com as seguintes tecnologias:

  <ul>
  <li><a href="https://www.python.org/">Python</a></li>
  <li><a href="https://flask.palletsprojects.com/en/1.1.x/">Flask</a></li>
  <li><a href="https://www.postgresql.org/">Postgresql</a></li>
  </ul>
  </li>
  
  <br>
  
  <li>
   <h3> Principais libs utilizadas: </h3>
   <ul>
      <li><a href="https://flask-sqlalchemy.palletsprojects.com/en/2.x/">Flask-SQLAlchemy </a></li>
      <li><a href="https://marshmallow.readthedocs.io/en/stable/"> marshmallow</a></li>
      <li><a href="https://pypi.org/project/PyPDF2/"> PyPDF2</a></li>

  </ul>
  </li>
  
  <br>
  
  <li>
    <h2>Setup</h2> 
    <ol>
      <li> Primeiro, verifique se você possui <b>Python</b> instalado;</li><br>
      <li> Verifique se possui <b>pip</b> instalado de forma apropriada;</li><br>
      <li> 
        Instale os requerimentos necessários, no diretório "/src" rode o seguinte comando:<br><br>
        * Você pode utilizar um ambiente virtual como virtualenv ou pipenv, se for de tua escolha.
                
        $ pip install -r requirements.txt
   </li>
      <li> Apesar de ter sido utilizado Postgres para o desenvolvimento, gere o banco de dados de sua escolha.</li><br>
      <li> Crie um arquivo .env, conforme o diretório do arquivo .env.example.</li><br>
      <li> Defina as configurações de acordo com seu banco de dados.</li><br>
  </ol>
  </li>
  
  <li>
    <h2>Como rodar</h2> 
    <ol>
      <li> 
        Para rodar a aplicação, no diretório "src", execute o seguinte comando:<br><br>
                
        $ python run.py
   </li>
   <br>
   <li> Uma vez que a aplicação esteja rodando é possível acessar o template renderizado em http://localhost:5000/.</li><br>
   <li> Carregue o arquivo .pdf desejado e clique em OK.<br>
    * O arquivo não deve ser criptografado e/ou bloqueado. </li><br>
   <li> Pronto. Será gerado um respectivo arquivo .pdf com a marca d'água.</li><br>
   <li> É possível testar os endpoints desta aplicação utilizando softwares como: Insomnia ou Postman.</li><br>

  </ol>
  </li>
  
  <li>
    <h2>Próximas features</h2> 
    <ol>
      <li> Gerar migrations do banco de dados </li><br>
      <li> Implementar o processo de marca d'água conforme a página indicada </li><br>
      <li> Testes unitários e de integração </li><br>
      <li> Garbage collector </li><br>
      <li> Desenvolvimento de interface avançada </li><br>
      <li> Outras ações comuns para arquivos .pdf, como: girar páginas, unir páginas, entre outros </li><br>

  </ol>
  </li>
   
  <br>
  
</ul>

<h3>Fique à vontade para contribuir com esse projeto e apresentar novas possibilidades! :octocat:</h3>

