var express = require('express');
var router = express.Router();

const fs = require('fs');
const romaneios = JSON.parse(fs.readFileSync('./dados/romaneio.json'));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(romaneios);
});

module.exports = router;
