# Romaneio - Gerenciador de pedidos (Backend)

>Significado: O romaneio de carga consiste no documento no qual fica registrado a lista das mercadorias que estão sendo transportadas, ou seja, uma relação dos itens enviados para entrega, com a descrição do que contém em cada volume.

## Iniciar Backend

O backend está acessivél através da seguinte URL: `http://localhost:3000`.Para iniciar o backend basta usar o seguinte comando no terminal dentro da pasta:

```{bash}
$ npm start
```

ou no modo Debug:

```{bash}
$ DEBUG=backend:* npm start
```

## Rotas

Uma breve documentação sobre as rotas do sistema. A API Rest trabalha apenas com `JSON`.

`obs`: A documentação das rotas não totalmente revisada e serve apenas de guia, pois ainda está em desenvolvimento.

### [Controller de Clientes](./routes/clientController.js)

#### [POST] /client/

Cria um novo cliente. Os tipos aceitos são `Varejo` e `Atacado`.

- Parâmetros
``` {json}
{
	"name":"string",
	"type":"string"
}
```

#### [GET] /client/:clientId

Retorna um cliente cadastrado a partir do `clientId` que é o identificador único.

- Parâmetros
> Ex: /client/4

#### [GET] /client/

Retorna todos os clientes cadastrados.

##### filtros avançados

- Filtro `search`
  - parâmetro: `s`;
  - Função: retorna todos os clientes que contém a query inserida;
  - > EX: /client/?s=bra

#### [PUT] /client/

modifica um cliente salvo a partir do id. Os tipos aceitos são `Varejo` e `Atacado`.

- Parâmetros
``` {json}
{
	"id": clientId,
	"name":"string",
	"type":"string"
}
```

#### [DELETE] /client/:client_id

Apaga um cliente cadastrado a partir do `clientId` que é o identificador único.

- Parâmetros
> Ex: /client/4

### [Controller de Produtos](./routes/productController.js)

#### [POST] /product/

Cria um novo produto. As unidades aceitas são `kg`, `cx` e `und`.

- Parâmetros
``` {json}
{
	"name":"string",
	"unit":"string"
}
```

#### [GET] /product/:productId
Retorna um produto cadastrado a partir do `productId` que é o identificador único.

- Parâmetros
> Ex: /product/4

#### [GET] /product/
Retorna uma lista de produtos cadastrados.

##### filtros avançados

- Filtro `search`
  - parâmetro: `s`;
  - Função: retorna todos os produtos que contém a query inserida;
  - > /product/?s=manga

#### [PUT] /product/
modifica um produto salvo a partir do id. As unidades aceitas são `kg`, `cx` e `und`.

- Parâmetros

``` {json}
{
	"id": productId,
	"name":"string",
	"unit":"string"
}
```

#### [DELETE] /product/:productId
Apaga um produto cadastrado a partir do `productId` que é o identificador único.

- Parâmetros
> Ex: /product/4

### [Controller de Pedidos](./routes/orderController.js)

#### [POST] /order/
Cria um novo pedido.

- Parâmetros
``` {json}
{
    "romaneioId": romaneioId,
    "clientId": clientId,
    "items": [
      {
        "productId": productId,
        "quantity": number
      }
    ]
  }
```

#### [GET] /order/:orderId
Retorna um pedido cadastrado a partir do `orderId` que é o identificador único.

- Parâmetros
> Ex: /order/4

#### [GET] /order/romaneio/:romaneioId
Retorna uma lista com todos os pedidos de um determinado `romaneioId`, qque é o identificador único.

- Parâmetros
> Ex: /order/romaneio/4

#### [GET] /order/
Retorna todos os pedidos cadastrados.

- Parâmetros
> nenhum

#### [PUT] /order/
modifica um pedido salvo a partir do id.

``` {json}
{
  "id": orderId,
  "romaneioId": romaneioId,
  "clientId": clientId,
  "items": [
    {
      "productId": productId,
      "quantity": number
    }
  ]
}
```

#### [DELETE] /order/:orderId
Apaga um cliente cadastrado a partir do `orderId` que é o identificador único.

- Parâmetros
> Ex: /order/4


### [Controller de romaneios](./routes/romaneioController.js)

#### [POST] /romaneio/
Cria um novo romaneio. Se o atributo romaneio não for passado ou for uma string vazia, o `tittle` será criado a partir da data passada.

- Parâmetros
``` {json}
{
	"title": "string",
  "date": "YYYY-MM-DD",
  "dateAtual": "YYYY-MM-DD"
}
```

#### [GET] /romaneio/:romaneioId
Retorna um romaneio cadastrado a partir do `romaneioId` que é o identificador único.

- Parâmetros
> Ex: /romaneio/4

#### [GET] /romaneio/
Retorna todos os romaneios cadastrados.

##### filtros avançados

- Filtro `search`
  - parâmetro: `s`;
  - Função: retorna todos os romaneios que contém a query inserida;
  - > /romaneio/?s=quinta

#### [PUT] /romaneio/
modifica um romaneio salvo a partir do id.

``` {json}
{
  "id": romaneioId,
	"title": "string",
  "date": "YYYY-MM-DD",
  "dateAtual": "YYYY-MM-DD"
}
```

#### [DELETE] /romaneio/:romaneioId
Apaga um romaneio cadastrado a partir do `romaneioId` que é o identificador único.

- Parâmetros
> Ex: /client/4


### [Controller de relatórios](./routes/reportController.js)

#### [GET] /report/:romaneioId
Retorna um relatório criado a partir de todos os pedidos de um determinado romananeio passado atraves do `romaneioId`.

- Parâmetros
> Ex: /report/4

#### [GET] /report/product/
Retorna um relatório criado considerando o `romaneioId` e `productId` passado como query.

- Parâmetros

  - `romaneioId`: identificador único do romaneio.
  - `productId`: identificador único do produto.

> /report/product/?romaneioId=1&productId=8

## Armazenamento do Dados provisório

Os arquivos na pasta [dados](./data/) correspondem ao armazenamento e memória utilizado até então. Ele são um conjunto arquivos JSON que não podem ser apagados durante essa fase do desenvolvimento e devem conter um lista vazia ou seguindo o modelo já colocado para testes e desenvoviemento. Sem esses arquivos a aplicação não funcionará. Futuramente isso será melhorado para algo mais concreto e modular.
