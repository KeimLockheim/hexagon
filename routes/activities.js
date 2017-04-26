"use strict";
const _ = require('lodash');
//const auth = require('../services/auth');
const BPromise = require('bluebird');
const config = require('../config');
const express = require('express');
const router = express.Router();
const Activity = require('../models/activity');
const utils = require('../services/utils');

// module.exports = router;

module.exports = function(app) {
  app.use('/activities', router);
};

router.post('/',
  utils.requireJson,
  createActivity);

router.get('/',
  retrieveAllActivities);

router.get('/:id',
  utils.loaderById(Activity),
  retrieveOneActivity);

router.patch('/:id',
  utils.loaderById(Activity),
  utils.requireJson,
  updateActivity);

// TODO: DELETE /api/users/:id

function createActivity(req, res, next) {
  new Activity(parseActivity(req)).save().then(savedActivity => {
    res
      .status(201)
      .set('Location', `${config.baseUrl}/activities/${savedActivity.id}`)
      .json(savedActivity);
  }).catch(next);
}

function retrieveAllActivities(req, res, next) {
  utils.paginate(filterActivities, '/activities', req, res).then(activities => res.json(activities)).catch(next);
}

function retrieveOneActivity(req, res, next) {
  res.json(req.activity);
}

function updateActivity(req, res, next) {
  _.extend(req.activity, parseActivity(req));
  req.activity.save().then(savedActivity => {
    res.json(savedActivity);
  }).catch(next);
}

function filterActivities(req) {
  let query = Activity.find();

  query = utils.sort(query, req, 'name', [ 'name' ]);

  return {
    filtered: query
  };
}

function parseActivity(req) {
  return _.pick(req.body, 'name', 'done');
}
