var client = require('../objetos/client')
const ultil = require('../objetos/ultil')
var express = require('express');
var router = express.Router();

var clients = client.clients

/* CRUD */
router.route('/')
  .get(function (req, res) {
    res.json(clients);
  })
  .post(function (req, res) {
    try {
      let newClient = new client(req.body.name, req.body.type, ultil.getNextId(clients));
      clients.push(newClient);
      res.status(201).json(newClient);
    } catch (err) {
      ultil.erro(res, 400, err);
    }
    client.writeClients(clients);
  })
  .put(function (req, res) {
    let indexOfClient = ultil.findIndexOf(clients, req.body.id);
    if (indexOfClient > -1) {
      try {
        let clientPut = new client(req.body.name, req.body.type, req.body.id);
        clients.splice(indexOfClient, 1, clientPut)
        res.status(200).json(ultil.findById(clients, req.body.id)[0]);
      } catch (err) {
        ultil.erro(res, 400, err);
      }
    } else {
      ultil.erro(res, 404, `Id(${req.body.id}) passado não está presente na base.`);
    }
    client.writeClients(clients)
  });

router.get('/search/', function (req, res) {
  let result = client.findClientByName(req.query.s, clients);
  if (result.length !== 0) {
    res.status(200).json(result);
  } else if (req.query.s === '') {
    res.status(200).json(clients);
  } else {
    ultil.erro(res, 404, `query não encontrada.`)
  }
})

router.get('/:clientId', function (req, res) {
  let result = ultil.findById(clients, req.params.clientId);
  if (result.length !== 0) {
    res.status(200).json(result[0]);
  } else {
    ultil.erro(res, 404, `Id(${clientId} passado não está presente na base.`)
  }
})

router.delete('/:client_id', function (req, res) {
  let indexOfClient = ultil.findIndexOf(clients, req.params.client_id);
  if (indexOfClient > -1) {
    clients.splice(indexOfClient, 1);
    res.status(204).send();
  } else {
    ultil.erro(res, 404, `Id(${req.params.client_id}) passado não está presente na base.`);
  }
  client.writeClients(clients)
});

module.exports = router;
