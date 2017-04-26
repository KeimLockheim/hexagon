"use strict";
const _ = require('lodash');
//const bcrypt = require('bcrypt');
const config = require('../config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var quizzMCSchema = new Schema({
  // changed name to mail
  question: {
    type: String,
    required: true,
    //match: /^[a-z0-9]+$/i,
    //minlength: 3,
    maxlength: 100
  },
  help: {
    type: String,
    required: true,
    maxlength: 200
  },
  response: {
    type: String,
    maxlength: 20
  },
  interest: {
    type: String,
    maxlength: 20
  }/*
  roles: {
    required: true,
    type: [
      {
        type: String,
        enum: [ 'citizen', 'staff' ]
      }
    ]
  }*/
});

quizzMCSchema.set('toJSON', {
  transform: transformJson,
  virtuals: true
});

//userSchema.pre('save', ensureMailLowercase);

/*userSchema.methods.hasRole = function(role) {
  return _.includes(this.roles, role);
};*/

module.exports = mongoose.model('QuizzMC', quizzMCSchema);


function transformJson(doc, json, options) {
  json.id = json._id;
  json.href = `/quizzmcs/${json._id}`;
  delete json._id;
  delete json.__v;
  //delete json.passwordHash;
}
