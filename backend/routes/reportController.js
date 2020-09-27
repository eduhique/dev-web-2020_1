var Romaneio = require('../objetos/romaneio')
var Product = require('../objetos/product')
var Order = require('../objetos/order')
var Client = require('../objetos/client')
const ultil = require('../objetos/ultil')
var express = require('express');
var router = express.Router();

const romaneios = Romaneio.romaneios;
const products = Product.products;
const clients = Client.clients;
const orders = Order.orders;

var report = romaneioId => {
  let romaneio = ultil.findById(romaneios, romaneioId);
  let items = {}
  let result = {};
  if (romaneio.length == 0) {
    throw `RomaneioId(${romaneioId}) inválido.`
  }
  result.romaneio = romaneio[0];
  result.items = []
  orders.forEach(element => {
    if (romaneioId == element.romaneioId) {
      element.items.forEach(e => {
        let product = ultil.findById(products, e.productId)[0];
        if (!(product.id in items)) {
          items[product.id] = {
            "id": product.id,
            "name": product.name,
            "quantity": e.quantity,
            "unit": product.unit
          };
        } else {
          items[product.id].quantity += e.quantity;
        }
        if (product.unit == 'cx') {
          if (!("subCaixas" in result)) {
            result.subCaixas = e.quantity;
          } else {
            result.subCaixas += e.quantity;
          }
        }
        if (product.unit == 'kg') {
          if (!("subQuilos" in result)) {
            result.subQuilos = e.quantity;
          } else {
            result.subQuilos += e.quantity;
          }
        }
        if (product.unit == 'und') {
          if (!("subUnits" in result)) {
            result.subUnits = e.quantity;
          } else {
            result.subUnits += e.quantity;
          }
        }
      });
    }
  });
  Object.entries(items).forEach(element => {
    (result.items).push(element[1]);
  });
  return result
}

var reportProduct = (product, romaneio) => {
  let items = [];
  let result = {};
  result.product = product;
  result.romaneio = romaneio;
  result.total = 0;
  orders.forEach(element => {
    if (romaneio.id == element.romaneioId) {
      element.items.forEach(e => {
        if (product.id == e.productId) {
          result.total += e.quantity;
          let client = ultil.findById(clients, element.clientId);
          items.push({
            "clientId": client.id,
            "client": client[0],
            "quantity": e.quantity
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
  let product = ultil.findById(products, req.query.productId);
  try {
    if (romaneio.length == 0 || product.length == 0) {
      throw `RomaneioId(${req.query.romaneioId}) ou productId(${req.query.productId}) não são válidos.`
    }
    res.status(200).json(reportProduct(product[0], romaneio[0]));
  } catch (err) {
    ultil.erro(res, 400, err);
  }
})

router.get('/:romaneioId', function (req, res) {
  try {
    res.status(200).json(report(req.params.romaneioId));
  } catch (err) {
    ultil.erro(res, 400, err);
  }
})

module.exports = router;
