const { assert } = require('chai');
const Game = require('../lib/Game.js');

describe('Index', function() {
  var game;

  beforeEach(function() {
    game = new Game;
  });

  it('should have 3 lives', function() {
    assert.equal(game.lives, 3)
  })

  it('should start with score of zero', function() {
    assert.equal(game.score, 0)
  })

  it('should start with high score of zero', function() {
    assert.equal(game.highScore, 0)
  })

  it('should build a brick array', function() {
    var bricks = [];
    
    assert.equal(bricks.length, 0);
    bricks = game.buildBricksArray(1, 1, 10, 10, 10);
    assert.equal(bricks.length, 1);

  })

})