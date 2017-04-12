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

router.post('/',
  utils.requireJson,
  createUser);

router.get('/',
  auth.authenticate,
  retrieveAllUsers);

router.get('/:id',
  auth.authenticate,
  utils.loaderById(User),
  retrieveOneUser);

router.patch('/:id',
  auth.authenticate,
  utils.loaderById(User),
  utils.requireJson,
  updateUser);

// TODO: DELETE /api/users/:id

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
  return _.pick(req.body, 'mail', 'password', 'age', 'sex');
}

function scopeNonStaffAccess(req, res, next) {
  if (req.user.id != req.authenticatedUser.id) {
    return next(utils.notFoundError(User, req.user.id));
  }

  next();
}
