var Order = require('../objetos/order')
const ultil = require('../objetos/ultil')
var express = require('express');
var router = express.Router();

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
router.route('/')
  .get(function (req, res) {
    res.json(orderList(orders));
  })
  .post(function (req, res) {
    try {
      let newOrder = new Order(req.body.romaneioId, req.body.clientId, req.body.items, ultil.getNextId(orders));
      orders.push(newOrder);
      res.status(201).json(newOrder);
    } catch (err) {
      ultil.erro(res, 400, err);
    }
    Order.writeOrders(orders);
  })
  .put(function (req, res) {
    let indexOfOrder = ultil.findIndexOf(orders, req.body.id);
    if (indexOfOrder > -1) {
      try {
        let ordersPut = new Order(req.body.romaneioId, req.body.clientId, req.body.items, req.body.id);
        orders.splice(indexOfOrder, 1, ordersPut);
        res.status(200).json(ultil.findById(orders, req.body.id)[0]);
      } catch (err) {
        ultil.erro(res, 400, err);
      }
    } else {
      ultil.erro(res, 404, `Id(${req.body.id}) passado não está presente na base.`);
    }
    Order.writeOrders(orders);
  });

router.get('/romaneio/:romaneioId', function (req, res) {
  let result = orderRomaneioList(orders, req.params.romaneioId);
  if (result.length !== 0) {
    res.status(200).json(result);
  } else {
    ultil.erro(res, 404, `RomaneioId(${req.params.romaneioId}) passado não possui pedidos.`)
  }
})

router.get('/:orderId', function (req, res) {
  let result = ultil.findById(orders, req.params.orderId);
  let order = {};
  if (result.length !== 0) {
    Object.assign(order, result[0]);
    res.status(200).json(Order.report(order));
  } else {
    ultil.erro(res, 404, `Id(${req.params.orderId}) passado não está presente na base.`)
  }
})

router.delete('/:orderId', function (req, res) {
  let indexOfOrder = ultil.findIndexOf(orders, req.params.orderId);
  if (indexOfOrder > -1) {
    orders.splice(indexOfOrder, 1);
    res.status(204).send();
  } else {
    ultil.erro(res, 404, `Id(${req.params.orderId}) passado não está presente na base.`);
  }
  Order.writeOrders(orders);
});

module.exports = router;
