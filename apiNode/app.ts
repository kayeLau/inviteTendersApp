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
const user = require('./routes/users');
const bid = require('./routes/bid')
const acPlace = require('./routes/acPlace')
const acMember = require('./routes/acMember')
const acGroup = require('./routes/acGroup')
const material = require('./routes/material')
const attendance = require('./routes/attendance')
const file = require('./routes/file')

app.use('/users', user);
app.use('/bids',bid)
app.use('/acPlace',acPlace)
app.use('/acMember',acMember)
app.use('/acGroup',acGroup)
app.use('/material',material)
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
