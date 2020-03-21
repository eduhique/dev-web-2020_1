var express = require('express');
var router = express.Router();

const fs = require('fs');
const pedidos = JSON.parse(fs.readFileSync('./dados/pedidos.json'));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(pedidos);
});

module.exports = router;
