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
    if ((req.body.id !== undefined && !isNaN(req.body.id)) && (req.body.id > 0) && (req.body.id <= produtos.length)) {
      try {
        let produtosPut = new Produto(req.body.nome, req.body.unidade, req.body.id);
        produtos.splice(req.body.id - 1, 1, produtosPut);
        res.status(200).json(ultil.findById(produtos, req.body.id)[0]);
      } catch (err) {
        ultil.erro(res, 400, err);
      }
    } else {
      ultil.erro(res, 404, `Id(${req.body.id}) passado não está presente na base.`);
    }
    Produto.writeprodutos(produtos);
  });

router.get('/:produtoId', function (req, res) {
  let result = ultil.findById(produtos, req.params.produtoId);
  if (result.length !== 0) {
    res.status(200).json(result[0]);
  } else {
    ultil.erro(res, 404, `Id(${req.params.produtoId}) passado não está presente na base.`)
  }
})

router.get('/search/', function (req, res) {
  let result = Produto.findProdutosByNome(req.query.s);
  if (result.length !== 0) {
    res.status(200).json(result[0]);
  } else {
    ultil.erro(res, 404, `query não encontrada.`)
  }
})

router.delete('/:produtoId', function (req, res) {
  if ((req.params.produtoId !== undefined && !isNaN(req.params.produtoId)) && (req.params.produtoId > 0) && (req.params.produtoId <= produtos.length)) {
    produtos.splice(req.params.produtoId - 1, 1);
    res.status(204).send();
  } else {
    ultil.erro(res, 404, `Id(${req.params.produtoId}) passado não está presente na base.`);
  }
  Produto.writeprodutos(produtos);
});


module.exports = router;
