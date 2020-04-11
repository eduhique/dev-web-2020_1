module.exports.erro = (res, code, msg) => res.status(code).send(msg)
module.exports.findById = (list, id) => {
  return list.filter(obj => {
    if ((obj.id !== undefined && !isNaN(obj.id)) && obj.id == id) {
      return true;
    } else {
      return false;
    }
  })
}