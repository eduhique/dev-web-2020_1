var Pedido = require('../objetos/pedido')
const ultil = require('../objetos/ultil')
var express = require('express');
var router = express.Router();

const pedidos = Pedido.pedidos;

function pedidoList(list) {
  let result = []
  list.forEach(element => {
    let pedido = {};
    Object.assign(pedido, element);
    let aux = Pedido.resume(pedido);
    result.unshift(aux);
  });
  return result;
}

function pedidoRomaneioList(list, romaneioId) {
  let result = [];
  list.forEach(element => {
    let pedido = {};
    Object.assign(pedido, element);
    let aux = Pedido.resume(pedido);
    if (element.romaneioId == romaneioId) {
      result.unshift(aux);
    }
  });
  return result;
}

/* CRUD */
router.route('/')
  .get(function (req, res) {
    res.json(pedidoList(pedidos));
  })
  .post(function (req, res) {
    try {
      let newPedido = new Pedido(req.body.romaneioId, req.body.clienteId, req.body.items, ultil.getNextId(pedidos));
      pedidos.push(newPedido);
      console.log(newPedido)
      res.status(201).json(newPedido);
    } catch (err) {
      ultil.erro(res, 400, err);
    }
    Pedido.writepedidos(pedidos);
  })
  .put(function (req, res) {
    let indexOfPedido = ultil.findIndexOf(pedidos, req.body.id);
    if (indexOfPedido > -1) {
      try {
        let pedidosPut = new Pedido(req.body.romaneioId, req.body.clienteId, req.body.items, req.body.id);
        pedidos.splice(indexOfPedido, 1, pedidosPut);
        res.status(200).json(ultil.findById(pedidos, req.body.id)[0]);
      } catch (err) {
        ultil.erro(res, 400, err);
      }
    } else {
      ultil.erro(res, 404, `Id(${req.body.id}) passado não está presente na base.`);
    }
    Pedido.writepedidos(pedidos);
  });

router.get('/romaneio/:romaneioId', function (req, res) {
  let result = pedidoRomaneioList(pedidos, req.params.romaneioId);
  if (result.length !== 0) {
    res.status(200).json(result);
  } else {
    ultil.erro(res, 404, `RomaneioId(${req.params.romaneioId}) passado não possui pedidos.`)
  }
})

router.get('/:pedidoId', function (req, res) {
  let result = ultil.findById(pedidos, req.params.pedidoId);
  let pedido = {};
  if (result.length !== 0) {
    Object.assign(pedido, result[0]);
    res.status(200).json(Pedido.resume(pedido));
  } else {
    ultil.erro(res, 404, `Id(${req.params.pedidoId}) passado não está presente na base.`)
  }
})

router.delete('/:pedidoId', function (req, res) {
  let indexOfPedido = ultil.findIndexOf(pedidos, req.params.pedidoId);
  if (indexOfPedido > -1) {
    pedidos.splice(indexOfPedido, 1);
    res.status(204).send();
  } else {
    ultil.erro(res, 404, `Id(${req.params.pedidoId}) passado não está presente na base.`);
  }
  Pedido.writepedidos(pedidos);
});

module.exports = router;
