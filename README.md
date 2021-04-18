# Para executar a aplicação via linha de comando #

> Primeiramente você deve ter o `node` instalado.

Através do terminal execute a linha de comando abaixo:

`$ node routes <input-file.txt>`

# Para executar o back end #

npm start

## As rotas
> O parâmetro `:route` da url utiliza o formato `IATA code` de 3 dígitos. Exemplo: `CGH-SDU`.

* Mostra a rota com melhor preço
** GET: /flights/route/`:route`?input_file=`input-file.txt`

* Cadastra uma nova rota
** POST: /flights/route/`:route`?input_file=`input-file.txt`&price=`99`
 
# Sobre a API Flights
A API utiliza um arquivo no formato txt para armazenar as rotas de voos no seguinte layout:
```
GRU,BRC,10
BRC,SCL,5
GRU,CDG,75
```

# Execução dos testes de rotas e controller

`$ npm run test`

> Utilizei na solução de testes: `chai`, `mocha` e `sinon` para fazer o stub das funções do controller nos testes de rotas.

# Considerações gerais

> Também utilizei `eslint` para garantia do código, juntamente com as regras de estilo do Airbnb.
Nas validações de parâmetros das rotas utilizei o `express-validator/check` juntamente com a criação de um middleware para bloquear requisições com parâmetros errados.