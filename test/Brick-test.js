const { assert } = require('chai');
const Brick = require('../lib/Brick.js');

describe('Brick', function() {
  var brick;

  beforeEach(function() {
    brick = new Brick(50, 50);
  });

  it('should return true', function() {
    assert.equal(true, true);
  });

  it('should take arguments for x and y', function() {
    assert.equal(brick.x, 50);
    assert.equal(brick.y, 50);
  });

  it('should have a default width and height', function() {
    assert.equal(brick.width, 80);
    assert.equal(brick.height, 20);
  });

  it('should have a default padding', function() {
    assert.equal(brick.padding, 20);
  });

  it('should have a default offsetTop and offsetLeft', function() {
    assert.equal(brick.offsetTop, 50);
    assert.equal(brick.offsetLeft, 140);
  });

  it('should start off not being hit', function() {
    assert.equal(brick.hit, false);
  });

  
});