"use strict";
const _ = require('lodash');
const BPromise = require('bluebird');
const config = require('../config');
const express = require('express');
const router = express.Router();
const Story = require('../models/story');
const utils = require('../services/utils');

module.exports = function(app) {
  app.use('/stories', router);
};

/**
 * @api {post} /stories Create a new statistic/ranking
 * @apiName createStat
 * @apiGroup Stat
 *
 * @apiSuccess {String} name Name of the ranking
 * @apiSuccess {Number} stars Number of stars for this rank
 * @apiSuccess {Number} numberOf Number of times this rank was called
 */

router.post('/',
  utils.requireJson,
  createStory);

router.get('/',
  retrieveAllStories);

router.get('/:id',
  utils.loaderById(Story),
  retrieveOneStory);

router.patch('/:id',
  utils.loaderById(Story),
  utils.requireJson,
  updateStory);

router.delete('/:id',
  utils.loaderById(Story),
  deleteOneStory);

function createStory(req, res, next) {
  new Story(parseStory(req)).save().then(savedStory => {
    res
      .status(201)
      .set('Location', `${config.baseUrl}/stories/${savedStory.id}`)
      .json(savedStory);
  }).catch(next);
}

function retrieveAllStories(req, res, next) {
  utils.paginate(filterStories, '/stories', req, res).then(stories => res.json(stories)).catch(next);
}

function retrieveOneStory(req, res, next) {
  res.json(req.story);
}

function updateStory(req, res, next) {
  _.extend(req.story, parseStory(req));
  req.story.save().then(savedStory => {
    res.json(savedStory);
  }).catch(next);
}

function deleteOneStory(req, res, next) {
  req.story.remove(function(err) {
    if (err) {
      return next(err);
    }

    res.sendStatus(204);
  });
}

function filterStories(req) {
  let query = Story.find();

  query = utils.sort(query, req, 'Description', [ 'Description' ]);

  return {
    filtered: query
  };
}

function parseStory(req) {
  return _.pick(req.body, 'questions', 'titre', 'picture', 'reponseD', 'reponseG',
  'communication', 'marketing', 'business', 'programmation', 'multimedia', 'management',
  'coutTemps', 'coutArgent','idCarte','estMultiple');
}
