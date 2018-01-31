const { assert } = require('chai');
const Ball = require('../lib/Ball.js');
const Game = require('../lib/Game.js');

describe('Ball', function() {
  var ball;

  beforeEach(function() {
    ball = new Ball(20, 560, 15, 5, 5);
  });

  it('should return true', function() {
    assert.equal(true, true);
  });

  it('should take arguments for x, y, radius, dX and dY', function() {
    assert.equal(ball.x, 20);
    assert.equal(ball.y, 560);
    assert.equal(ball.radius, 15);
    assert.equal(ball.dX, 5);
    assert.equal(ball.dY, -5);
  });

  it('should have a default startAngle and endAngle', function() {
    assert.equal(ball.startAngle, 0);
    assert.equal(ball.endAngle, Math.PI * 2);
  });

  it('should start not playing', function() {
    assert.equal(ball.playing, false);
  });

  it('should move on canvas', function() {
    var game = new Game;

    assert.equal(ball.x, 20);
    assert.equal(ball.y, 560);

    ball.bounce(game);

    assert.equal(ball.x, 25);
    assert.equal(ball.y, 555);

  });

  it('should change horizontal direction when it hits the sides of the canvas', function() {
    var game = new Game;

    assert.equal(ball.dX, 5);
    ball.bounce(game);
    assert.equal(ball.dX, 5);

    ball = new Ball(840, 100, 15, 5, 5);

    assert.equal(ball.dX, 5);
    ball.bounce(game);
    assert.equal(ball.dX, -5);
  });

  it('should change vertical direction when it hits the top of the canvas', function() {
    var game = new Game;

    assert.equal(ball.dY, -5);
    ball.bounce(game);
    assert.equal(ball.dY, -5);

    ball = new Ball(20, 10, 15, 5, 5);

    assert.equal(ball.dY, -5);
    ball.bounce(game);
    assert.equal(ball.dY, 5);
  });

  it('should decrement lives if not hit by paddle', function() {
    var game = new Game;

    assert.equal(game.lives, 3);
    ball.bounce(game);
    assert.equal(game.lives, 3);

    ball = new Ball(20, 700, 15, 5, 5);

    assert.equal(game.lives, 3);
    ball.bounce(game);
    assert.equal(game.lives, 2);
  });

  it('should repositon after losing a life', function() {
    var game = new Game;

    assert.equal(game.lives, 3);
    ball.bounce(game);
    assert.equal(game.lives, 3);

    ball = new Ball(20, 700, 15, 5, 5);

    assert.equal(game.lives, 3);
    ball.bounce(game);
    assert.equal(game.lives, 2);

    assert.equal(ball.x, 330);
    assert.equal(ball.y, 635);
    assert.equal(ball.dY, 5);
  });

  it('should stop playing if lives equal 0', function() {
    var game = new Game;
    ball = new Ball(20, 700, 15, 5, 5);
    game.lives = 1
    
    assert.equal(game.lives, 1);
    ball.bounce(game);
    assert.equal(game.lives, 0);
    assert.equal(ball.playing, false);
  });
});