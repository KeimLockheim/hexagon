"use strict";
const _ = require('lodash');
const auth = require('../services/auth');
const BPromise = require('bluebird');
const config = require('../config');
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const utils = require('../services/utils');

// module.exports = router;

module.exports = function(app) {
  app.use('/users', router);
};

/**
 * @api {post} /users Create a new user
 * @apiName createUser
 * @apiGroup User
 *
 * @apiSuccess {String} mail Mail of the user
 * @apiSuccess {String} password Password of the user
 * @apiSuccess {Number} age Age of the user
 * @apiSuccess {ENUM} sex Sex of the user
 * @apiSuccess {String} href Link for the user
 * @apiSuccess {Number} id of the user
 */

router.post('/',
  utils.requireJson,
  createUser);

/**
 * @api {get} /users Retrieve all users
 * @apiName retrieveAllUsers
 * @apiGroup User
 *
 * @apiSuccess {String} mail Mail of the user
 * @apiSuccess {String} password Password of the user
 * @apiSuccess {Number} age Age of the user
 * @apiSuccess {ENUM} sex Sex of the user
 * @apiSuccess {String} href Link for the user
 * @apiSuccess {Number} id of the user
 */

router.get('/',
  auth.authenticate,
  retrieveAllUsers);

/**
 * @api {get} /users/:id Retrieve a user that fit with the id param
 * @apiName retrieveOneUser
 * @apiGroup User
 *
 * @apiParam {:id} id Unique identifier of the user
 *
 * @apiSuccess {String} mail Mail of the user
 * @apiSuccess {String} password Password of the user
 * @apiSuccess {Number} age Age of the user
 * @apiSuccess {ENUM} sex Sex of the user
 * @apiSuccess {String} href Link for the user
 * @apiSuccess {Number} id of the user
 */

router.get('/:id',
  auth.authenticate,
  utils.loaderById(User),
  retrieveOneUser);

/**
 * @api {patch} /users/:id Patch a user that fit with the id param
 * @apiName retrieveOneUser
 * @apiGroup User
 *
 * @apiParam {:id} id Unique identifier of the user
 *
 * @apiSuccess {String} mail Mail of the user
 * @apiSuccess {String} password Password of the user
 * @apiSuccess {Number} age Age of the user
 * @apiSuccess {ENUM} sex Sex of the user
 * @apiSuccess {String} href Link for the user
 * @apiSuccess {Number} id of the user
 */

router.patch('/:id',
  auth.authenticate,
  utils.loaderById(User),
  utils.requireJson,
  updateUser);

function createUser(req, res, next) {
  new User(parseUser(req)).save().then(savedUser => {
    res
      .status(201)
      .set('Location', `${config.baseUrl}/users/${savedUser.id}`)
      .json(savedUser);
  }).catch(next);
}

function retrieveAllUsers(req, res, next) {
  utils.paginate(filterUsers, '/users', req, res).then(users => res.json(users)).catch(next);
}

function retrieveOneUser(req, res, next) {
  res.json(req.user);
}

function updateUser(req, res, next) {
  _.extend(req.user, parseUser(req));
  req.user.save().then(savedUser => {
    res.json(savedUser);
  }).catch(next);
}

function filterUsers(req) {
  let query = User.find();

  query = utils.sort(query, req, 'mail', [ 'mail' ]);

  return {
    filtered: query
  };
}

function parseUser(req) {
  return _.pick(req.body, 'mail', 'password', 'age', 'sex', 'codingDone', 'marketingComDone', 'businessManagementDone','multimediaDone');
}

function scopeNonStaffAccess(req, res, next) {
  if (req.user.id != req.authenticatedUser.id) {
    return next(utils.notFoundError(User, req.user.id));
  }

  next();
}
