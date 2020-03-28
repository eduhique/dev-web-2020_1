var cliente = require('../objetos/cliente')
const ultil = require('../objetos/ultil')
var express = require('express');
var router = express.Router();

var clientes = cliente.clientes

/* CRUD */
router.route('/')
  .get(function (req, res) {
    res.json(clientes);
  })
  .post(function (req, res) {
    try{
      let newCliente = new cliente(req.body.nome, req.body.tipo, (clientes.length + 1));
      clientes.push(newCliente);
      res.status(201).json(newCliente);
    }catch(err){
      ultil.erro(res, 400, err);
    }
    cliente.writeClientes(clientes)
  })
  .put(function (req, res) {
    if ((req.body.id !== undefined && !isNaN(req.body.id)) &&(req.body.id > 0) && (req.body.id <= clientes.length)){
      clientes.splice(req.body.id - 1, 1, req.body)
      res.json(findById(req.body.id)[0]);
    }else{
      ultil.erro(res, 400, `Id(${req.body.id}) passado não está presente na base.`);
    }
    cliente.writeClientes(clientes)
  });

router.get('/:cliente_id', function(req, res) {
  let result = findById(req.params.cliente_id);
  if(result.length !== 0){
    res.json(result[0]);
  } else {
    ultil.erro(res, 404, `Id(${req.body.id}) passado não está presente na base.`)
  }
})

router.delete('/:cliente_id',function (req, res) {
  if ((req.params.cliente_id!== undefined && !isNaN(req.params.cliente_id)) && (req.params.cliente_id > 0) && (req.params.cliente_id <= clientes.length)){
    let aux = findById(req.params.cliente_id)[0];
    clientes.splice(req.params.cliente_id- 1, 1);
    res.json(aux);
  }else{
    ultil.erro(res, 400, `Id(${req.params.cliente_id}) passado não está presente na base.`);
  }
  cliente.writeClientes(clientes)
});

findById = clienteId =>{
  return clientes.filter(obj => {
    if ((obj.id !== undefined && !isNaN(obj.id)) && obj.id == clienteId) {
      return true;
    } else{
      return false;
    }
  })
};

module.exports = router;
