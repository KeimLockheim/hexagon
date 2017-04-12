const _ = require('lodash');
const bcrypt = require('bcrypt');
const config = require('../config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var activitySchema = new Schema({

  name: {
    type: String,
    required: true,
    unique: true,
    //match: /^[a-z0-9]+$/i,
    //minlength: 3,
    maxlength: 25
  },
  done: {
    type: Boolean,
    default: false
  }
});

//userSchema.virtual('password').set(setPassword);

activitySchema.set('toJSON', {
  transform: transformJson,
  virtuals: true
});

//activitySchema.pre('save');

/*userSchema.methods.hasRole = function(role) {
  return _.includes(this.roles, role);
};*/

module.exports = mongoose.model('Activity', activitySchema);


function transformJson(doc, json, options) {
  json.id = json._id;
  json.href = `/api/activities/${json._id}`;
  delete json._id;
  delete json.__v;
  //delete json.passwordHash;
}
