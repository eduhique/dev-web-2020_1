var Product = require('../objetos/product')
const ultil = require('../objetos/ultil')
var express = require('express');
var router = express.Router();

const products = Product.products;

/* CRUD */
router.route('/')
  .get(function (req, res) {
    res.json(products);
  })
  .post(function (req, res) {
    try {
      let newProduct = new Product(req.body.name, req.body.unit, ultil.getNextId(products));
      products.push(newProduct);
      res.status(201).json(newProduct);
    } catch (err) {
      ultil.erro(res, 400, err);
    }
    Product.writeproducts(products);
  })
  .put(function (req, res) {
    let indexOfProduct = ultil.findIndexOf(products, req.body.id);
    if (indexOfProduct > -1) {
      try {
        let productsPut = new Product(req.body.name, req.body.unit, req.body.id);
        products.splice(indexOfProduct, 1, productsPut);
        res.status(200).json(ultil.findById(products, req.body.id)[0]);
      } catch (err) {
        ultil.erro(res, 400, err);
      }
    } else {
      ultil.erro(res, 404, `Id(${req.body.id}) passado não está presente na base.`);
    }
    Product.writeproducts(products);
  });

router.get('/search/', function (req, res) {
  let result = Product.findProductsByName(req.query.s, products);
  if (result.length !== 0) {
    res.status(200).json(result);
  } else if (req.query.s === '') {
    res.status(200).json(products);
  } else {
    ultil.erro(res, 404, `query não encontrada.`)
  }
})

router.get('/:productId', function (req, res) {
  let result = ultil.findById(products, req.params.productId);
  if (result.length !== 0) {
    res.status(200).json(result[0]);
  } else {
    ultil.erro(res, 404, `Id(${req.params.productId}) passado não está presente na base.`)
  }
})

router.delete('/:productId', function (req, res) {
  let indexOfProduct = ultil.findIndexOf(products, req.params.productId);
  if (indexOfProduct > -1) {
    products.splice(indexOfProduct, 1);
    res.status(204).send();
  } else {
    ultil.erro(res, 404, `Id(${req.params.productId}) passado não está presente na base.`);
  }
  Product.writeproducts(products);
});


module.exports = router;
