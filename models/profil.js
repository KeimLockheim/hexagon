const _ = require('lodash');
//const bcrypt = require('bcrypt');
const config = require('../config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var profilSchema = new Schema({
  // changed name to mail
  title: {
    type: String,
    required: true,
    unique: true,
    //match: /^[a-z0-9]+$/i,
    //minlength: 3,
    maxlength: 25
  },
  description: {
    type: String,
    required: true,
    maxlength: 200
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
