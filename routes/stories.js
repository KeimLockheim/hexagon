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
  return _.pick(req.body, 'Language', 'Assets', 'Actors', 'Fields', 'Age',
  'Description', 'Gender', 'IsPlayer', 'Name', 'Picture', 'ID',
  'Conversations', 'DialogNodes', 'ConditionPriority', 'ConditionsString',
  'ConversationID', 'DelaySimStatus', 'FalseConditionAction', 'Actor',
  'Animation Files', 'Audio Files', 'Conversant', 'Dialogue Text', 'Menu Text',
  'Parenthetical', 'Title', 'Video File', 'Communication', 'Marketing',
  'Business', 'Programmation', 'Multimédia', 'Management', 'Coût temps',
  'Coût argent', 'IsGroup', 'IsRoot', 'NodeColor', 'OutgoingLinks',
  'DestinationConvoID', 'DestinationDialogID', 'Filename', 'OriginConvoID',
  'OriginDialogID', 'UserScript', 'Author', 'Version');
}
