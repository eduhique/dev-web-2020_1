const fs = require('fs');

module.exports = class Product {
  constructor(name, unit, id) {
    if ((name === null) || (name === undefined) || (name.trim() === '')) {
      throw "Insira um nome Válido, que não seja Vazio."
    }
    if ((unit === null) || (unit === undefined) || !((unit == 'cx') || (unit == 'kg') || (unit == 'und'))) {
      throw "Só são Aceitos os unidades 'cx', 'kg' e 'und'."
    }
    this.id = id;
    this.name = name;
    this.unit = unit;
  }
};

module.exports.products = JSON.parse(fs.readFileSync('./dados/products.json')) || [];

module.exports.writeproducts = async products => {
  fs.writeFile('./dados/products.json', JSON.stringify(products), function read(err, data) {
    if (err) {
      throw err;
    }
  });
}

module.exports.findProductsByName = (query, products) => {
  let filterForStart = products.filter(obj => {
    if (!((query === null) || (query === undefined) || (query.trim() === ''))) {
      return obj.name.toLowerCase().startsWith(query.toLowerCase());
    } else {
      return false;
    }
  });

  let similar = products.filter(obj => {
    if (!((query === null) || (query === undefined) || (query.trim() === ''))) {
      return obj.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    } else {
      return false;
    }
  });

  return [...new Set([...filterForStart, ...similar])];
}