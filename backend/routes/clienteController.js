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
    let indexOfCliente = ultil.findIndexOf(clientes, req.body.id);
    if (indexOfCliente > -1) {
      try {
        let clientePut = new cliente(req.body.nome, req.body.tipo, req.body.id);
        clientes.splice(indexOfCliente, 1, clientePut)
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
  } else if (req.query.s === '') {
    res.status(200).json(clientes);
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
  let indexOfCliente = ultil.findIndexOf(clientes, req.params.cliente_id);
  if (indexOfCliente > -1) {
    clientes.splice(indexOfCliente, 1);
    res.status(204).send();
  } else {
    ultil.erro(res, 404, `Id(${req.params.cliente_id}) passado não está presente na base.`);
  }
  cliente.writeClientes(clientes)
});

module.exports = router;
