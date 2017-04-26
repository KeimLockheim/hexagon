"use strict";
const _ = require('lodash');
const bcrypt = require('bcrypt');
const config = require('../config');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const utils = require('../services/utils');

module.exports = function(app) {
  app.use('/auth', router);
};

router.post('/', utils.requireJson, function(req, res, next) {
  if (!_.isString(req.body.mail) || !_.isString(req.body.password) || _.isEmpty(req.body.mail.trim()) || _.isEmpty(req.body.password.trim())) {
    return res.sendStatus(401);
  }

  User.findOne({
    mail: req.body.mail.toLowerCase()
  }).then(user => {
    if (!user) {
      return res.sendStatus(401);
    } else if (!bcrypt.compareSync(req.body.password, user.passwordHash)) {
      return res.sendStatus(401);
    }

    res.json({
      token: generateJwt(user),
      user: user.toJSON()
    });
  }).catch(next);
});

function generateJwt(user) {

  const claims = {
    iss: user.id
  };

  const options = {
    expiresIn: '15d'
  };

  return jwt.sign(claims, config.secret, options);
}
