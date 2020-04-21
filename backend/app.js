var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var clienteRouter = require('./routes/clienteController');
var pedidoRouter = require('./routes/pedidoController');
var romaneioRouter = require('./routes/romaneioController');
var produtoRouter = require('./routes/produtoController');
var resumeRouter = require('./routes/resumeController')


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/cliente', clienteRouter);
app.use('/pedido', pedidoRouter);
app.use('/romaneio', romaneioRouter);
app.use('/produto', produtoRouter);
app.use('/resume', resumeRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
