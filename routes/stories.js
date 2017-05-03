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
 * @api {post} /stories Create a new story
 * @apiName createStory
 * @apiGroup Story
 *
 * @apiSuccess {DATA} story One big story
 */

router.post('/',
  utils.requireJson,
  createStory);

/**
 * @api {get} /stories Get all stories
 * @apiName retrieveAllStories
 * @apiGroup Story
 *
 * @apiSuccess {DATA} story One big story
 */

router.get('/',
  retrieveAllStories);

/**
 * @api {get} /stories/:id Get a story by id
 * @apiName retrieveOneStory
 * @apiGroup Story
 *
 * @apiParam {Number} id Unique identifier of the story
 *
 * @apiSuccess {DATA} story One big story
 */

router.get('/:id',
  utils.loaderById(Story),
  retrieveOneStory);

/**
 * @api {patch} /stories/:id Patch a story by id
 * @apiName updateStory
 * @apiGroup Story
 *
 * @apiParam {Number} id Unique identifier of the story
 *
 * @apiSuccess {DATA} story One big story
 */


router.patch('/:id',
  utils.loaderById(Story),
  utils.requireJson,
  updateStory);

/**
 * @api {delete} /stories/:id Delete a story by id
 * @apiName deleteOneStory
 * @apiGroup Story
 *
 * @apiParam {Number} id Unique identifier of the story
 *
 * @apiSuccess {DATA} story One big story
 */

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
