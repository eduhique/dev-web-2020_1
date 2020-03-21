var express = require('express');
var router = express.Router();

const fs = require('fs');
const produto = JSON.parse(fs.readFileSync('./dados/produtos.json'));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(produto);
});

module.exports = router;
