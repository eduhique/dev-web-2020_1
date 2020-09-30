var client = require('../models/client')
const utility = require('../models/utility')

var clients = client.clients

exports.createclient = function (req, res) {
  try {
    let newClient = new client(req.body.name, req.body.type, utility.getNextId(clients));
    clients.push(newClient);
    res.status(201).json(newClient);
  } catch (err) {
    utility.error(res, 400, err);
  }
  client.writeClients(clients);
};

exports.clientUpdate = function (req, res) {
  let indexOfClient = utility.findIndexOf(clients, req.body.id);
  if (indexOfClient > -1) {
    try {
      let clientPut = new client(req.body.name, req.body.type, req.body.id);
      clients.splice(indexOfClient, 1, clientPut)
      res.status(200).json(utility.findById(clients, req.body.id)[0]);
    } catch (err) {
      utility.error(res, 400, err);
    }
  } else {
    utility.error(res, 404, `Id(${req.body.id}) passado não está presente na base.`);
  }
  client.writeClients(clients)
};

exports.getclient = function (req, res) {
  if (req.query.s !== undefined && req.query.s !== '') {
    let result = client.findClientByName(req.query.s, clients);
    if (result.length !== 0) {
      res.status(200).json(result);
    } else {
      utility.error(res, 404, `query não encontrada.`)
    }
  } else {
    res.status(200).json(clients);
  }
};

exports.getClientID = function (req, res) {
  let result = utility.findById(clients, req.params.clientId);
  if (result.length !== 0) {
    res.status(200).json(result[0]);
  } else {
    utility.error(res, 404, `Id(${req.params.clientId}) passado não está presente na base.`)
  }
};

exports.clientDelete = function (req, res) {
  let indexOfClient = utility.findIndexOf(clients, req.params.client_id);
  if (indexOfClient > -1) {
    clients.splice(indexOfClient, 1);
    res.status(204).send();
  } else {
    utility.error(res, 404, `Id(${req.params.client_id}) passado não está presente na base.`);
  }
  client.writeClients(clients)
};
