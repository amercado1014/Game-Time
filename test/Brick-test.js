const { assert } = require('chai');
const Brick = require('../lib/Brick.js');
const Ball = require('../lib/Ball.js');
const Game = require('../lib/Game.js');

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

  it('should start off not being hit', function() {
    assert.equal(brick.hit, false);
  });

  it('should have a default colorCount', function() {
    assert.equal(brick.colorCount, 0);
  });

  it('should be hit when there is a collision with the ball', function() {
    var ball = new Ball(20, 560, 15, 5, 5);
    var brick = new Brick(null, null)
    var game = new Game;
    var bricksArray = game.buildBricksArray(6, 2, 20, 140, 50);

    assert.equal(bricksArray[1].hit, false);
    brick.brickCollision(bricksArray, ball, game);
    assert.equal(bricksArray[1].hit, false);

    ball = new Ball(140, 100, 15, 5, 5);
    
    assert.equal(bricksArray[1].hit, false);
    brick.brickCollision(bricksArray, ball, game);
    assert.equal(bricksArray[1].hit, true);
  });

  it('ball should change horizontal direction when there is a collision with the brick', function() {
    var ball = new Ball(20, 560, 15, 5, 5);
    var brick = new Brick(null, null)
    var game = new Game;
    var bricksArray = game.buildBricksArray(6, 2, 20, 140, 50);

    assert.equal(ball.dX, 5);
    brick.brickCollision(bricksArray, ball, game);
    assert.equal(ball.dX, 5);

    ball = new Ball(140, 100, 15, 5, 5);

    assert.equal(ball.dX, 5);
    brick.brickCollision(bricksArray, ball, game);
    assert.equal(ball.dX, -5);
  });

  it('ball should change vertical direction when there is a collision with the brick', function() {
    var ball = new Ball(20, 560, 15, 5, 5);
    var brick = new Brick(null, null)
    var game = new Game;
    var bricksArray = game.buildBricksArray(6, 2, 20, 140, 50);

    assert.equal(ball.dY, -5);
    brick.brickCollision(bricksArray, ball, game);
    assert.equal(ball.dY, -5);

    ball = new Ball(150, 120, 15, 5, 5);

    assert.equal(ball.dY, -5);
    brick.brickCollision(bricksArray, ball, game);
    assert.equal(ball.dY, 5);
  });

  it('should increment score and highscore when the ball hits a brick', function() {
    var ball = new Ball(20, 560, 15, 5, 5);
    var brick = new Brick(null, null)
    var game = new Game;
    var bricksArray = game.buildBricksArray(6, 2, 20, 140, 50);

    assert.equal(game.score, 0);
    assert.equal(game.highScore, 0);
    brick.brickCollision(bricksArray, ball, game);
    assert.equal(game.score, 0);
    assert.equal(game.highScore, 0);

    ball = new Ball(150, 120, 15, 5, 5);

    assert.equal(game.score, 0);
    assert.equal(game.highScore, 0);
    brick.brickCollision(bricksArray, ball, game);
    assert.equal(game.score, 1);
    assert.equal(game.highScore, 1);
  })
});