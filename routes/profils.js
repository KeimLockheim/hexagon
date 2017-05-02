"use strict";
const _ = require('lodash');
//const auth = require('../services/auth');
const BPromise = require('bluebird');
const config = require('../config');
const express = require('express');
const router = express.Router();
const Profil = require('../models/profil');
const utils = require('../services/utils');

// module.exports = router;

module.exports = function(app) {
  app.use('/profils', router);
};

router.post('/',
  utils.requireJson,
  createProfil);

router.get('/',
  retrieveAllProfils);

router.get('/:id',
  utils.loaderById(Profil),
  retrieveOneProfil);

router.patch('/:id',
  utils.loaderById(Profil),
  utils.requireJson,
  updateProfil);

// TODO: DELETE /api/users/:id

function createProfil(req, res, next) {
  new Profil(parseProfil(req)).save().then(savedProfil => {
    res
      .status(201)
      .set('Location', `${config.baseUrl}/profils/${savedProfil.id}`)
      .json(savedProfil);
  }).catch(next);
}

function retrieveAllProfils(req, res, next) {
  utils.paginate(filterProfils, '/profils', req, res).then(profils => res.json(profils)).catch(next);
}

function retrieveOneProfil(req, res, next) {
  res.json(req.profil);
}


function updateProfil(req, res, next) {
  _.extend(req.profil, parseProfil(req));
  req.profil.save().then(savedProfil => {
    res.json(savedProfil);
  }).catch(next);
}

function filterProfils(req) {
  let query = Profil.find();

  query = utils.sort(query, req, 'business', [ 'business' ]);

  return {
    filtered: query
  };
}

function parseProfil(req) {
  return _.pick(req.body, 'business', 'communication', 'management','marketing','multimedia', 'programmation');
}
