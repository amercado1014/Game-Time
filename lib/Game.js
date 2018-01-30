var Brick = require('./Brick.js');

class Game {
  constructor() {
    this.lives = 3;
    this.score = 0;
    this.highScore = 0;

  }

  drawLives(ctx) {
    ctx.fillStyle = "#AE3CD5";
    ctx.font = "25px Poppins";
    ctx.fillText("Lives: " + this.lives, 510, 30)
    return this
  }

  drawScore(ctx) {
    ctx.fillStyle = "#AE3CD5";
    ctx.font = "25px Poppins";
    ctx.fillText("Score: " + this.score, 15, 30);
    return this
  }

  drawHighScore(ctx) {
    var retrievedObject = localStorage.getItem("Stored Score");
    var parsedObject = JSON.parse(retrievedObject);

    ctx.fillStyle = "#AE3CD5";
    ctx.font = "25px Poppins";

    if (this.highScore <= parsedObject.HighScore) {
      ctx.fillText("High Score: " + parsedObject.HighScore, 240, 30);
    } else if (this.highScore > parsedObject.HighScore) {
      ctx.fillText("High Score: " + this.highScore, 240, 30);
      var objectToStore = {HighScore: this.highScore};
      var stringifiedObject = JSON.stringify(objectToStore);
      
      localStorage.setItem("Stored Score", stringifiedObject);
    }


    return this
  }

  buildBricksArray(columns, rows, padding, xDistance, yDistance) {
    var bricks = [];

    for (var i = 0; i < columns; i++) {
      for (var j = 0; j < rows; j++) {
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