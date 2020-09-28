const fs = require('fs');

module.exports = class Client {
  constructor(name, type, id) {
    if ((name === null) || (name === undefined) || (name.trim() === '')) {
      throw "Insira um nome Válido, que não seja Vazio."
    }
    if ((type === null) || (type === undefined) || !((type == 'Varejo') || (type == 'Atacado'))) {
      throw "Só são Aceitos os tipos 'Varejo' e 'Atacado'."
    }
    this.id = id;
    this.name = name;
    this.type = type;
  }
};

module.exports.clients = JSON.parse(fs.readFileSync('./dados/clients.json')) || [];

module.exports.writeClients = async clients => {
  fs.writeFile('./dados/clients.json', JSON.stringify(clients), function read(err, data) {
    if (err) {
      throw err;
    }
  });
}

module.exports.findClientByName = (query, clients) => {
  let filterForStart = clients.filter(obj => {
    if (!((query === null) || (query === undefined) || (query.trim() === ''))) {
      return obj.name.toLowerCase().startsWith(query.toLowerCase());
    } else {
      return false;
    }
  });

  let similar = clients.filter(obj => {
    if (!((query === null) || (query === undefined) || (query.trim() === ''))) {
      return obj.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    } else {
      return false;
    }
  });

  return [...new Set([...filterForStart, ...similar])];
}