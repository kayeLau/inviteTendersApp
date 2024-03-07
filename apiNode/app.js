const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
require('./models/create_tabel')
require('./spider/index')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middleware
// const auth = require('./middleware/auth')
const rateLimiter = require('./middleware/rateLimiter')
const helmet = require('helmet')
// app.use(auth)
app.use(helmet())
app.use(rateLimiter)

// router
const bidsRouter = require('./routes/bid')
app.use('/bids',bidsRouter)

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  console.log(err)
  res.status(500);
  res.json(err)
});

module.exports = app;
