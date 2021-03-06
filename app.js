var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var logger = require('morgan');
var fs = require('fs')
const connectDB =require('./db/connection');
const farmersRoute = require('./routes/farmers');
const customersRoute = require('./routes/customers');
const ordersRoute = require('./routes/orders');
const uploadRoute = require('./routes/upload');

connectDB();
var app = express();

var accessLogStream = fs.createWriteStream(
  path.join(__dirname, '/logs/acess.log'),
  { flags: 'a' }
);

app.use(logger('combined', { stream: accessLogStream }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/farmers', farmersRoute);
app.use('/api/customers', customersRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/upload', uploadRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.json(err.message);
});
//
module.exports = app;
