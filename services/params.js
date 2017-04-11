const _ = require('lodash');

exports.string = function(req, param, multiple) {
  if (!_.has(req.query, param)) {
    return;
  }

  const value = req.query[param];
  if (!multiple && _.isArray(value)) {
    throw paramError(`Query parameter ${param} can only be specified once in the URL (${value.length} were found)`);
  }

  return value;
};

exports.boolean = function(req, param, defaultValue) {

  const value = exports.string(req, param, false);
  if (value === undefined) {
    return defaultValue;
  }

  if (value.match(/^(?:1|y|yes|t|true)$/i)) {
    return true;
  } else if (value.match(/^(?:0|n|no|f|false)$/i)) {
    return false;
  } else {
    throw paramError(`Query parameter ${param} must be a boolean (1/y/yes/t/true or 0/n/no/f/false)`);
  }
};

function paramError(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}
