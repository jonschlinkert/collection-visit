'use strict';

require('mocha');
var assert = require('assert');
var clone = require('clone-deep');
var visit = require('./');
var ctx;

describe('collection-visit', function() {
  var fixture = {
    options: {},
    data: {},
    set: function(key, value) {
      if (typeof key !== 'string') {
        visit(this, 'set', key, value);
      } else {
        this.data[key] = value;
      }
    }
  };

  beforeEach(function() {
    ctx = clone(fixture);
  });

  describe('arrays', function() {
    describe('visit', function() {
      it('should call visit on every value in the given object:', function() {
        ctx.set('a', 'a');
        ctx.set([{b: 'b'}, {c: 'c'}]);
        ctx.set({d: {e: 'f'}});
        assert.deepEqual(ctx.data, {
          a: 'a',
          b: 'b',
          c: 'c',
          d: { e: 'f' }
        });
      });

      it('should pass the second argument to set:', function() {
        ctx.set(['a', 'b'], function() {});
        assert.equal(typeof ctx.data.a, 'function');
        assert.equal(typeof ctx.data.b, 'function');
      });

      it('should work when the value is a string:', function() {
        ctx.setName = function(str) {
          this.name = str;
        };

        visit(ctx, 'setName', 'foo');
        assert.equal(ctx.name, 'foo');
      });
    });
  });

  describe('objects', function() {
    describe('visit', function() {
      it('should call visit on every value in the given object:', function() {
        ctx.set('a', 'a');
        ctx.set('b', 'b');
        ctx.set('c', 'c');
        ctx.set({d: {e: 'f'}});

        assert.deepEqual(ctx.data, {
          a: 'a',
          b: 'b',
          c: 'c',
          d: { e: 'f' }
        });
      });
    });
  });

  describe('errors', function() {
    it('should throw an error when invalid args are passed:', function() {
      assert.throws(function() {
        visit();
      });

      assert.throws(function() {
        visit('foo', 'bar');
      });

      assert.throws(function() {
        visit({}, {}, {});
      });
    });
  });
});
