"use strict";
const bodyParser = require('body-parser');
const BPromise = require('bluebird');
const cors = require('cors');
const express = require('express');
const glob = require('glob');
const logger = require('morgan');
const mongoose = require('mongoose');
const users = require('./routes/users');
const images = require('./routes/imagefile');

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

// Pour pouvoir afficher le fichier pour ajouter des images
app.set('view engine','ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.static('uploads'));

// La limite à 50mb permet d'upload le fichier story json
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// app.use('/users', users);
// app.use('/activities', activities);

const routes = glob.sync(config.root + '/routes/*.js');
routes.forEach(function(resource) {
  require(resource)(app);
});

app.get('/', function(req, res, next) {
  res.type('text').send('Hexagon');
});

// For posting and getting the images diplayed in the app

// To get all the images/files stored in MongoDB
app.get('/images', function(req, res) {
//calling the function from index.js class using routes object..
  images.getImages(function(err, genres) {
    if (err) {
      throw err;
    }
    res.json(genres);
  });
});

// URL : http://localhost:3000/images/(give you collectionID)
// To get the single image/File using id from the MongoDB
app.get('/images/:id', function(req, res) {

//calling the function from index.js class using routes object..
  images.getImageById(req.params.id, function(err, genres) {
    if (err) {
      throw err;
    }
    //console.log(genres);
  //res.download(genres.path);
  var path = genres.path;

  //res.send('<img src ="' + genres.path + '">');
  //res.attachment(genres.path);
  res.send(genres.originalname);
  });
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
