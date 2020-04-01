module.exports.erro = (res, code, msg) => {
    res.status(code).send(msg)
  }