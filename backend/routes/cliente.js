var express = require('express');
var router = express.Router();

const fs = require('fs');
const clientes = JSON.parse(fs.readFileSync('./dados/clientes.json'));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(clientes);
});

module.exports = router;
