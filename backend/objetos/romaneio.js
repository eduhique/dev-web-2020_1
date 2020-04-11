const fs = require('fs');

module.exports = class Romaneio {
  constructor(title, data, dataAtual, id) {
    if ((title === null) || (title === undefined) || (title.trim() === '')) {
      throw "Insira um nome Válido, que não seja Vazio."
    }

    if ((data === null) || (data === undefined) || (dataAtual === null) || (dataAtual === undefined)) {
      throw "Insira datas validas."
    }
    if (new Date(dataAtual) > new Date(data)) {
      throw "A data passada é anterior a data atual."
    }
    this.id = id;
    this.title = title;
    this.data = data;
  }
};

module.exports.romaneios = JSON.parse(fs.readFileSync('./dados/romaneios.json')) || [];

module.exports.writeromaneios = async romaneios => {
  fs.writeFile('./dados/romaneios.json', JSON.stringify(romaneios), function read(err, data) {
    if (err) {
      throw err;
    }
    romaneios = data;
  });
}