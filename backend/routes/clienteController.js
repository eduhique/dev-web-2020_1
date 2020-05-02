var cliente = require('../objetos/cliente')
const ultil = require('../objetos/ultil')
var express = require('express');
var router = express.Router();

var clientes = cliente.clientes

/* CRUD */
router.route('/')
  .get(function (req, res) {
    res.json(clientes);
  })
  .post(function (req, res) {
    try {
      let newCliente = new cliente(req.body.nome, req.body.tipo, ultil.getNextId(clientes));
      clientes.push(newCliente);
      res.status(201).json(newCliente);
    } catch (err) {
      ultil.erro(res, 400, err);
    }
    cliente.writeClientes(clientes);
  })
  .put(function (req, res) {
    if ((req.body.id !== undefined && !isNaN(req.body.id)) && (req.body.id > 0) && (req.body.id <= clientes.length)) {
      try {
        let clientePut = new cliente(req.body.nome, req.body.tipo, req.body.id);
        clientes.splice(req.body.id - 1, 1, clientePut)
        res.status(200).json(ultil.findById(clientes, req.body.id)[0]);
      } catch (err) {
        ultil.erro(res, 400, err);
      }
    } else {
      ultil.erro(res, 404, `Id(${req.body.id}) passado não está presente na base.`);
    }
    cliente.writeClientes(clientes)
  });

router.get('/search/', function (req, res) {
  let result = cliente.findClienteByNome(req.query.s, clientes);
  if (result.length !== 0) {
    res.status(200).json(result);
  } else {
    ultil.erro(res, 404, `query não encontrada.`)
  }
})

router.get('/:clienteId', function (req, res) {
  let result = ultil.findById(clientes, req.params.clienteId);
  if (result.length !== 0) {
    res.status(200).json(result[0]);
  } else {
    ultil.erro(res, 404, `Id(${clienteId} passado não está presente na base.`)
  }
})

router.delete('/:cliente_id', function (req, res) {
  if ((req.params.cliente_id !== undefined && !isNaN(req.params.cliente_id)) && (req.params.cliente_id > 0) && (req.params.cliente_id <= clientes.length)) {
    clientes.splice(req.params.cliente_id - 1, 1);
    res.status(204).send();
  } else {
    ultil.erro(res, 404, `Id(${req.params.cliente_id}) passado não está presente na base.`);
  }
  cliente.writeClientes(clientes)
});

module.exports = router;
