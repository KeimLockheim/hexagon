"use strict";
const _ = require('lodash');
const BPromise = require('bluebird');
const mongoose = require('mongoose');
const paginate = require('./pagination');
const ObjectId = mongoose.Types.ObjectId;

exports.loaderById = function(model, param, handler) {
  if (_.isFunction(param)) {
    handler = param;
    param = undefined;
  }

  return function(req, res, next) {
    const id = req.params[param || 'id'];
    let query = exports.findById(model, id);
    query = (handler || _.constant(query))(query, req);
    query.then(record => {
      if (!record) {
        return next(exports.notFoundError(model, id));
      }

      req[model.modelName.charAt(0).toLowerCase() + model.modelName.slice(1)] = record;
      next();
    }).catch(next);
  };
};

exports.findById = function(model, id) {
  if (!ObjectId.isValid(id)) {
    return BPromise.resolve();
  }

  return model.findById(id);
};

exports.requireJson = function(req, res, next) {
  if (!req.is('application/json')) {
    const error = new Error('This resource only has an application/json representation');
    error.status = 415;
    return next(error);
  } else if (!_.isObject(req.body)) {
    const error = new Error('The request body must be a JSON object');
    error.status = 400;
    return next(error);
  }

  next();
};

exports.notFoundError = function(model, id) {
  const notFound = new Error(`No ${model.modelName} found with ID ${id}`);
  notFound.status = 404;
  return notFound;
};

exports.paginate = function(filter, resourceHref, req, res) {
  return BPromise.resolve(req).then(filter).then(function(countFilter) {
    return getFilteredQuery(countFilter).count().then(function(total) {
      return BPromise.resolve(req).then(filter).then(function(paginationFilter) {
        return paginate(getFilteredQuery(paginationFilter), total, resourceHref, req, res);
      });
    });
  });
};

exports.paginateNested = function(nested, resourceHref, req, res) {
  return paginate(nested, nested.length, resourceHref, req, res, (query, page, pageSize) => {
    const offset = (page - 1) * pageSize;
    return query.slice(offset, offset + pageSize);
  });
};

exports.virtualHrefValidator = function(property, model) {

  const hrefProperty = `${property}Href`;
  const originalHrefProperty = `_${hrefProperty}`;

  return function validateHref(value) {
    if (!value && !this[originalHrefProperty]) {
      invalidate(this, `Path \`${hrefProperty}\` is required`, 'required');
      return BPromise.resolve(true);
    } else if (!ObjectId.isValid(value)) {
      invalidate(this, `Path \`${hrefProperty}\` is not a valid ${model.modelName} reference`);
      return BPromise.resolve(true);
    }

    return model.findById(value).then(record => {
      if (!record) {
        invalidate(this, `Path \`${hrefProperty}\` does not reference a resource that exists`);
      }

      return true;
    }).catch(() => {
      invalidate(this, `Path \`${hrefProperty}\` does not reference a resource that exists`);
      return true;
    });
  };

  function invalidate(document, message, error) {
    document.invalidate(hrefProperty, message, document[originalHrefProperty], error || 'resourceNotFound');
  }
};

exports.addVirtualHref = function(schema, baseHref, property) {
  schema.virtual(`${property}Href`).get(getHref).set(setHref);

  function getHref() {
    if (!this[property]) {
      return null;
    }

    return `${baseHref}/${this[property]._id || this[property]}`;
  }

  function setHref(value) {

    this[`_${property}Href`] = value;

    let id = value;
    if (id && id.indexOf(baseHref + '/') === 0) {
      id = id.slice(baseHref.length + 1);
    }

    if (ObjectId.isValid(id)) {
      this[property] = id;
    } else {
      this[property] = null;
    }
  }
};

exports.serializeVirtualHref = function(doc, json, options, property) {
  json[`${property}Href`] = doc[`${property}Href`];

  if (json[property] instanceof ObjectId || !exports.includes(options.req, property)) {
    delete json[property];
  } else if (json[property]) {
    json[property] = doc[property].toJSON();
  }
};

exports.serializeOptional = function(req, doc, json, related) {
  if (!exports.includes(req, related)) {
    delete json[related];
  } else if (!json[related]) {
    json[related] = _.isArray(doc[related]) ? doc[related].map(rel => rel.toJSON()) : doc[related].toJSON();
  }
};

exports.populate = function(query, related, req, actualRelated) {
  if (exports.includes(req, related)) {
    return query.populate(actualRelated || related);
  } else {
    return query;
  }
};

exports.includes = function(req, related) {
  return req && req.query && _.includes(_.compact(_.flatten([ req.query.include ])), related);
};

exports.sort = function(query, req, defaultProperty, allowedProperties) {

  let sorters = allowedProperties;
  if (_.isArray(sorters)) {
    sorters = _.reduce(sorters, function(memo, property) {
      memo[property] = property;
      return memo;
    }, {});
  }

  sorters = _.mapValues(sorters, function(memo, value) {
    if (_.isFunction(value)) {
      return value;
    }

    return function(query, ascending) {
      return query = query.sort((ascending ? '' : '-') + value);
    };
  });

  let sortParameters = _.compact(_.flatten([ req.query.sort ]));
  if (!sortParameters.length) {
    sortParameters.push(defaultProperty);
  }

  sortParameters = _.filter(sortParameters, param => {
    return _.includes(allowedProperties, param.replace(/^\-/, ''));
  });

  _.each(sortParameters, param => {
    query = sorters[param.replace(/^\-/, '')](query, param.charAt(0) != '-');
  });

  return query;
};

function getFilteredQuery(data) {

  /**
   * Mongoose queries must be put into a wrapper object to be passed into promise chains without being executed.
   *
   * Since a Mongoose query is a promise itself with a `.then` function, returning it directly in a promise chain
   * will execute it. Having a wrapper object around it will prevent that unwanted behavior.
   */
  if (!data.filtered) {
    throw new Error('Filter functions must not return a Mongoose query directly; instead, they must return an object with a query as the `filtered` property, or a promise of such an object');
  }

  return data.filtered;
}
