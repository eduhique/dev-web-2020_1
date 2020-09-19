var Romaneio = require('../objetos/romaneio')
const ultil = require('../objetos/ultil')
var express = require('express');
var router = express.Router();

const romaneios = Romaneio.romaneios;

/* CRUD */
router.route('/')
  .get(function (req, res) {
    res.json(romaneios);
  })
  .post(function (req, res) {
    try {
      let newRomaneio = new Romaneio(req.body.title, req.body.date, req.body.dateAtual, ultil.getNextId(romaneios));
      romaneios.push(newRomaneio);
      res.status(201).json(newRomaneio);
    } catch (err) {
      ultil.erro(res, 400, err);
    }
    Romaneio.writeromaneios(romaneios);
  })
  .put(function (req, res) {
    let indexOfRomaneio = ultil.findIndexOf(romaneios, req.body.id);
    if (indexOfRomaneio > -1) {
      try {
        let romaneiosPut = new Romaneio(req.body.title, req.body.date, req.body.dateAtual, req.body.id);
        romaneios.splice(indexOfRomaneio, 1, romaneiosPut);
        res.status(200).json(ultil.findById(romaneios, req.body.id)[0]);
      } catch (err) {
        ultil.erro(res, 400, err);
      }
    } else {
      ultil.erro(res, 404, `Id(${req.body.id}) passado não está presente na base.`);
    }
    Romaneio.writeromaneios(romaneios);
  });

router.get('/search/', function (req, res) {
  let result = Romaneio.findRomaneioByTitle(req.query.s, romaneios);
  if (result.length !== 0) {
    res.status(200).json(result);
  } else {
    ultil.erro(res, 404, `query não encontrada.`)
  }
})

router.get('/:romaneioId', function (req, res) {
  let result = ultil.findById(romaneios, req.params.romaneioId);
  if (result.length !== 0) {
    res.status(200).json(result[0]);
  } else {
    ultil.erro(res, 404, `Id(${req.params.romaneioId}) passado não está presente na base.`)
  }
})

router.delete('/:romaneioId', function (req, res) {
  let indexOfRomaneio = ultil.findIndexOf(romaneios, req.params.romaneioId);
  if (indexOfRomaneio > -1) {
    romaneios.splice(indexOfRomaneio, 1);
    res.status(204).send();
  } else {
    ultil.erro(res, 404, `Id(${req.params.romaneioId}) passado não está presente na base.`);
  }
  Romaneio.writeromaneios(romaneios);
});

module.exports = router;
