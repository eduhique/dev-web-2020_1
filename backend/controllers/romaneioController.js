var Romaneio = require('../models/romaneio')
var order_controller = require('../controllers/orderController')
const utility = require('../models/utility')

const romaneios = Romaneio.romaneios;

exports.createRomaneio = function (req, res) {
  try {
    let newRomaneio = new Romaneio(req.body.title, req.body.date, req.body.dateAtual, utility.getNextId(romaneios));
    romaneios.push(newRomaneio);
    res.status(201).json(newRomaneio);
  } catch (err) {
    utility.error(res, 400, err);
  }
  Romaneio.writeromaneios(romaneios);
};
exports.romaneioUpdate = function (req, res) {
  let indexOfRomaneio = utility.findIndexOf(romaneios, req.body.id);
  if (indexOfRomaneio > -1) {
    try {
      let romaneiosPut = new Romaneio(req.body.title, req.body.date, req.body.dateAtual, req.body.id);
      romaneios.splice(indexOfRomaneio, 1, romaneiosPut);
      res.status(200).json(utility.findById(romaneios, req.body.id)[0]);
    } catch (err) {
      utility.error(res, 400, err);
    }
  } else {
    utility.error(res, 404, `Id(${req.body.id}) passado não está presente na base.`);
  }
  Romaneio.writeromaneios(romaneios);
};

exports.getRomaneios = function (req, res) {
  if (req.query.s !== undefined && req.query.s !== '') {
    let result = Romaneio.findRomaneioByTitle(req.query.s, romaneios);
    if (result.length !== 0) {
      res.status(200).json(result);
    } else {
      utility.error(res, 404, `query não encontrada.`)
    }
  } else {
    res.json(romaneios);
  }
};

exports.getRomaneioID = function (req, res) {
  let result = utility.findById(romaneios, req.params.romaneioId);
  if (result.length !== 0) {
    res.status(200).json(result[0]);
  } else {
    utility.error(res, 404, `Id(${req.params.romaneioId}) passado não está presente na base.`)
  }
};

exports.romaneioDelete = function (req, res) {
  let indexOfRomaneio = utility.findIndexOf(romaneios, req.params.romaneioId);
  if (indexOfRomaneio > -1) {
    romaneios.splice(indexOfRomaneio, 1);
    order_controller.orderDeleteRomanio(req.params.romaneioId);
    res.status(204).send();
  } else {
    utility.error(res, 404, `Id(${req.params.romaneioId}) passado não está presente na base.`);
  }
  Romaneio.writeromaneios(romaneios);
};
