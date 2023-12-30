const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
// require('./models/create_tabel')
// require('./spider/index')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// middleware
const auth = require('./middleware/auth')
const rateLimiter = require('./middleware/rateLimiter')
const helmet = require('helmet')
app.use(auth)
app.use(helmet())
app.use(rateLimiter)

// router
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const budsRouter = require('./routes/bud')

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/buds',budsRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
