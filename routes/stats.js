"use strict";
const _ = require('lodash');
//const auth = require('../services/auth');
const BPromise = require('bluebird');
const config = require('../config');
const express = require('express');
const router = express.Router();
const Stat = require('../models/stat');
const utils = require('../services/utils');

// module.exports = router;

module.exports = function(app) {
  app.use('/stats', router);
};

router.post('/',
  utils.requireJson,
  createStat);

router.get('/',
  retrieveAllStats);

router.get('/:id',
  utils.loaderById(Stat),
  retrieveOneStat);

router.patch('/:id',
  utils.loaderById(Stat),
  utils.requireJson,
  updateStat);

// TODO: DELETE /api/users/:id

function createStat(req, res, next) {
  new Stat(parseStat(req)).save().then(savedStat => {
    res
      .status(201)
      .set('Location', `${config.baseUrl}/stats/${savedStat.id}`)
      .json(savedStat);
  }).catch(next);
}

function retrieveAllStats(req, res, next) {
  utils.paginate(filterStats, '/stats', req, res).then(stats => res.json(stats)).catch(next);
}

function retrieveOneStat(req, res, next) {
  res.json(req.stat);
}

function updateStat(req, res, next) {
  _.extend(req.stat, parseStat(req));
  req.stat.save().then(savedStat => {
    res.json(savedStat);
  }).catch(next);
}

function filterStats(req) {
  let query = Stat.find();

  query = utils.sort(query, req, 'numberOf', [ 'numberOf' ]);

  return {
    filtered: query
  };
}

function parseStat(req) {
  return _.pick(req.body, 'name', 'stars', 'numberOf');
}
