const fs = require('fs');

module.exports = class Romaneio {
  constructor(data, dataAtual, id) {
    if ((data === null) || (data === undefined) || (dataAtual === null) || (dataAtual === undefined)) {
      throw "Insira datas validas."
    }
    let dataAux = new Date(data);

    if (new Date(dataAtual) > dataAux) {
      throw "A data passada é anterior a data atual."
    }

    let newTitle = ''

    if (dataAux.getUTCDay() == 0) {
      newTitle = `Domingo (${dataAux.getUTCDate()}/${dataAux.getUTCMonth()}/${dataAux.getUTCFullYear()})`
    }
    if (dataAux.getUTCDay() == 1) {
      newTitle = `Segunda-Feira (${dataAux.getUTCDate()}/${dataAux.getUTCMonth()}/${dataAux.getUTCFullYear()})`
    }
    if (dataAux.getUTCDay() == 2) {
      newTitle = `Terça-Feira (${dataAux.getUTCDate()}/${dataAux.getUTCMonth()}/${dataAux.getUTCFullYear()})`
    }
    if (dataAux.getUTCDay() == 3) {
      newTitle = `Quarta-Feira (${dataAux.getUTCDate()}/${dataAux.getUTCMonth()}/${dataAux.getUTCFullYear()})`
    }
    if (dataAux.getUTCDay() == 4) {
      newTitle = `Quinta-Feira (${dataAux.getUTCDate()}/${dataAux.getUTCMonth()}/${dataAux.getUTCFullYear()})`
    }
    if (dataAux.getUTCDay() == 5) {
      newTitle = `Sexta-Feira (${dataAux.getUTCDate()}/${dataAux.getUTCMonth()}/${dataAux.getUTCFullYear()})`
    }
    if (dataAux.getUTCDay() == 6) {
      newTitle = `Sábado (${dataAux.getUTCDate()}/${dataAux.getUTCMonth()}/${dataAux.getUTCFullYear()})`
    }
    if ((newTitle === null) || (newTitle === undefined) || (newTitle.trim() === '')) {
      throw `O title: ${newTitle} não é válido.`
    }

    this.id = id;
    this.title = newTitle;
    this.data = data;
  }
};

module.exports.romaneios = JSON.parse(fs.readFileSync('./dados/romaneios.json')) || [];

module.exports.writeromaneios = async romaneios => {
  fs.writeFile('./dados/romaneios.json', JSON.stringify(romaneios), function read(err, data) {
    if (err) {
      throw err;
    }
  });
}

module.exports.findRomaneioByTitle = (query, romaneios) => {
  return romaneios.filter(obj => {
    if (!((query === null) || (query === undefined) || (query.trim() === ''))) {
      return obj.title.toLowerCase().indexOf(query.toLowerCase()) > -1;
    } else {
      return false;
    }
  })
}