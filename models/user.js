"use strict";
const _ = require('lodash');
const bcrypt = require('bcrypt');
const config = require('../config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
  // changed name to mail
  mail: {
    type: String,
    required: true,
    unique: true,
    //match: /^[a-z0-9]+$/i,
    //minlength: 3,
    validate: {
      validator: validateMailAvailable,
      message: '{VALUE} is already taken'
    }
  },
  passwordHash: {
    type: String,
    default: null,
    validate: {
      validator: validatePassword
    }
  },
  age: {
    type: Number,
    required: true
  },
  sex: {
    type: String,
    enum : ['male','female'],
    default: 'male'
    },
  codingDone: {
    type: Boolean,
    default: false
  },
  marketingComDone: {
    type: Boolean,
    default: false
  },
  businessManagementDone: {
    type: Boolean,
    default: false
  },
  multimediaDone: {
    type: Boolean,
    default: false
  }
  /*,
  phone: {
    type: String,
    maxlength: 20
  },
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

userSchema.virtual('password').set(setPassword);

userSchema.set('toJSON', {
  transform: transformJson,
  virtuals: true
});

userSchema.pre('save', ensureMailLowercase);

/*userSchema.methods.hasRole = function(role) {
  return _.includes(this.roles, role);
};*/

module.exports = mongoose.model('User', userSchema);

function setPassword(value) {
  this._password = value;

  if (value) {
    this.passwordHash = bcrypt.hashSync(value, config.bcryptRounds);
  } else {
    this.passwordHash = null;
  }
}

//
function ensureMailLowercase(next) {
  this.mail = this.mail.toLowerCase();
  next();
}

function validatePassword(value) {
  if (!value && !this._password) {
    this.invalidate('password', 'Path `password` is required', null, 'required');
  } else if (this._password && this._password.length < 4) {
    this.invalidate('password', 'Path `password` is shorter than the minimum allowed length (4).', null, 'minlength');
  }

  return true;
}

function validateMailAvailable(value) {
  return this.constructor.findOne({
    _id: {
      $ne: this._id
    },
    name: value ? value.toLowerCase() : value
  }).then(existingUser => !existingUser);
}

function transformJson(doc, json, options) {
  //json.id = json._id;
  json.href = `/users/${json._id}`;
  delete json._id;
  delete json.__v;
  delete json.passwordHash;
}
