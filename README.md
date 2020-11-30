# Romaneio - Gerenciador de pedidos


>Significado: O romaneio de carga consiste no documento no qual fica registrado a lista das mercadorias que estão sendo transportadas, ou seja, uma relação dos itens enviados para entrega, com a descrição do que contém em cada volume.

O Romaneio é uma aplicação de gerenciamento de pedidos voltado para pequenos e médios produtores/comerciantes. Ele permite criar pedidos de entrega com o objetivo de agrupar as informações e facilitar sua produção/compras/controle de estoque.

## Avaliação

Cada aluno deve, individualmente, criar um sistema web focando principalmente no frontend e tendo um backend simples em REST.

O projeto deve ter como características:

- [x] Ser algo que você queira fazer!
- [x] Ser código aberto
- [x] Estar publicado em um repositório git com…
    - [x] arquivo README.md descrevendo o projeto
    - [x] diretório (backend) para o servidor
    - [x] diretório (frontend) para o cliente   
- [x] Usar como base o express-generator e o create-react-app
- [x] Ter, no mínimo, 3 telas, sendo…
    - [x] 1 tela com exibição de itens de uma lista / coleção e um filtro
    - [x] 1 tela com edição / inserção de itens
    - [x] 1 tela a mais a sua escolha
- [x] Ter componentes bastante interativos
- [x] Ter 1 barra de navegação com campos adicionais, incluindo componente de busca

`obs`: Estilização não faz parte da avaliação, mas contém um reset simples de CSS e algums componentes estilizados basicamente para melhorar a visualização.

## Funções da aplicação

### Gerenciamentos de clientes:

Será possivel ver os clientes cadastrados em uma lista, onde cada cliente tem um nome e tipo. O campo tipo especifica o seguimento comercial do cliente, que pode ser varejista ou atacadista. Além disso é possivel editar e apagar um cliente.


### Gerenciamento de Produtos:

Será possivel ver os produtos cadastrados em uma lista que contem o nome do produto e o tipo de unidade. A princípio podem ser usadas três tipos pré definidos, quilo, caixa ou unidade. Além disso é possivel editar e apagar.

### Gerenciamento de Pedidos:

Na tela de gerenciamento de pedido será possivel ver todos os pedidos para um determinado romaneio. Cada pedido possui uma descrição completa dos itens que contem, cliente e quantidades. É possivel também criar um pedido para esse romaneio vinculado a um cliente, onde é adicionado produtos. Além disso é possivel editar e apagar.

### Gerenciamento de romaneios:

será possivel ver os romaneios criados em uma lista. É nescessário vincular um romaneio a uma data. Além disso é possivel editar e apagar.

### Relatório do romaneio:

É possivel visualizar um relatório do romaneio, que irá agrupar os produtos e demonstrar os quantitativos totais. além disso é possivel ver quais clientes pediram um determinado produto.

## Documentação 

- [Backend](./backend/);
- [Frontend](./frontend/).
