const _ = require('lodash');
const bcrypt = require('bcrypt');
const config = require('../config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var storySchema = new Schema({

  "definitions": {},
  "properties": {
      "Assets": {
          //"id": "/properties/Assets",
          "properties": {
              "Actors": {
                  "id": { type: Number, unique: true },
                  "items": {
                      "id": "/properties/Assets/properties/Actors/items",
                      "properties": {
                          "Fields": {
                              //"id": "/properties/Assets/properties/Actors/items/properties/Fields",
                              "properties": {

                                  "Age": {
                                      "type": Number
                                  },
                                  "Description": {
                                      "type": String
                                  },
                                  "Gender": {
                                      "type": String
                                  },
                                  "IsPlayer": {
                                      "id": "/properties/Assets/properties/Actors/items/properties/Fields/properties/IsPlayer",
                                      "type": "string"
                                  },
                                  "Name": {
                                      "type": String
                                  },
                                  "Pictures": {
                                      "type": String
                                  }
                              },
                              "type": "object"
                          },
                          "ID": {
                              "id": "/properties/Assets/properties/Actors/items/properties/ID",
                              "type": "integer"
                          }
                      },
                      "type": "object"
                  },
                  "type": "array"
              },
              "Conversations": {
                  "id": "/properties/Assets/properties/Conversations",
                  "items": {
                      "id": "/properties/Assets/properties/Conversations/items",
                      "properties": {
                          "DialogNodes": {
                              "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes",
                              "items": {
                                  "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items",
                                  "properties": {
                                      "ConditionPriority": {
                                          "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/ConditionPriority",
                                          "type": "integer"
                                      },
                                      "ConditionsString": {
                                          "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/ConditionsString",
                                          "type": "string"
                                      },
                                      "ConversationID": {
                                          "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/ConversationID",
                                          "type": "integer"
                                      },
                                      "DelaySimStatus": {
                                          "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/DelaySimStatus",
                                          "type": "boolean"
                                      },
                                      "FalseConditionAction": {
                                          "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/FalseConditionAction",
                                          "type": "integer"
                                      },
                                      "Fields": {
                                          "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/Fields",
                                          "properties": {
                                              "Actor": {
                                                  "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/Fields/properties/Actor",
                                                  "type": "string"
                                              },
                                              "Animation Files": {
                                                  "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/Fields/properties/Animation Files",
                                                  "type": "string"
                                              },
                                              "Audio Files": {
                                                  "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/Fields/properties/Audio Files",
                                                  "type": "string"
                                              },
                                              "Conversant": {
                                                  "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/Fields/properties/Conversant",
                                                  "type": "string"
                                              },
                                              "Description": {
                                                  "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/Fields/properties/Description",
                                                  "type": "string"
                                              },
                                              "Dialogue Text": {
                                                  "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/Fields/properties/Dialogue Text",
                                                  "type": "string"
                                              },
                                              "Menu Text": {
                                                  "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/Fields/properties/Menu Text",
                                                  "type": "string"
                                              },
                                              "Parenthetical": {
                                                  "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/Fields/properties/Parenthetical",
                                                  "type": "string"
                                              },
                                              "Pictures": {
                                                  "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/Fields/properties/Pictures",
                                                  "type": "string"
                                              },
                                              "Title": {
                                                  "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/Fields/properties/Title",
                                                  "type": "string"
                                              },
                                              "Video File": {
                                                  "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/Fields/properties/Video File",
                                                  "type": "string"
                                              }
                                          },
                                          "type": "object"
                                      },
                                      "ID": {
                                          "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/ID",
                                          "type": "integer"
                                      },
                                      "IsGroup": {
                                          "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/IsGroup",
                                          "type": "boolean"
                                      },
                                      "IsRoot": {
                                          "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/IsRoot",
                                          "type": "boolean"
                                      },
                                      "NodeColor": {
                                          "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/NodeColor",
                                          "type": "integer"
                                      },
                                      "OutgoingLinks": {
                                          "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/OutgoingLinks",
                                          "items": {
                                              "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/OutgoingLinks/items",
                                              "properties": {
                                                  "DestinationConvoID": {
                                                      "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/OutgoingLinks/items/properties/DestinationConvoID",
                                                      "type": "integer"
                                                  },
                                                  "DestinationDialogID": {
                                                      "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/OutgoingLinks/items/properties/DestinationDialogID",
                                                      "type": "integer"
                                                  },
                                                  "Filename": {
                                                      "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/OutgoingLinks/items/properties/Filename",
                                                      "type": "null"
                                                  },
                                                  "OriginConvoID": {
                                                      "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/OutgoingLinks/items/properties/OriginConvoID",
                                                      "type": "integer"
                                                  },
                                                  "OriginDialogID": {
                                                      "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/OutgoingLinks/items/properties/OriginDialogID",
                                                      "type": "integer"
                                                  }
                                              },
                                              "type": "object"
                                          },
                                          "type": "array"
                                      },
                                      "UserScript": {
                                          "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/UserScript",
                                          "type": "string"
                                      }
                                  },
                                  "type": "object"
                              },
                              "type": "array"
                          },
                          "Fields": {
                              "id": "/properties/Assets/properties/Conversations/items/properties/Fields",
                              "properties": {
                                  "Act": {
                                      "id": "/properties/Assets/properties/Conversations/items/properties/Fields/properties/Act",
                                      "type": "string"
                                  },
                                  "Actor": {
                                      "id": "/properties/Assets/properties/Conversations/items/properties/Fields/properties/Actor",
                                      "type": "string"
                                  },
                                  "Chapter": {
                                      "id": "/properties/Assets/properties/Conversations/items/properties/Fields/properties/Chapter",
                                      "type": "string"
                                  },
                                  "Conversant": {
                                      "id": "/properties/Assets/properties/Conversations/items/properties/Fields/properties/Conversant",
                                      "type": "string"
                                  },
                                  "Description": {
                                      "id": "/properties/Assets/properties/Conversations/items/properties/Fields/properties/Description",
                                      "type": "string"
                                  },
                                  "Level": {
                                      "id": "/properties/Assets/properties/Conversations/items/properties/Fields/properties/Level",
                                      "type": "string"
                                  },
                                  "Mood": {
                                      "id": "/properties/Assets/properties/Conversations/items/properties/Fields/properties/Mood",
                                      "type": "string"
                                  },
                                  "Pictures": {
                                      "id": "/properties/Assets/properties/Conversations/items/properties/Fields/properties/Pictures",
                                      "type": "string"
                                  },
                                  "Primary Location": {
                                      "id": "/properties/Assets/properties/Conversations/items/properties/Fields/properties/Primary Location",
                                      "type": "string"
                                  },
                                  "Scene": {
                                      "id": "/properties/Assets/properties/Conversations/items/properties/Fields/properties/Scene",
                                      "type": "string"
                                  },
                                  "Title": {
                                      "id": "/properties/Assets/properties/Conversations/items/properties/Fields/properties/Title",
                                      "type": "string"
                                  }
                              },
                              "type": "object"
                          },
                          "ID": {
                              "id": "/properties/Assets/properties/Conversations/items/properties/ID",
                              "type": "integer"
                          },
                          "NodeColor": {
                              "id": "/properties/Assets/properties/Conversations/items/properties/NodeColor",
                              "type": "integer"
                          }
                      },
                      "type": "object"
                  },
                  "type": "array"
              },
              "Items": {
                  "id": "/properties/Assets/properties/Items",
                  "items": {
                      "id": "/properties/Assets/properties/Items/items",
                      "properties": {
                          "Fields": {
                              "id": "/properties/Assets/properties/Items/items/properties/Fields",
                              "properties": {
                                  "Associated With": {
                                      "id": "/properties/Assets/properties/Items/items/properties/Fields/properties/Associated With",
                                      "type": "string"
                                  },
                                  "Combines With": {
                                      "id": "/properties/Assets/properties/Items/items/properties/Fields/properties/Combines With",
                                      "type": "string"
                                  },
                                  "Condition": {
                                      "id": "/properties/Assets/properties/Items/items/properties/Fields/properties/Condition",
                                      "type": "string"
                                  },
                                  "Description": {
                                      "id": "/properties/Assets/properties/Items/items/properties/Fields/properties/Description",
                                      "type": "string"
                                  },
                                  "Effect": {
                                      "id": "/properties/Assets/properties/Items/items/properties/Fields/properties/Effect",
                                      "type": "string"
                                  },
                                  "Model Files": {
                                      "id": "/properties/Assets/properties/Items/items/properties/Fields/properties/Model Files",
                                      "type": "string"
                                  },
                                  "Name": {
                                      "id": "/properties/Assets/properties/Items/items/properties/Fields/properties/Name",
                                      "type": "string"
                                  },
                                  "Pictures": {
                                      "id": "/properties/Assets/properties/Items/items/properties/Fields/properties/Pictures",
                                      "type": "string"
                                  },
                                  "Primary Location": {
                                      "id": "/properties/Assets/properties/Items/items/properties/Fields/properties/Primary Location",
                                      "type": "string"
                                  },
                                  "Purpose": {
                                      "id": "/properties/Assets/properties/Items/items/properties/Fields/properties/Purpose",
                                      "type": "string"
                                  },
                                  "Texture Files": {
                                      "id": "/properties/Assets/properties/Items/items/properties/Fields/properties/Texture Files",
                                      "type": "string"
                                  }
                              },
                              "type": "object"
                          },
                          "ID": {
                              "id": "/properties/Assets/properties/Items/items/properties/ID",
                              "type": "integer"
                          }
                      },
                      "type": "object"
                  },
                  "type": "array"
              },
              "Locations": {
                  "id": "/properties/Assets/properties/Locations",
                  "items": {
                      "id": "/properties/Assets/properties/Locations/items",
                      "properties": {
                          "Fields": {
                              "id": "/properties/Assets/properties/Locations/items/properties/Fields",
                              "properties": {
                                  "Act": {
                                      "id": "/properties/Assets/properties/Locations/items/properties/Fields/properties/Act",
                                      "type": "string"
                                  },
                                  "Chapter": {
                                      "id": "/properties/Assets/properties/Locations/items/properties/Fields/properties/Chapter",
                                      "type": "string"
                                  },
                                  "Climate": {
                                      "id": "/properties/Assets/properties/Locations/items/properties/Fields/properties/Climate",
                                      "type": "string"
                                  },
                                  "Description": {
                                      "id": "/properties/Assets/properties/Locations/items/properties/Fields/properties/Description",
                                      "type": "string"
                                  },
                                  "Level": {
                                      "id": "/properties/Assets/properties/Locations/items/properties/Fields/properties/Level",
                                      "type": "string"
                                  },
                                  "Model Files": {
                                      "id": "/properties/Assets/properties/Locations/items/properties/Fields/properties/Model Files",
                                      "type": "string"
                                  },
                                  "Mood": {
                                      "id": "/properties/Assets/properties/Locations/items/properties/Fields/properties/Mood",
                                      "type": "string"
                                  },
                                  "Name": {
                                      "id": "/properties/Assets/properties/Locations/items/properties/Fields/properties/Name",
                                      "type": "string"
                                  },
                                  "Pictures": {
                                      "id": "/properties/Assets/properties/Locations/items/properties/Fields/properties/Pictures",
                                      "type": "string"
                                  },
                                  "Purpose": {
                                      "id": "/properties/Assets/properties/Locations/items/properties/Fields/properties/Purpose",
                                      "type": "string"
                                  },
                                  "Scene": {
                                      "id": "/properties/Assets/properties/Locations/items/properties/Fields/properties/Scene",
                                      "type": "string"
                                  },
                                  "Texture Files": {
                                      "id": "/properties/Assets/properties/Locations/items/properties/Fields/properties/Texture Files",
                                      "type": "string"
                                  }
                              },
                              "type": "object"
                          },
                          "ID": {
                              "id": "/properties/Assets/properties/Locations/items/properties/ID",
                              "type": "integer"
                          }
                      },
                      "type": "object"
                  },
                  "type": "array"
              },
              "UserVariables": {
                  "id": "/properties/Assets/properties/UserVariables",
                  "items": {},
                  "type": "array"
              }
          },
          "type": "object"
      },
      "Author": {
          "id": "/properties/Author",
          "type": "string"
      },
      "Description": {
          "id": "/properties/Description",
          "type": "string"
      },
      "Language": {
          "id": "/properties/Language",
          "type": "string"
      },
      "Title": {
          "id": "/properties/Title",
          "type": "string"
      },
      "UserScript": {
          "id": "/properties/UserScript",
          "type": "null"
      },
      "Version": {
          "id": "/properties/Version",
          "type": "string"
      }
  },
  "type": "object"

/*
  {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "definitions": {},
      "id": "http://example.com/example.json",
      "properties": {
          "Assets": {
              "id": "/properties/Assets",
              "properties": {
                  "Actors": {
                      "id": "/properties/Assets/properties/Actors",
                      "items": {
                          "id": "/properties/Assets/properties/Actors/items",
                          "properties": {
                              "Fields": {
                                  "id": "/properties/Assets/properties/Actors/items/properties/Fields",
                                  "properties": {
                                      "Ability": {
                                          "id": "/properties/Assets/properties/Actors/items/properties/Fields/properties/Ability",
                                          "type": "string"
                                      },
                                      "Age": {
                                          "id": "/properties/Assets/properties/Actors/items/properties/Fields/properties/Age",
                                          "type": "string"
                                      },
                                      "Class": {
                                          "id": "/properties/Assets/properties/Actors/items/properties/Fields/properties/Class",
                                          "type": "string"
                                      },
                                      "Description": {
                                          "id": "/properties/Assets/properties/Actors/items/properties/Fields/properties/Description",
                                          "type": "string"
                                      },
                                      "Faction": {
                                          "id": "/properties/Assets/properties/Actors/items/properties/Fields/properties/Faction",
                                          "type": "string"
                                      },
                                      "Gender": {
                                          "id": "/properties/Assets/properties/Actors/items/properties/Fields/properties/Gender",
                                          "type": "string"
                                      },
                                      "Hometown": {
                                          "id": "/properties/Assets/properties/Actors/items/properties/Fields/properties/Hometown",
                                          "type": "string"
                                      },
                                      "IsPlayer": {
                                          "id": "/properties/Assets/properties/Actors/items/properties/Fields/properties/IsPlayer",
                                          "type": "string"
                                      },
                                      "Model Files": {
                                          "id": "/properties/Assets/properties/Actors/items/properties/Fields/properties/Model Files",
                                          "type": "string"
                                      },
                                      "Name": {
                                          "id": "/properties/Assets/properties/Actors/items/properties/Fields/properties/Name",
                                          "type": "string"
                                      },
                                      "Pictures": {
                                          "id": "/properties/Assets/properties/Actors/items/properties/Fields/properties/Pictures",
                                          "type": "string"
                                      },
                                      "Primary Race": {
                                          "id": "/properties/Assets/properties/Actors/items/properties/Fields/properties/Primary Race",
                                          "type": "string"
                                      },
                                      "Rank": {
                                          "id": "/properties/Assets/properties/Actors/items/properties/Fields/properties/Rank",
                                          "type": "string"
                                      },
                                      "Secondary Race": {
                                          "id": "/properties/Assets/properties/Actors/items/properties/Fields/properties/Secondary Race",
                                          "type": "string"
                                      },
                                      "Subclass": {
                                          "id": "/properties/Assets/properties/Actors/items/properties/Fields/properties/Subclass",
                                          "type": "string"
                                      },
                                      "Texture Files": {
                                          "id": "/properties/Assets/properties/Actors/items/properties/Fields/properties/Texture Files",
                                          "type": "string"
                                      }
                                  },
                                  "type": "object"
                              },
                              "ID": {
                                  "id": "/properties/Assets/properties/Actors/items/properties/ID",
                                  "type": "integer"
                              }
                          },
                          "type": "object"
                      },
                      "type": "array"
                  },
                  "Conversations": {
                      "id": "/properties/Assets/properties/Conversations",
                      "items": {
                          "id": "/properties/Assets/properties/Conversations/items",
                          "properties": {
                              "DialogNodes": {
                                  "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes",
                                  "items": {
                                      "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items",
                                      "properties": {
                                          "ConditionPriority": {
                                              "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/ConditionPriority",
                                              "type": "integer"
                                          },
                                          "ConditionsString": {
                                              "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/ConditionsString",
                                              "type": "string"
                                          },
                                          "ConversationID": {
                                              "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/ConversationID",
                                              "type": "integer"
                                          },
                                          "DelaySimStatus": {
                                              "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/DelaySimStatus",
                                              "type": "boolean"
                                          },
                                          "FalseConditionAction": {
                                              "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/FalseConditionAction",
                                              "type": "integer"
                                          },
                                          "Fields": {
                                              "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/Fields",
                                              "properties": {
                                                  "Actor": {
                                                      "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/Fields/properties/Actor",
                                                      "type": "string"
                                                  },
                                                  "Animation Files": {
                                                      "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/Fields/properties/Animation Files",
                                                      "type": "string"
                                                  },
                                                  "Audio Files": {
                                                      "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/Fields/properties/Audio Files",
                                                      "type": "string"
                                                  },
                                                  "Conversant": {
                                                      "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/Fields/properties/Conversant",
                                                      "type": "string"
                                                  },
                                                  "Description": {
                                                      "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/Fields/properties/Description",
                                                      "type": "string"
                                                  },
                                                  "Dialogue Text": {
                                                      "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/Fields/properties/Dialogue Text",
                                                      "type": "string"
                                                  },
                                                  "Menu Text": {
                                                      "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/Fields/properties/Menu Text",
                                                      "type": "string"
                                                  },
                                                  "Parenthetical": {
                                                      "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/Fields/properties/Parenthetical",
                                                      "type": "string"
                                                  },
                                                  "Pictures": {
                                                      "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/Fields/properties/Pictures",
                                                      "type": "string"
                                                  },
                                                  "Title": {
                                                      "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/Fields/properties/Title",
                                                      "type": "string"
                                                  },
                                                  "Video File": {
                                                      "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/Fields/properties/Video File",
                                                      "type": "string"
                                                  }
                                              },
                                              "type": "object"
                                          },
                                          "ID": {
                                              "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/ID",
                                              "type": "integer"
                                          },
                                          "IsGroup": {
                                              "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/IsGroup",
                                              "type": "boolean"
                                          },
                                          "IsRoot": {
                                              "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/IsRoot",
                                              "type": "boolean"
                                          },
                                          "NodeColor": {
                                              "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/NodeColor",
                                              "type": "integer"
                                          },
                                          "OutgoingLinks": {
                                              "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/OutgoingLinks",
                                              "items": {
                                                  "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/OutgoingLinks/items",
                                                  "properties": {
                                                      "DestinationConvoID": {
                                                          "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/OutgoingLinks/items/properties/DestinationConvoID",
                                                          "type": "integer"
                                                      },
                                                      "DestinationDialogID": {
                                                          "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/OutgoingLinks/items/properties/DestinationDialogID",
                                                          "type": "integer"
                                                      },
                                                      "Filename": {
                                                          "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/OutgoingLinks/items/properties/Filename",
                                                          "type": "null"
                                                      },
                                                      "OriginConvoID": {
                                                          "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/OutgoingLinks/items/properties/OriginConvoID",
                                                          "type": "integer"
                                                      },
                                                      "OriginDialogID": {
                                                          "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/OutgoingLinks/items/properties/OriginDialogID",
                                                          "type": "integer"
                                                      }
                                                  },
                                                  "type": "object"
                                              },
                                              "type": "array"
                                          },
                                          "UserScript": {
                                              "id": "/properties/Assets/properties/Conversations/items/properties/DialogNodes/items/properties/UserScript",
                                              "type": "string"
                                          }
                                      },
                                      "type": "object"
                                  },
                                  "type": "array"
                              },
                              "Fields": {
                                  "id": "/properties/Assets/properties/Conversations/items/properties/Fields",
                                  "properties": {
                                      "Act": {
                                          "id": "/properties/Assets/properties/Conversations/items/properties/Fields/properties/Act",
                                          "type": "string"
                                      },
                                      "Actor": {
                                          "id": "/properties/Assets/properties/Conversations/items/properties/Fields/properties/Actor",
                                          "type": "string"
                                      },
                                      "Chapter": {
                                          "id": "/properties/Assets/properties/Conversations/items/properties/Fields/properties/Chapter",
                                          "type": "string"
                                      },
                                      "Conversant": {
                                          "id": "/properties/Assets/properties/Conversations/items/properties/Fields/properties/Conversant",
                                          "type": "string"
                                      },
                                      "Description": {
                                          "id": "/properties/Assets/properties/Conversations/items/properties/Fields/properties/Description",
                                          "type": "string"
                                      },
                                      "Level": {
                                          "id": "/properties/Assets/properties/Conversations/items/properties/Fields/properties/Level",
                                          "type": "string"
                                      },
                                      "Mood": {
                                          "id": "/properties/Assets/properties/Conversations/items/properties/Fields/properties/Mood",
                                          "type": "string"
                                      },
                                      "Pictures": {
                                          "id": "/properties/Assets/properties/Conversations/items/properties/Fields/properties/Pictures",
                                          "type": "string"
                                      },
                                      "Primary Location": {
                                          "id": "/properties/Assets/properties/Conversations/items/properties/Fields/properties/Primary Location",
                                          "type": "string"
                                      },
                                      "Scene": {
                                          "id": "/properties/Assets/properties/Conversations/items/properties/Fields/properties/Scene",
                                          "type": "string"
                                      },
                                      "Title": {
                                          "id": "/properties/Assets/properties/Conversations/items/properties/Fields/properties/Title",
                                          "type": "string"
                                      }
                                  },
                                  "type": "object"
                              },
                              "ID": {
                                  "id": "/properties/Assets/properties/Conversations/items/properties/ID",
                                  "type": "integer"
                              },
                              "NodeColor": {
                                  "id": "/properties/Assets/properties/Conversations/items/properties/NodeColor",
                                  "type": "integer"
                              }
                          },
                          "type": "object"
                      },
                      "type": "array"
                  },
                  "Items": {
                      "id": "/properties/Assets/properties/Items",
                      "items": {
                          "id": "/properties/Assets/properties/Items/items",
                          "properties": {
                              "Fields": {
                                  "id": "/properties/Assets/properties/Items/items/properties/Fields",
                                  "properties": {
                                      "Associated With": {
                                          "id": "/properties/Assets/properties/Items/items/properties/Fields/properties/Associated With",
                                          "type": "string"
                                      },
                                      "Combines With": {
                                          "id": "/properties/Assets/properties/Items/items/properties/Fields/properties/Combines With",
                                          "type": "string"
                                      },
                                      "Condition": {
                                          "id": "/properties/Assets/properties/Items/items/properties/Fields/properties/Condition",
                                          "type": "string"
                                      },
                                      "Description": {
                                          "id": "/properties/Assets/properties/Items/items/properties/Fields/properties/Description",
                                          "type": "string"
                                      },
                                      "Effect": {
                                          "id": "/properties/Assets/properties/Items/items/properties/Fields/properties/Effect",
                                          "type": "string"
                                      },
                                      "Model Files": {
                                          "id": "/properties/Assets/properties/Items/items/properties/Fields/properties/Model Files",
                                          "type": "string"
                                      },
                                      "Name": {
                                          "id": "/properties/Assets/properties/Items/items/properties/Fields/properties/Name",
                                          "type": "string"
                                      },
                                      "Pictures": {
                                          "id": "/properties/Assets/properties/Items/items/properties/Fields/properties/Pictures",
                                          "type": "string"
                                      },
                                      "Primary Location": {
                                          "id": "/properties/Assets/properties/Items/items/properties/Fields/properties/Primary Location",
                                          "type": "string"
                                      },
                                      "Purpose": {
                                          "id": "/properties/Assets/properties/Items/items/properties/Fields/properties/Purpose",
                                          "type": "string"
                                      },
                                      "Texture Files": {
                                          "id": "/properties/Assets/properties/Items/items/properties/Fields/properties/Texture Files",
                                          "type": "string"
                                      }
                                  },
                                  "type": "object"
                              },
                              "ID": {
                                  "id": "/properties/Assets/properties/Items/items/properties/ID",
                                  "type": "integer"
                              }
                          },
                          "type": "object"
                      },
                      "type": "array"
                  },
                  "Locations": {
                      "id": "/properties/Assets/properties/Locations",
                      "items": {
                          "id": "/properties/Assets/properties/Locations/items",
                          "properties": {
                              "Fields": {
                                  "id": "/properties/Assets/properties/Locations/items/properties/Fields",
                                  "properties": {
                                      "Act": {
                                          "id": "/properties/Assets/properties/Locations/items/properties/Fields/properties/Act",
                                          "type": "string"
                                      },
                                      "Chapter": {
                                          "id": "/properties/Assets/properties/Locations/items/properties/Fields/properties/Chapter",
                                          "type": "string"
                                      },
                                      "Climate": {
                                          "id": "/properties/Assets/properties/Locations/items/properties/Fields/properties/Climate",
                                          "type": "string"
                                      },
                                      "Description": {
                                          "id": "/properties/Assets/properties/Locations/items/properties/Fields/properties/Description",
                                          "type": "string"
                                      },
                                      "Level": {
                                          "id": "/properties/Assets/properties/Locations/items/properties/Fields/properties/Level",
                                          "type": "string"
                                      },
                                      "Model Files": {
                                          "id": "/properties/Assets/properties/Locations/items/properties/Fields/properties/Model Files",
                                          "type": "string"
                                      },
                                      "Mood": {
                                          "id": "/properties/Assets/properties/Locations/items/properties/Fields/properties/Mood",
                                          "type": "string"
                                      },
                                      "Name": {
                                          "id": "/properties/Assets/properties/Locations/items/properties/Fields/properties/Name",
                                          "type": "string"
                                      },
                                      "Pictures": {
                                          "id": "/properties/Assets/properties/Locations/items/properties/Fields/properties/Pictures",
                                          "type": "string"
                                      },
                                      "Purpose": {
                                          "id": "/properties/Assets/properties/Locations/items/properties/Fields/properties/Purpose",
                                          "type": "string"
                                      },
                                      "Scene": {
                                          "id": "/properties/Assets/properties/Locations/items/properties/Fields/properties/Scene",
                                          "type": "string"
                                      },
                                      "Texture Files": {
                                          "id": "/properties/Assets/properties/Locations/items/properties/Fields/properties/Texture Files",
                                          "type": "string"
                                      }
                                  },
                                  "type": "object"
                              },
                              "ID": {
                                  "id": "/properties/Assets/properties/Locations/items/properties/ID",
                                  "type": "integer"
                              }
                          },
                          "type": "object"
                      },
                      "type": "array"
                  },
                  "UserVariables": {
                      "id": "/properties/Assets/properties/UserVariables",
                      "items": {},
                      "type": "array"
                  }
              },
              "type": "object"
          },
          "Author": {
              "id": "/properties/Author",
              "type": "string"
          },
          "Description": {
              "id": "/properties/Description",
              "type": "string"
          },
          "Language": {
              "id": "/properties/Language",
              "type": "string"
          },
          "Title": {
              "id": "/properties/Title",
              "type": "string"
          },
          "UserScript": {
              "id": "/properties/UserScript",
              "type": "null"
          },
          "Version": {
              "id": "/properties/Version",
              "type": "string"
          }
      },
      "type": "object"
  }
*/
















  // changed name to mail
  mail: {
    type: String,
    required: true,
    unique: false,
    //match: /^[a-z0-9]+$/i,
    //minlength: 3,
    maxlength: 25,
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
