var Pedido = require('../objetos/pedido')
const ultil = require('../objetos/ultil')
var express = require('express');
var router = express.Router();

const pedidos = Pedido.pedidos;

/* CRUD */
router.route('/')
  .get(function (req, res) {
    res.json(pedidos);
  })
  .post(function (req, res) {
    try {
      let newPedido = new Pedido(req.body.romaneioId, req.body.clienteId, req.body.items, ultil.getNextId(pedidos));
      pedidos.push(newPedido);
      res.status(201).json(newPedido);
    } catch (err) {
      ultil.erro(res, 400, err);
    }
    Pedido.writepedidos(pedidos);
  })
  .put(function (req, res) {
    if ((req.body.id !== undefined && !isNaN(req.body.id)) && (req.body.id > 0) && (req.body.id <= pedidos.length)) {
      try {
        let pedidosPut = new Pedido(req.body.romaneioId, req.body.clienteId, req.body.items, req.body.id);
        pedidos.splice(req.body.id - 1, 1, pedidosPut);
        res.status(200).json(ultil.findById(pedidos, req.body.id)[0]);
      } catch (err) {
        ultil.erro(res, 400, err);
      }
    } else {
      ultil.erro(res, 404, `Id(${req.body.id}) passado não está presente na base.`);
    }
    Pedido.writepedidos(pedidos);
  });

router.get('/:pedidoId', function (req, res) {
  let result = ultil.findById(pedidos, req.params.pedidoId);
  if (result.length !== 0) {
    res.status(200).json(result[0]);
  } else {
    ultil.erro(res, 404, `Id(${req.params.pedidoId}) passado não está presente na base.`)
  }
})

router.delete('/:pedidoId', function (req, res) {
  if ((req.params.pedidoId !== undefined && !isNaN(req.params.pedidoId)) && (req.params.pedidoId > 0) && (req.params.pedidoId <= pedidos.length)) {
    pedidos.splice(req.params.pedidoId - 1, 1);
    res.status(204).send();
  } else {
    ultil.erro(res, 404, `Id(${req.params.pedidoId}) passado não está presente na base.`);
  }
  Pedido.writepedidos(pedidos);
});

module.exports = router;
