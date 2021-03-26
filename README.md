# Ignite

## Node JS

* Arquitetura Event Loop
  * Call Stack: Guarda todas as funções que foram chamadas.
  * 4 threads disponíveis por padrão.
  * Chama as funções de forma assíncrona do Call Stack.

* Single Thread e Assíncrono

* Non-blockind I/O
  * Não é necessário esperar uma função terminar pra iniar outra.

* Gerenciadores de pacotes
  * NPM e Yarn.
  * Instalação de bibliotecas externas.
  * Possibilidade de disponibilizar bibliotecas.

* Frameworks
  * Express
  * Egg.js
  * Nest.js
  * Adonis.js

## API

* Conjunto de funções que determinam como um aplicativo vai se comunicar com outro.

* Necessário uma documentação para desenvolvedor.

* REST
  * Modelo de arquitetura de API
  * 6 regras.
    * Client-Server
    * Stateless
      * O servidor não armazena nenhum estado ou sessão do client.
    
    * Cache
      * Necessário incluir suporte para cache.
    
    * Interface uniforme.
    * Mensagens autodescritivas.
    * HATEOS
      * Retornar links dentro da requisição.
    
    * Criada em camadas.
    * Código sob demanda.

### Métodos de requisições - HTTP verbs

* Get: leitura.
* POST: criação.
* PUT: atualização.
* DELETE: deleção.
* PATCH: atualização parcial.

### HTTP Codes

* 1XX: informativo.
* 2XX: concluído ou criado.
* 3XX: redirecionamento.
* 4XX: erros do cliente.
* 5XX: erros no servidor.

### Parâmetros de requisições

* Header: informações inseridas no cabeçalho.
* Query: informações inseridas no final da requisição.
* Route: rotas onde a requisição é feita.
* Body: informações no corpo da requisição.