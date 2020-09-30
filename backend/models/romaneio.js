const fs = require('fs');
const LIST_PATH = './data/romaneios.json';

module.exports = class Romaneio {
  constructor(title, data, dataAtual, id) {
    if ((data === null) || (data === undefined) || (dataAtual === null) || (dataAtual === undefined)) {
      throw "Insira datas validas."
    }
    let dataAux = new Date(data);

    if (new Date(dataAtual) > dataAux) {
      throw "A data passada é anterior a data atual."
    }

    let newTitle = '';

    if (!title || (title && title.trim() == '')) {
      if (dataAux.getUTCDay() == 0) {
        newTitle = `Domingo (${dataAux.getUTCDate() > 9 ? dataAux.getUTCDate() : `0${dataAux.getUTCDate()}`}/${dataAux.getUTCMonth() > 8 ? dataAux.getUTCMonth() + 1 : `0${dataAux.getUTCMonth() + 1}`}/${dataAux.getUTCFullYear()})`
      }
      if (dataAux.getUTCDay() == 1) {
        newTitle = `Segunda-Feira(${dataAux.getUTCDate() > 9 ? dataAux.getUTCDate() : `0${dataAux.getUTCDate()}`}/${dataAux.getUTCMonth() > 8 ? dataAux.getUTCMonth() + 1 : `0${dataAux.getUTCMonth() + 1}`}/${dataAux.getUTCFullYear()})`
      }
      if (dataAux.getUTCDay() == 2) {
        newTitle = `Terça-Feira(${dataAux.getUTCDate() > 9 ? dataAux.getUTCDate() : `0${dataAux.getUTCDate()}`}/${dataAux.getUTCMonth() > 8 ? dataAux.getUTCMonth() + 1 : `0${dataAux.getUTCMonth() + 1}`}/${dataAux.getUTCFullYear()})`
      }
      if (dataAux.getUTCDay() == 3) {
        newTitle = `Quarta-Feira(${dataAux.getUTCDate() > 9 ? dataAux.getUTCDate() : `0${dataAux.getUTCDate()}`}/${dataAux.getUTCMonth() > 8 ? dataAux.getUTCMonth() + 1 : `0${dataAux.getUTCMonth() + 1}`}/${dataAux.getUTCFullYear()})`
      }
      if (dataAux.getUTCDay() == 4) {
        newTitle = `Quinta-Feira(${dataAux.getUTCDate() > 9 ? dataAux.getUTCDate() : `0${dataAux.getUTCDate()}`}/${dataAux.getUTCMonth() > 8 ? dataAux.getUTCMonth() + 1 : `0${dataAux.getUTCMonth() + 1}`}/${dataAux.getUTCFullYear()})`
      }
      if (dataAux.getUTCDay() == 5) {
        newTitle = `Sexta-Feira(${dataAux.getUTCDate() > 9 ? dataAux.getUTCDate() : `0${dataAux.getUTCDate()}`}/${dataAux.getUTCMonth() > 8 ? dataAux.getUTCMonth() + 1 : `0${dataAux.getUTCMonth() + 1}`}/${dataAux.getUTCFullYear()})`
      }
      if (dataAux.getUTCDay() == 6) {
        newTitle = `Sábado(${dataAux.getUTCDate() > 9 ? dataAux.getUTCDate() : `0${dataAux.getUTCDate()}`}/${dataAux.getUTCMonth() > 8 ? dataAux.getUTCMonth() + 1 : `0${dataAux.getUTCMonth() + 1}`}/${dataAux.getUTCFullYear()})`
      }
      if ((newTitle === null) || (newTitle === undefined) || (newTitle.trim() === '')) {
        throw `O title: ${newTitle} não é válido.`
      }
    } else {
      newTitle = title;
    }

    this.id = id;
    this.title = newTitle;
    this.date = data;
  }
};

module.exports.romaneios = (_ => {
  if (fs.existsSync(LIST_PATH)) {
    return JSON.parse(fs.readFileSync(LIST_PATH));
  } else {
    return [];
  }
})()

module.exports.writeromaneios = async romaneios => {
  fs.writeFile(LIST_PATH, JSON.stringify(romaneios), function read(err, data) {
    if (err) {
      throw err;
    }
  });
}

module.exports.findRomaneioByTitle = (query, romaneios) => {
  let filterForStart = romaneios.filter(obj => {
    if (!((query === null) || (query === undefined) || (query.trim() === ''))) {
      return obj.title.toLowerCase().startsWith(query.toLowerCase());
    } else {
      return false;
    }
  });

  let similar = romaneios.filter(obj => {
    if (!((query === null) || (query === undefined) || (query.trim() === ''))) {
      return obj.title.toLowerCase().indexOf(query.toLowerCase()) > -1;
    } else {
      return false;
    }
  });

  return [...new Set([...filterForStart, ...similar])];
}