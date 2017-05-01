"use strict";
const _ = require('lodash');
const bcrypt = require('bcrypt');
const config = require('../config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    "Language": {
        type: String,
        maxlength: 20
    },
    "Assets": {
        "Actors": [{
            "Fields": {
                    "Age": {
                        "type": String
                    },
                    "Description": {
                        "type": String
                    },
                    "Gender": {
                        "type": String
                    },
                    "IsPlayer": {
                        "type": String
                    },
                    "Name": {
                        "type": String
                    },
                    "Pictures": {
                        "type": String
                    }
                },
            "ID": {
                type: Number,
                unique: true
            }
        }],
        "Conversations": [{
            "DialogNodes": [{
                "ConditionPriority": {
                    type: Number
                },
                "ConditionsString": {
                    type: String
                },
                "ConversationID": {
                    type: Number
                },
                "DelaySimStatus": {
                    type: Boolean
                },
                "FalseConditionAction": {
                    type: Number
                },
                "Fields": {
                    "Actor": {
                        type: String
                    },
                    "Animation Files": {
                        type: String
                    },
                    "Audio Files": {
                        type: String
                    },
                    "Conversant": {
                        type: String
                    },
                    "Description": {
                        type: String
                    },
                    "Dialogue Text": {
                        type: String
                    },
                    "Menu Text": {
                        type: String
                    },
                    "Parenthetical": {
                        type: String
                    },
                    "Picture": {
                        type: String
                    },
                    "Title": {
                        type: String
                    },
                    "Video File": {
                        type: String
                    },
                    "Communication": {
                        type: String
                    },
                    "Marketing": {
                        type: String
                    },
                    "Business": {
                        type: String
                    },
                    "Programmation": {
                        type: String
                    },
                    "Multimédia": {
                        type: String
                    },
                    "Management": {
                        type: String
                    },
                    "Coût temps": {
                        type: String
                    },
                    "Coût argent": {
                        type: String
                    },
                    "estQuestion": {
                        type: String
                    }
                },
                "ID": {
                    type: Number,
                    unique: true
                },
                "IsGroup": {
                    type: Boolean
                },
                "IsRoot": {
                    type: Boolean
                },
                "NodeColor": {
                    type: Number
                },
                "OutgoingLinks": [{
                    "DestinationConvoID": {
                        type: Number
                    },
                    "DestinationDialogID": {
                        type: Number
                    },
                    "Filename": {
                        type: String
                    },
                    "OriginConvoID": {
                        type: Number
                    },
                    "OriginDialogID": {
                        type: Number
                    }
                }],
                "UserScript": {
                    type: String
                }
            }],
            "Fields": {
                "Actor": {
                    type: String
                },
                "Conversant": {
                    type: String
                },
                "Description": {
                    type: String
                },
                "Pictures": {
                    type: String
                },
                "Title": {
                    type: String
                }
            },
            "ID": {
                type: Number,
                unique: true
            },
            "NodeColor": {
                type: Number
            }
        }]
    },
    "Author": {
        "type": String
    },
    "Description": {
        "type": String
    },
    "Title": {
        "type": String
    },
    "UserScript": {
        "type": String
    },
    "Version": {
        "type": String
    }
});

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
