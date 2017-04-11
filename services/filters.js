const _ = require('lodash');

exports.equalsOrIn = function(query, property, valueOrArray) {
  if (_.isArray(valueOrArray)) {
    return query.where(property).in(_.uniq(valueOrArray));
  } else {
    return query.where(property).equals(valueOrArray);
  }
};

exports.present = function(query, property, present) {
  const criteria = {};
  if (present) {
    criteria[property] = {
      $exists: true,
      $ne: null
    };
  } else {
    criteria.$or = [];

    let criterion = {};
    criterion[property] = { $exists: false };
    criteria.$or.push(criterion);

    criterion = {};
    criterion[property] = null;
    criteria.$or.push(criterion);
  }

  return query.find(criteria);
};

exports.textSearch = function(query, search) {
  return query.find({
    $text: {
      $search: search
    }
  });
};
