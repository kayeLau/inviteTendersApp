const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

// TypeOrm
require("reflect-metadata");
import { initializeDatabase } from './data-source';
const startApp = async () => {
  await initializeDatabase();
};
startApp();

// spider
// require('./spider/index')

// middleware
const auth = require('./middleware/auth')
const rateLimiter = require('./middleware/rateLimiter')
const helmet = require('helmet')
app.use(auth)
app.use(helmet())
app.use(rateLimiter)

// router
const usersRouter = require('./routes/users');
const bidsRouter = require('./routes/bid')
const accountingPlaceRouter = require('./routes/acPlace')
const accountingPlaceMemberRouter = require('./routes/acMember')
const attendance = require('./routes/attendance')
const file = require('./routes/file')


app.use('/users', usersRouter);
app.use('/bids',bidsRouter)
app.use('/accountingPlace',accountingPlaceRouter)
app.use('/accountingPlaceMember',accountingPlaceMemberRouter)
app.use('/attendance',attendance)
app.use('/file',file)

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   console.log(err)
//   res.status(500);
//   res.json(err)
// });

module.exports = app;
