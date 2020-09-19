var Produto = require('../objetos/produto')
const ultil = require('../objetos/ultil')
var express = require('express');
var router = express.Router();

const produtos = Produto.produtos;

/* CRUD */
router.route('/')
  .get(function (req, res) {
    res.json(produtos);
  })
  .post(function (req, res) {
    try {
      let newProduto = new Produto(req.body.nome, req.body.unidade, ultil.getNextId(produtos));
      produtos.push(newProduto);
      res.status(201).json(newProduto);
    } catch (err) {
      ultil.erro(res, 400, err);
    }
    Produto.writeprodutos(produtos);
  })
  .put(function (req, res) {
    let indexOfProduto = ultil.findIndexOf(produtos, req.body.id);
    if (indexOfProduto > -1) {
      try {
        let produtosPut = new Produto(req.body.nome, req.body.unidade, req.body.id);
        produtos.splice(indexOfProduto, 1, produtosPut);
        res.status(200).json(ultil.findById(produtos, req.body.id)[0]);
      } catch (err) {
        ultil.erro(res, 400, err);
      }
    } else {
      ultil.erro(res, 404, `Id(${req.body.id}) passado não está presente na base.`);
    }
    Produto.writeprodutos(produtos);
  });

router.get('/search/', function (req, res) {
  let result = Produto.findProdutosByNome(req.query.s, produtos);
  if (result.length !== 0) {
    res.status(200).json(result);
  } else {
    ultil.erro(res, 404, `query não encontrada.`)
  }
})

router.get('/:produtoId', function (req, res) {
  let result = ultil.findById(produtos, req.params.produtoId);
  if (result.length !== 0) {
    res.status(200).json(result[0]);
  } else {
    ultil.erro(res, 404, `Id(${req.params.produtoId}) passado não está presente na base.`)
  }
})

router.delete('/:produtoId', function (req, res) {
  let indexOfProduto = ultil.findIndexOf(produtos, req.params.produtoId);
  if (indexOfProduto > -1) {
    produtos.splice(indexOfProduto, 1);
    res.status(204).send();
  } else {
    ultil.erro(res, 404, `Id(${req.params.produtoId}) passado não está presente na base.`);
  }
  Produto.writeprodutos(produtos);
});


module.exports = router;
