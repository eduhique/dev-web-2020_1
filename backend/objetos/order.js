const fs = require('fs');
var client = require('./client')
var Product = require('./product')
var Romaneio = require('./romaneio')
const ultil = require('./ultil')

const products = Product.products;

module.exports = class Order {
  constructor(romaneioId, clientId, items, id) {
    if ((romaneioId === null) || (romaneioId === undefined) || isNaN(romaneioId) || ultil.findById(Romaneio.romaneios, romaneioId).length == 0 || ultil.findById(Romaneio.romaneios, romaneioId)[0].id != romaneioId) {
      throw `O romaneio id (${romaneioId}) não é válido, insira um romaneio existente.`
    }
    if ((clientId === null) || (clientId === undefined) || isNaN(clientId) || ultil.findById(client.clients, clientId).length == 0 || ultil.findById(client.clients, clientId)[0].id != clientId) {
      throw `O cliente id (${clientId}) não é válido, insira um cliente existente.`
    }
    if ((items === null) || (items === undefined) || items.length <= 0) {
      throw `O pedidos deve conter itens.`
    }
    items.forEach(element => {
      let productAux = ultil.findById(products, element.productId);
      if (productAux.length <= 0 || productAux[0].id != element.productId) {
        throw `O produto id (${element.productId}) não é válido, insira um product existente.`
      }
      if ((element.quantity === undefined || isNaN(element.quantity)) || element.quantity < 0) {
        throw `A quantidade (${element.quantity}) do item ${productAux[0].name} não é válida, insira uma quantidade válida.`
      }
    });
    this.id = id;
    this.romaneioId = romaneioId;
    this.clientId = clientId;
    this.items = items;
  }
};

module.exports.orders = JSON.parse(fs.readFileSync('./dados/orders.json')) || [];

module.exports.writeOrders = async orders => {
  fs.writeFile('./dados/orders.json', JSON.stringify(orders), function read(err, data) {
    if (err) {
      throw err;
    }
  });
}

module.exports.report = order => {
  let newItems = [];

  order.items.forEach(element => {
    let product = ultil.findById(products, element.productId)[0];
    if (product.unit == 'cx') {
      if (!("subCaixas" in order)) {
        order.subCaixas = element.quantity;
      } else {
        order.subCaixas += element.quantity;
      }
    }
    if (product.unit == 'kg') {
      if (!("subQuilos" in order)) {
        order.subQuilos = element.quantity;
      } else {
        order.subQuilos += element.quantity;
      }
    }
    if (product.unit == 'und') {
      if (!("subUnits" in order)) {
        order.subUnits = element.quantity;
      } else {
        order.subUnits += element.quantity;
      }
    }
    newItems.push({
      "productId": element.productId,
      "quantity": element.quantity,
      "product": product
    })
  });
  order.client = ultil.findById(client.clients, order.clientId)[0];
  order.romaneio = ultil.findById(Romaneio.romaneios, order.romaneioId)[0];
  order.items = newItems;
  return order;
}