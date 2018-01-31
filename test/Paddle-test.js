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
    var ball = new Ball(230, 660, 15, 5, 5);
    var paddle = new Paddle(300, 650, 300, 20);

    assert.equal(ball.dX, 5);
    paddle.paddleCollision(ball);
    assert.equal(ball.dX, 5);

    ball = new Ball(285, 660, 15, 5, 5);
    assert.equal(ball.dX, 5);
    paddle.paddleCollision(ball);
    assert.equal(ball.dX, -5);
  })

  it('ball should change Y direction on collision with top of paddle', function() {
    var ball = new Ball(230, 635, 15, 5, 5);
    var paddle = new Paddle(300, 650, 300, 20);

    assert.equal(ball.dY, -5);
    paddle.paddleCollision(ball);
    assert.equal(ball.dY, -5);

    ball = new Ball(330, 635, 15, 5, 5);
    assert.equal(ball.dY, -5);
    paddle.paddleCollision(ball);
    assert.equal(ball.dY, 5);
  })

})

