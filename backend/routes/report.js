var express = require('express');
var router = express.Router();

var report_controller = require('../controllers/reportController')

router.get('/product/', report_controller.getReportProduct)

router.get('/:romaneioId', report_controller.getReport)

module.exports = router;