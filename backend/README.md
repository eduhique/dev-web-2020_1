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

Uma breve documentação sobre as rotas do sistema.

`obs`: A documentação das rotas não totalmente revisada e serve apenas de guia, pois ainda está em desenvolvimento.

### [Controller de Clientes](./routes/clienteController.js)

#### [POST] /cliente/

Cria um novo cliente. Os tipos aceitos são `Varejo` e `Atacado`.

- Parâmetros
``` {json}
{
	"nome":"string",
	"tipo":"string"
}
```

#### [GET] /cliente/:clienteId

Retorna um cliente cadastrado a partir do `clienteId` que é o identificador único.

- Parâmetros
> Ex: /cliente/4

#### [GET] /cliente/

Retorna todos os clientes cadastrados.

- Parâmetros
> nenhum

#### [GET] /cliente/search/

Retorna uma lista de clientes correspondente a query requisitada.

- Parâmetros

  - `s`: query de busca

> /cliente/search/?s=mercadinho

#### [PUT] /cliente/

modifica um cliente salvo a partir do id. Os tipos aceitos são `Varejo` e `Atacado`.

- Parâmetros
``` {json}
{
	"id": clienteId,
	"nome":"string",
	"tipo":"string"
}
```

#### [DELETE] /cliente/:cliente_id

Apaga um cliente cadastrado a partir do `clienteId` que é o identificador único.

- Parâmetros
> Ex: /cliente/4

### [Controller de Produtos](./routes/produtoController.js)

#### [POST] /produto/

Cria um novo produto. As unidades aceitas são `kg`, `cx` e `und`.

- Parâmetros
``` {json}
{
	"nome":"string",
	"unidade":"string"
}
```

#### [GET] /produto/:produtoId
Retorna um produto cadastrado a partir do `produtoId` que é o identificador único.

- Parâmetros
> Ex: /produto/4

#### [GET] /produto/
Retorna uma lista de produtos cadastrados.

- Parâmetros
> nenhum

#### [GET] /produto/search/
Retorna uma lista de produtos correspondente a query requisitada.

- Parâmetros

  - `s`: query de busca

> /produto/search/?s=manga

#### [PUT] /produto/
modifica um produto salvo a partir do id. As unidades aceitas são `kg`, `cx` e `und`.

- Parâmetros

``` {json}
{
	"id": produtoId,
	"nome":"string",
	"unidade":"string"
}
```

#### [DELETE] /produto/:produtoId
Apaga um produto cadastrado a partir do `produtoId` que é o identificador único.

- Parâmetros
> Ex: /produto/4

### [Controller de Pedidos](./routes/pedidoController.js)

#### [POST] /pedido/
Cria um novo pedido.

- Parâmetros
``` {json}
{
    "romaneioId": romaneioId,
    "clienteId": clienteId,
    "items": [
      {
        "produtoId": produtoId,
        "quantidade": number
      }
    ]
  }
```

#### [GET] /pedido/:pedidoId
Retorna um pedido cadastrado a partir do `pedidoId` que é o identificador único.

- Parâmetros
> Ex: /pedido/4

#### [GET] /pedido/romaneio/:romaneioId
Retorna uma lista com todos os pedidos de um determinado `romaneioId`, qque é o identificador único.

- Parâmetros
> Ex: /pedido/romaneio/4

#### [GET] /pedido/
Retorna todos os pedidos cadastrados.

- Parâmetros
> nenhum

#### [PUT] /pedido/
modifica um pedido salvo a partir do id.

``` {json}
{
  "id": pedidoId,
  "romaneioId": romaneioId,
  "clienteId": clienteId,
  "items": [
    {
      "produtoId": produtoId,
      "quantidade": number
    }
  ]
}
```

#### [DELETE] /pedido/:pedidoId
Apaga um cliente cadastrado a partir do `pedidoId` que é o identificador único.

- Parâmetros
> Ex: /pedido/4


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

- Parâmetros
> nenhum

#### [GET] /romaneio/search/
Retorna uma lista de romaneios correspondente a query requisitada.

- Parâmetros

  - `s`: query de busca

> /romaneio/search/?s=quinta

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
> Ex: /cliente/4


### [Controller de relatórios](./routes/resumeController.js)

#### [GET] /resume/:romaneioId
Retorna um relatório criado a partir de todos os pedidos de um determinado romananeio passado atraves do `romaneioId`.

- Parâmetros
> Ex: /romaneio/4

#### [GET] /romaneio/product/
Retorna um relatório criado considerando o `romaneioId` e `produtoId` passado como query.

- Parâmetros

  - `romaneioId`: identificador único do romaneio.
  - `produtoId`: identificador único do produto.

> /resume/product/?romaneioId=1&produtoId=8