var express = require('express');
var router = express.Router();

var romaneio_controller = require('../controllers/romaneioController')

router.route('/')
  .get(romaneio_controller.getRomaneios)
  .post(romaneio_controller.createRomaneio)
  .put(romaneio_controller.romaneioUpdate);

router.get('/:romaneioId', romaneio_controller.getRomaneioID)

router.delete('/:romaneioId', romaneio_controller.romaneioDelete);

module.exports = router;