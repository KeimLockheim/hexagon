"use strict";
const _ = require('lodash');
const bcrypt = require('bcrypt');
const config = require('../config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var statSchema = new Schema({

  name: {
    type: String,
    required: true,
    unique: true,
    //match: /^[a-z0-9]+$/i,
    //minlength: 3,
    maxlength: 25
  },
  stars: {
    type: Number,
    default: 3
  },
  numberOf: {
    type: Number,
    default: 0
  }
});

//userSchema.virtual('password').set(setPassword);

statSchema.set('toJSON', {
  transform: transformJson,
  virtuals: true
});

//activitySchema.pre('save');

/*userSchema.methods.hasRole = function(role) {
  return _.includes(this.roles, role);
};*/

module.exports = mongoose.model('Stat', statSchema);


function transformJson(doc, json, options) {
  json.id = json._id;
  json.href = `/api/stats/${json._id}`;
  delete json._id;
  delete json.__v;
  //delete json.passwordHash;
}
