const fs = require('fs');
var cliente = require('../objetos/cliente')
var Produto = require('../objetos/produto')
var Romaneio = require('../objetos/romaneio')
const ultil = require('../objetos/ultil')

const produtos = Produto.produtos;

module.exports = class Pedido {
  constructor(romaneioId, clienteId, items, id) {
    if ((romaneioId === null) || (romaneioId === undefined) || isNaN(romaneioId) || ultil.findById(Romaneio.romaneios, romaneioId).length == 0 || ultil.findById(Romaneio.romaneios, romaneioId)[0].id != romaneioId) {
      throw `O romaneio id (${romaneioId}) não é válido, insira um romaneio existente.`
    }
    if ((clienteId === null) || (clienteId === undefined) || isNaN(clienteId) || ultil.findById(cliente.clientes, clienteId).length == 0 || ultil.findById(cliente.clientes, clienteId)[0].id != clienteId) {
      throw `O cliente id (${clienteId}) não é válido, insira um cliente existente.`
    }
    if ((items === null) || (items === undefined) || items.length <= 0) {
      throw `O pedidos deve conter itens.`
    }
    items.forEach(element => {
      let produtoAux = ultil.findById(produtos, element.produtoId);
      if (produtoAux.length <= 0 || produtoAux[0].id != element.produtoId) {
        throw `O produto id (${element.produtoId}) não é válido, insira um produto existente.`
      }
      if ((element.quantidade === undefined || isNaN(element.quantidade)) || element.quantidade <= 0) {
        throw `A quantidade (${element.quantidade}) do item ${produtoAux.nome} não é válida, insira uma quantidade válida.`
      }
    });
    this.id = id;
    this.romaneioId = romaneioId;
    this.clienteId = clienteId;
    this.items = items;
  }
};

module.exports.pedidos = JSON.parse(fs.readFileSync('./dados/pedidos.json')) || [];

module.exports.writepedidos = async pedidos => {
  fs.writeFile('./dados/pedidos.json', JSON.stringify(pedidos), function read(err, data) {
    if (err) {
      throw err;
    }
    pedidos = data;
  });
}