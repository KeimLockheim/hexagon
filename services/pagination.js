"use strict";
const config = require('../config');
const formatLinkHeader = require('format-link-header');

module.exports = function(query, total, resourceHref, req, res, paginationFunc) {
  // TODO: validate pagination query parameters

  // Parse the "page" URL query parameter indicating the index of the first element that should be in the response
  let page = parseInt(req.query.page, 10);
  if (isNaN(page) || page < 1) {
    page = 1;
  }

  // Parse the "pageSize" URL query parameter indicating how many elements should be in the response
  let pageSize = parseInt(req.query.pageSize, 10);
  if (isNaN(pageSize) || pageSize < 0 || pageSize > 50) {
    pageSize = 20;
  }

  // Apply the pagination to the database query
  query = (paginationFunc || defaultPagination)(query, page, pageSize);

  const links = {};
  const url = config.baseUrl + resourceHref;
  const maxPage = Math.ceil(total / pageSize);

  // Add first & prev links if current page is not the first one
  if (page > 1) {
    links.first = { rel: 'first', url: `${url}?page=1&pageSize=${pageSize}` };
    links.prev = { rel: 'prev', url: `${url}?page=${page - 1}&pageSize=${pageSize}` };
  }

  // Add next & last links if current page is not the last one
  if (page < maxPage) {
    links.next = { rel: 'next', url: `${url}?page=${page + 1}&pageSize=${pageSize}` };
    links.last = { rel: 'last', url: `${url}?page=${maxPage}&pageSize=${pageSize}` };
  }

  // If there are any links (i.e. if there is more than one page),
  // add the Link header to the response
  if (Object.keys(links).length >= 1) {
    res.set('Link', formatLinkHeader(links));
  }

  res.set('Pagination-Total', total);

  return query;
};

function defaultPagination(query, page, pageSize) {
  return query.skip((page - 1) * pageSize).limit(pageSize);
}
