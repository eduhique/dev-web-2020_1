var express = require('express');
var router = express.Router();

var order_controller = require('../controllers/orderController')

/* CRUD */
router.route('/')
  .get(order_controller.getOrderAll)
  .post(order_controller.createOrder)
  .put(order_controller.orderUpdate);

router.get('/romaneio/:romaneioId', order_controller.getOrderForRomaneio)

router.get('/:orderId', order_controller.getOrderID)

router.delete('/:orderId', order_controller.orderDelete);

module.exports = router;
