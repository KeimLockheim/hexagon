const _ = require('lodash');
const BPromise = require('bluebird');
const config = require('../config');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const utils = require('./utils');

exports.authenticate = function(req, res, next) {

  const authorizationHeader = req.get('Authorization');
  if (!authorizationHeader) {
    return next(unauthorizedError('This resource requires authentication: send a bearer token in the Authorization header'));
  }

  const match = authorizationHeader.match(/^Bearer (.+)$/);
  if (!match) {
    return next(unauthorizedError('The Authorization header must be in the format `Authorization: Bearer TOKEN`'));
  }

  jwt.verify(match[1], config.secret, function(err, claims) {
    if (err) {
      if (err.name == 'TokenExpiredError' || err.name == 'JsonWebTokenError') {
        return next(unauthorizedError('Your bearer token has expired or is invalid'));
      } else {
        return next(err);
      }
    }

    utils.findById(User, claims.iss).then(user => {
      if (!user) {
        throw unauthorizedError('Your bearer token has expired or is invalid');
      }

      req.authenticatedUser = user;
      next();
    }).catch(next);
  });
};

exports.authorize = function(predicate) {
  return function(req, res, next) {
    if (!req.authenticatedUser) {
      return res.sendStatus(403);
    } else if (_.isFunction(predicate)) {
      return BPromise.resolve(req).then(predicate).then(authorized => {
        if (!authorized) {
          return res.sendStatus(403);
        }

        next();
      }).catch(next);
    } else if (_.isArray(predicate) || _.isString(predicate)) {
      const roles = _.isArray(predicate) ? predicate : [ predicate ];
      if (_.intersection(roles, req.authenticatedUser.roles).length <= 0) {
        return res.sendStatus(403);
      }

      next();
    } else {
      throw new Error('Invalid authorization predicate');
    }
  };
};

function unauthorizedError(message) {
  const unauthorized = new Error(message);
  unauthorized.status = 401;
  return unauthorized;
}

function forbiddenError(message) {
  const forbidden = new Error(message || '');
  forbidden.status = 403;
  return forbidden;
}
