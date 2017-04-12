const bodyParser = require('body-parser');
const BPromise = require('bluebird');
const cors = require('cors');
const express = require('express');
const glob = require('glob');
const logger = require('morgan');
const mongoose = require('mongoose');
const users = require('./routes/users');
const activities = require('./routes/activities');

const config = require('./config');

mongoose.connect(config.db);
mongoose.Promise = BPromise;
const db = mongoose.connection;
db.on('error', function() {
  throw new Error('Unable to connect to database at ' + config.db);
});

if (process.env.DEBUG) {
  mongoose.set('debug', true);
}

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use('/images', express.static('images'));
app.use(bodyParser.json());

app.use('/users', users);
app.use('/activities', activities);

const routes = glob.sync(config.root + '/routes/*.js');
routes.forEach(function(resource) {
  require(resource)(app);
});

app.get('/', function(req, res, next) {
  res.type('text').send('Hexagon');
});

// 404 Not Found
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  if (err.name == 'ValidationError') {
    res
      .status(err.status || 422)
      .json(err.errors);
  } else {
    console.warn(err);
    res
      .status(err.status || 500)
      .type('text')
      .send(req.app.get('env') == 'development' ? err.stack : err.message);
  }
});

module.exports = app;
