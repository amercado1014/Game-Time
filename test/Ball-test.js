const { assert } = require('chai');
const Ball = require('../lib/Ball.js');

describe('Ball', function() {
  var ball;

  beforeEach(function() {
    ball = new Ball(50, 50, 10, 2, 2);
  });

  it('should return true', function() {
    assert.equal(true, true);
  });

  it('should take arguments for x, y, radius, dX and dY', function() {
    assert.equal(ball.x, 50);
    assert.equal(ball.y, 50);
    assert.equal(ball.radius, 10);
    assert.equal(ball.dX, 2);
    assert.equal(ball.dY, -2);
  });

  it('should have a default startAngle and endAngle', function() {
    assert.equal(ball.startAngle, 0);
    assert.equal(ball.endAngle, Math.PI * 2);
  });

  it('should start not playing', function() {
    assert.equal(ball.playing, false);
  });

  it('should start with three lives', function() {
    assert.equal(ball.lives, 3);
  });
});