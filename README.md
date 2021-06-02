# Projeto Trybe Wallet

Projeto desenvolvido durante o curso de Desenvolvimento Web Full Stack - Trybe, como forma de avaliação dos conhecimentos adquiridos durante o módulo de Front-end.

---

# Habilidades

  * Criar um store Redux em aplicações React

  * Criar reducers no Redux em aplicações React

  * Criar actions no Redux em aplicações React

  * Criar dispatchers no Redux em aplicações React

  * Conectar Redux aos componentes React

  * Criar actions assíncronas na sua aplicação React que faz uso de Redux.

---

## O que foi desenvolvido

Uma carteira de controle de gastos com conversor de moedas.

Ao utilizar essa aplicação um usuário é capaz de:
  - Adicionar, remover e editar um gasto;
  - Visualizar uma tabela com seus gastos;
  - Visualizar o total de gastos convertidos para uma moeda de escolha;

---

## Tecnologias utilizadas

- [React](https://pt-br.reactjs.org/)

- [Redux](https://redux.js.org/)

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

- [Git](https://git-scm.com/)

- [Bootstrap](https://getbootstrap.com/)

---

#### Observações
##### Documentação da API de Cotações de Moedas

A página _web_ do projeto irá consumir os dados da API do _awesomeapi API de Cotações_ para realizar a busca de câmbio de moedas. Para realizar essas buscas, será preciso consultar o seguinte _endpoint_:

- https://economia.awesomeapi.com.br/json/all

O retorno desse endpoint será algo no formato:
```
{
   {
     "USD": {
       "code":"USD",
       "codein":"BRL",
       "name":"Dólar Comercial",
       "high":"5.6689",
       "low":"5.6071",
       "varBid":"-0.0166",
       "pctChange":"-0.29",
       "bid":"5.6173",
       "ask":"5.6183",
       "timestamp":"1601476370",
       "create_date":"2020-09-30 11:32:53"
       },
      ...
   }
}
```

Se você quiser aprender mais informações sobre a API, veja a [documentação](https://docs.awesomeapi.com.br/api-de-moedas).

