var Brick = require('./Brick.js');

class Game {
  constructor() {
    this.lives = 3;
  }

  drawLives(ctx) {
    ctx.fillStyle = "#AE3CD5";
    ctx.font = "25px Poppins";
    ctx.fillText("Lives: " + this.lives, 385, 30)
    return this
  }

  drawScore(ctx, bricksArray1, bricksArray2, bricksArray3) {
    var hitBricksArray1 = bricksArray1.filter(function(brick) {
      return brick.hit === true;
    });

    var hitBricksArray2 = bricksArray2.filter(function(brick) {
      return brick.hit === true;
    });

    var hitBricksArray3 = bricksArray3.filter(function(brick) {
      return brick.hit === true;
    });

    var totalScore = hitBricksArray1.length + 
      hitBricksArray2.length + hitBricksArray3.length;
    
    ctx.fillStyle = "#AE3CD5";
    ctx.font = "25px Poppins";
    ctx.fillText("Score: " + totalScore, 15, 30);
    return this
  }

  buildBricksArray(columns, rows, padding, xDistance, yDistance) {
    var bricks = [];
    // this.columns = columns;
    this.rows = rows;

    for (var i = 0; i < columns; i++) {
      for (var j = 0; j < this.rows; j++) {
        var x = (i * (80 + padding)) + xDistance;
        var y = (j * (20 + padding)) + yDistance;
        var brick = new Brick(x, y);
        
        brick.colorCount = y;
        bricks.push(brick);
      }
    }
    return bricks;
  }
}

module.exports = Game;