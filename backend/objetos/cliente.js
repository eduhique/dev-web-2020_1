const fs = require('fs');

module.exports = class Cliente {
    constructor(nome, tipo, id) {
      if((nome === null) || (nome === undefined) || (nome.trim() === '')){
        throw "Insira um nome Válido, que não seja Vazio."
      }
      if((tipo === null) || (tipo === undefined) || !((tipo == 'Loja') || (tipo == 'Grossista'))){
        throw "Só são Aceitos os tipos 'loja' e 'Grossista'."
      }
      this.id = id;
      this.nome = nome;
      this.tipo = tipo;
    }
};

module.exports.clientes = JSON.parse(fs.readFileSync('./dados/clientes.json')) || [];

module.exports.writeClientes = async clientes =>{
  fs.writeFile('./dados/clientes.json', JSON.stringify(clientes),function read(err, data) {
    if (err) {
        throw err;
    }
    clientes = data;
});
}