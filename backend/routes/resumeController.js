var Romaneio = require('../objetos/romaneio')
var Produto = require('../objetos/produto')
var Pedido = require('../objetos/pedido')
var Cliente = require('../objetos/cliente')
const ultil = require('../objetos/ultil')
var express = require('express');
var router = express.Router();

const romaneios = Romaneio.romaneios;
const produtos = Produto.produtos;
const clientes = Cliente.clientes;
const pedidos = Pedido.pedidos;

var resume = romaneioId => {
  let romaneio = ultil.findById(romaneios, romaneioId);
  let items = {}
  let result = {};
  if (romaneio.length == 0) {
    throw `RomaneioId(${romaneioId}) inválido.`
  }
  result.romaneio = romaneio[0];
  result.total = 0;
  result.items = []
  pedidos.forEach(element => {
    if (romaneioId == element.romaneioId) {
      element.items.forEach(e => {
        let produto = ultil.findById(produtos, e.produtoId)[0];
        if (!(produto.id in items)) {
          items[produto.id] = {
            "id": produto.id,
            "nome": produto.nome,
            "quantidade": e.quantidade,
            "unidade": produto.unidade
          };
        } else {
          items[produto.id].quantidade += e.quantidade;
        }
        result.total += e.quantidade;
      });
    }
  });
  Object.entries(items).forEach(element => {
    (result.items).push(element[1]);
  });
  return result
}

var resumeProduct = (produto, romaneio) => {
  let items = [];
  let result = {};
  result.produto = produto;
  result.romaneio = romaneio;
  result.total = 0;
  pedidos.forEach(element => {
    if (romaneio.id == element.romaneioId) {
      element.items.forEach(e => {
        if (produto.id == e.produtoId) {
          result.total += e.quantidade;
          let cliente = ultil.findById(clientes, element.clienteId);
          items.push({
            "clienteId": cliente.id,
            "cliente": cliente[0],
            "quantidade": e.quantidade
          });
        }

      });
    }
  });
  result.items = items;
  return result
}

router.get('/product/', function (req, res) {
  let romaneio = ultil.findById(romaneios, req.query.romaneioId);
  let produto = ultil.findById(produtos, req.query.produtoId);
  try {
    if (romaneio.length == 0 || produto.length == 0) {
      throw `RomaneioId(${req.query.romaneioId}) ou produtoId(${req.query.produtoId}) não são válidos.`
    }
    res.status(200).json(resumeProduct(produto[0], romaneio[0]));
  } catch (err) {
    ultil.erro(res, 400, err);
  }
})

router.get('/:romaneioId', function (req, res) {
  try {
    res.status(200).json(resume(req.params.romaneioId));
  } catch (err) {
    ultil.erro(res, 400, err);
  }
})

module.exports = router;
