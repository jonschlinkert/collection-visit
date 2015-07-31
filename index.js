/*!
 * collection-visit <https://github.com/jonschlinkert/collection-visit>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var mapVisit = require('map-visit');
var visit = require('object-visit');

function collectionVisit(collection, method, val) {
  if (Array.isArray(val)) {
    mapVisit(collection, method, val);
  } else {
    visit(collection, method, val);
  }
  return collection;
}

/**
 * Expose `collectionVisit`
 */

module.exports = collectionVisit;
