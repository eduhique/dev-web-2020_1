var express = require('express');
var router = express.Router();

var client_controller = require('../controllers/clientController')

router.route('/')
  .get(client_controller.getclient)
  .post(client_controller.createclient)
  .put(client_controller.clientUpdate);

router.get('/:clientId', client_controller.getClientID)

router.delete('/:client_id', client_controller.clientDelete);

module.exports = router;
