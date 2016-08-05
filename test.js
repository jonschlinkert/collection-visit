'use strict';

require('mocha');
require('should');
var assert = require('assert');
var visit = require('./');

describe('arrays', function() {
  var ctx = {
    data: {},
    set: function(key, value) {
      if (Array.isArray(key)) {
        visit(ctx, 'set', key);
      } else if (typeof key === 'object') {
        visit(ctx, 'set', key);
      } else {
        ctx.data[key] = value;
      }
    }
  };

  describe('visit', function() {
    it('should call visit on every value in the given object:', function() {
      ctx.set('a', 'a');
      ctx.set([{b: 'b'}, {c: 'c'}]);
      ctx.set({d: {e: 'f'}});
      ctx.data.should.eql({
        a: 'a',
        b: 'b',
        c: 'c',
        d: { e: 'f' }
      });
    });

    it('should work when the value is a string:', function() {
      ctx.setName = function(str) {
        this.name = str;
      };

      visit(ctx, 'setName', 'foo');
      assert(ctx.name);
      assert(ctx.name === 'foo');
    });
  });
});

describe('objects', function() {
  var obj = {
    a: 'a',
    b: 'b',
    c: 'c',
    d: { e: 'f' }
  };

  var ctx = {
    data: {},
    set: function(key, value) {
      if (typeof key === 'object') {
        visit(ctx, 'set', key);
      } else {
        ctx.data[key] = value;
      }
    }
  };

  describe('visit', function() {
    it('should call visit on every value in the given object:', function() {
      ctx.set('a', 'a');
      ctx.set('b', 'b');
      ctx.set('c', 'c');
      ctx.set({d: {e: 'f'}});
      ctx.data.should.eql(obj);
    });
  });

  describe('errors', function() {
    it('should throw an error when invalid args are passed:', function() {
      (function() {
        visit();
      }).should.throw('object-visit expects `thisArg` to be an object.');

      (function() {
        visit('foo', 'bar');
      }).should.throw('object-visit expects `thisArg` to be an object.');

      (function() {
        visit({}, {}, {});
      }).should.throw('object-visit expects `method` name to be a string');
    });
  });
});
