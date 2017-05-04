const _ = require('lodash');
//const bcrypt = require('bcrypt');
const config = require('../config');
"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var profilSchema = new Schema({

  business: {
    type: Number
  },
  communication: {
    type: Number
  },
  management: {
    type: Number
  },
  marketing: {
    type: Number
  },
  multimedia: {
    type: Number
  },
  programmation: {
    type: Number
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

profilSchema.set('toJSON', {
  transform: transformJson,
  virtuals: true
});

//userSchema.pre('save', ensureMailLowercase);

/*userSchema.methods.hasRole = function(role) {
  return _.includes(this.roles, role);
};*/

module.exports = mongoose.model('Profil', profilSchema);


function transformJson(doc, json, options) {
  //json.id = json._id;
  json.href = `/profils/${json._id}`;
  delete json._id;
  delete json.__v;
  //delete json.passwordHash;
}
