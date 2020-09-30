var Product = require('../models/product')
const utility = require('../models/utility')

const products = Product.products;

/* CRUD */
exports.createProduct = function (req, res) {
  try {
    let newProduct = new Product(req.body.name, req.body.unit, utility.getNextId(products));
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    utility.error(res, 400, err);
  }
  Product.writeproducts(products);
};
exports.productUpdate = function (req, res) {
  let indexOfProduct = utility.findIndexOf(products, req.body.id);
  if (indexOfProduct > -1) {
    try {
      let productsPut = new Product(req.body.name, req.body.unit, req.body.id);
      products.splice(indexOfProduct, 1, productsPut);
      res.status(200).json(utility.findById(products, req.body.id)[0]);
    } catch (err) {
      utility.error(res, 400, err);
    }
  } else {
    utility.error(res, 404, `Id(${req.body.id}) passado não está presente na base.`);
  }
  Product.writeproducts(products);
};

exports.getProducts = function (req, res) {
  if (req.query.s !== undefined && req.query.s !== '') {
    let result = Product.findProductsByName(req.query.s, products);
    if (result.length !== 0) {
      res.status(200).json(result);
    } else {
      utility.error(res, 404, `query não encontrada.`)
    }
  } else {
    res.status(200).json(products);
  }
};

exports.getProductID = function (req, res) {
  let result = utility.findById(products, req.params.productId);
  if (result.length !== 0) {
    res.status(200).json(result[0]);
  } else {
    utility.error(res, 404, `Id(${req.params.productId}) passado não está presente na base.`)
  }
};

exports.productDelete = function (req, res) {
  let indexOfProduct = utility.findIndexOf(products, req.params.productId);
  if (indexOfProduct > -1) {
    products.splice(indexOfProduct, 1);
    res.status(204).send();
  } else {
    utility.error(res, 404, `Id(${req.params.productId}) passado não está presente na base.`);
  }
  Product.writeproducts(products);
};
