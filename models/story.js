"use strict";
const _ = require('lodash');
const bcrypt = require('bcrypt');
const config = require('../config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    "questions":[{
        "titre":{
            "type":String
          },
          "picture":{
            "type":String
          },
          "idCarte":{
            "type":String
          },
          "estMultiple":{
            "type":Boolean,
            "default":false
          },
          "reponseD":{
            "jumpTo":{
              type:String
            },
            "titre":{
              type:String
            },
            "communication": {
              type: Number
            },
            "marketing": {
              type: Number
            },
            "business": {
              type: Number
            },
            "programmation": {
              type: Number
            },
            "multimedia": {
              type: Number
            },
            "management": {
              type: Number
            },
            "coutTemps": {
              type: Number
            },
            "coutArgent": {
              type: Number
            }
          },
          "reponseG":{
            "jumpTo":{
              type:String
            },
            "titre":{
              type:String
            },
            "communication": {
              type: Number
            },
            "marketing": {
              type: Number
            },
            "business": {
              type: Number
            },
            "programmation": {
              type: Number
            },
            "multimedia": {
              type: Number
            },
            "management": {
              type: Number
            },
            "coutTemps": {
              type: Number
            },
            "coutArgent": {
              type: Number
            }
          }
    }]

  });
    // {
    //   "titre":{
    //     "type":String
    //   },
    //   "picture":{
    //     "type":String
    //   },
    //   "reponseD":{
    //     "type":String
    //   },
    //   "reponseG":{
    //     "type":String
    //   },
    //   "communication": {
    //     type: Number
    //   },
    //   "marketing": {
    //     type: Number
    //   },
    //   "business": {
    //     type: Number
    //   },
    //   "programmation": {
    //     type: Number
    //   },
    //   "multimedia": {
    //     type: Number
    //   },
    //   "management": {
    //     type: Number
    //   },
    //   "coutTemps": {
    //     type: Number
    //   },
    //   "coutUrgent": {
    //     type: Number
    //   }
    // }

storySchema.set('toJSON', {
  transform: transformJson,
  virtuals: true
});

module.exports = mongoose.model('Story', storySchema);

function transformJson(doc, json, options) {
  json.href = `/stories/${json._id}`;
  delete json._id;
  delete json.__v;
}
