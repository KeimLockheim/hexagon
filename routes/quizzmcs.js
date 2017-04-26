"use strict";
const _ = require('lodash');
//const auth = require('../services/auth');
const BPromise = require('bluebird');
const config = require('../config');
const express = require('express');
const router = express.Router();
const QuizzMC = require('../models/quizzMC');
const utils = require('../services/utils');

// module.exports = router;

module.exports = function(app) {
  app.use('/quizzmcs', router);
};

router.post('/',
  utils.requireJson,
  createQuestion);

router.get('/',
  retrieveAllQuestions);

router.get('/:id',
  utils.loaderById(QuizzMC),
  retrieveOneQuestion);

router.patch('/:id',
  utils.loaderById(QuizzMC),
  utils.requireJson,
  updateQuestion);

// TODO: DELETE /api/users/:id

function createQuestion(req, res, next) {
  new QuizzMC(parseQuestion(req)).save().then(savedQuestion => {
    res
      .status(201)
      .set('Location', `${config.baseUrl}/quizzmcs/${savedQuestion.id}`)
      .json(savedQuestion);
  }).catch(next);
}

function retrieveAllQuestions(req, res, next) {
  utils.paginate(filterQuestions, '/quizzmcs', req, res).then(quizzmcs => res.json(quizzmcs)).catch(next);
}

function retrieveOneQuestion(req, res, next) {
  res.json(req.quizzMC);
}

function updateQuestion(req, res, next) {
  _.extend(req.quizzMC, parseQuestion(req));
  req.quizzMC.save().then(savedQuestion => {
    res.json(savedQuestion);
  }).catch(next);
}

function filterQuestions(req) {
  let query = QuizzMC.find();

  query = utils.sort(query, req, 'question', [ 'question' ]);

  return {
    filtered: query
  };
}

function parseQuestion(req) {
  return _.pick(req.body, 'question','help' ,'response', 'interest');
}
