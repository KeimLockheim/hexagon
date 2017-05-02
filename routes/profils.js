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

/**
 * @api {post} /profils Create a new profil
 * @apiName createProfil
 * @apiGroup Profil
 *
 * @apiSuccess {Number} business Business points of an anonym user
 * @apiSuccess {Number} communication Communication points of an anonym user
 * @apiSuccess {Number} management Management points of an anonym user
 * @apiSuccess {Number} marketing Marketing points of an anonym user
 * @apiSuccess {Number} multimedia Multimedia points of an anonym user
 * @apiSuccess {Number} Programmation programmation points of an anonym user
 */

router.post('/',
  utils.requireJson,
  createProfil);

/**
 * @api {get} /profils Retrieve all profils
 * @apiName retrieveAllProfils
 * @apiGroup Profil
 *
 * @apiSuccess {Number} business Business points of an anonym user
 * @apiSuccess {Number} communication Communication points of an anonym user
 * @apiSuccess {Number} management Management points of an anonym user
 * @apiSuccess {Number} marketing Marketing points of an anonym user
 * @apiSuccess {Number} multimedia Multimedia points of an anonym user
 * @apiSuccess {Number} Programmation programmation points of an anonym user
 */

router.get('/',
  retrieveAllProfils);

/**
 * @api {get} /profils/:id Retrieve a profil matching with id
 * @apiName retrieveOneProfil
 * @apiGroup Profil
 *
 * @apiParam {:id} id Unique identifier of the profil
 *
 * @apiSuccess {Number} business Business points of an anonym user
 * @apiSuccess {Number} communication Communication points of an anonym user
 * @apiSuccess {Number} management Management points of an anonym user
 * @apiSuccess {Number} marketing Marketing points of an anonym user
 * @apiSuccess {Number} multimedia Multimedia points of an anonym user
 * @apiSuccess {Number} Programmation programmation points of an anonym user
 */

router.get('/:id',
  utils.loaderById(Profil),
  retrieveOneProfil);

/**
 * @api {patch} /profils/:id Patch a profil matching with id
 * @apiName updateProfil
 * @apiGroup Profil
 *
 * @apiParam {:id} id Unique identifier of the profil
 *
 * @apiSuccess {Number} business Business points of an anonym user
 * @apiSuccess {Number} communication Communication points of an anonym user
 * @apiSuccess {Number} management Management points of an anonym user
 * @apiSuccess {Number} marketing Marketing points of an anonym user
 * @apiSuccess {Number} multimedia Multimedia points of an anonym user
 * @apiSuccess {Number} Programmation programmation points of an anonym user
 */


router.patch('/:id',
  utils.loaderById(Profil),
  utils.requireJson,
  updateProfil);


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
