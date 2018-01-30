const { assert } = require('chai');
const Paddle = require('../lib/Paddle.js');
const Ball = require('../lib/Ball.js');

describe('Paddle', function() {
  var paddle;

  beforeEach(function() {
    paddle = new Paddle(10, 20, 30, 40);
 
  });

  it('should have x-position, y-position, width and height', function() {
    assert.equal(paddle.x, 10)
    assert.equal(paddle.y, 20)
    assert.equal(paddle.width, 30)
    assert.equal(paddle.height, 40)
  })

  it('ball should change X direction on collision with side of paddle', function() {
    var ball = new Ball(60, 25, 10, 2, 2);
    paddle = new Paddle(60, 20, 30, 40);
    assert.equal(ball.dX, 2);
    paddle.paddleCollision(ball);
    assert.equal(ball.dX, -2);
  })

  it('ball should change Y direction on collision with top of paddle', function() {
    var ball = new Ball(60, 20, 10, 2, 2);
    paddle = new Paddle(60, 20, 30, 40);
    assert.equal(ball.dY, 2);
    paddle.paddleCollision(ball);
    assert.equal(ball.dY, -2);
  })

})

