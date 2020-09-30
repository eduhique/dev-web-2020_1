var express = require('express');
var router = express.Router();

var product_controller = require('../controllers/productController')

router.route('/')
  .get(product_controller.getProducts)
  .post(product_controller.createProduct)
  .put(product_controller.productUpdate);

router.get('/:productId', product_controller.getProductID)

router.delete('/:productId', product_controller.productDelete);

module.exports = router;
