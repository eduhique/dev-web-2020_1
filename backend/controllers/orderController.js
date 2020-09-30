var Order = require('../models/order')
const utility = require('../models/utility')

const orders = Order.orders;

function orderList(list) {
  let result = []
  list.forEach(element => {
    let order = {};
    Object.assign(order, element);
    let aux = Order.report(order);
    result.unshift(aux);
  });
  return result;
}

function orderRomaneioList(list, romaneioId) {
  let result = [];
  list.forEach(element => {
    let order = {};
    Object.assign(order, element);
    let aux = Order.report(order);
    if (element.romaneioId == romaneioId) {
      result.unshift(aux);
    }
  });
  return result;
}

/* CRUD */
exports.getOrderAll = function (req, res) {
  res.json(orderList(orders));
};
exports.createOrder = function (req, res) {
  try {
    let newOrder = new Order(req.body.romaneioId, req.body.clientId, req.body.items, utility.getNextId(orders));
    orders.push(newOrder);
    res.status(201).json(newOrder);
  } catch (err) {
    utility.error(res, 400, err);
  }
  Order.writeOrders(orders);
};
exports.orderUpdate = function (req, res) {
  let indexOfOrder = utility.findIndexOf(orders, req.body.id);
  if (indexOfOrder > -1) {
    try {
      let ordersPut = new Order(req.body.romaneioId, req.body.clientId, req.body.items, req.body.id);
      orders.splice(indexOfOrder, 1, ordersPut);
      res.status(200).json(utility.findById(orders, req.body.id)[0]);
    } catch (err) {
      utility.error(res, 400, err);
    }
  } else {
    utility.error(res, 404, `Id(${req.body.id}) passado não está presente na base.`);
  }
  Order.writeOrders(orders);
};

exports.getOrderForRomaneio = function (req, res) {
  let result = orderRomaneioList(orders, req.params.romaneioId);
  if (result.length !== 0) {
    res.status(200).json(result);
  } else {
    utility.error(res, 404, `RomaneioId(${req.params.romaneioId}) passado não possui pedidos.`)
  }
};

exports.getOrderID = function (req, res) {
  let result = utility.findById(orders, req.params.orderId);
  let order = {};
  if (result.length !== 0) {
    Object.assign(order, result[0]);
    res.status(200).json(Order.report(order));
  } else {
    utility.error(res, 404, `Id(${req.params.orderId}) passado não está presente na base.`)
  }
};

exports.orderDelete = function (req, res) {
  let indexOfOrder = utility.findIndexOf(orders, req.params.orderId);
  if (indexOfOrder > -1) {
    orders.splice(indexOfOrder, 1);
    res.status(204).send();
  } else {
    utility.error(res, 404, `Id(${req.params.orderId}) passado não está presente na base.`);
  }
  Order.writeOrders(orders);
};