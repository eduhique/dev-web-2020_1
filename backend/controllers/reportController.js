var Romaneio = require('../models/romaneio')
var Product = require('../models/product')
var Order = require('../models/order')
var Client = require('../models/client')
const utility = require('../models/utility')

const romaneios = Romaneio.romaneios;
const products = Product.products;
const clients = Client.clients;
const orders = Order.orders;

var report = romaneioId => {
  let romaneio = utility.findById(romaneios, romaneioId);
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
        let product = utility.findById(products, e.productId)[0];
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
          let client = utility.findById(clients, element.clientId);
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

exports.getReportProduct = function (req, res) {
  let romaneio = utility.findById(romaneios, req.query.romaneioId);
  let product = utility.findById(products, req.query.productId);
  try {
    if (romaneio.length == 0 || product.length == 0) {
      throw `RomaneioId(${req.query.romaneioId}) ou productId(${req.query.productId}) não são válidos.`
    }
    res.status(200).json(reportProduct(product[0], romaneio[0]));
  } catch (err) {
    utility.error(res, 400, err);
  }
};

exports.getReport = function (req, res) {
  try {
    res.status(200).json(report(req.params.romaneioId));
  } catch (err) {
    utility.error(res, 400, err);
  }
};
