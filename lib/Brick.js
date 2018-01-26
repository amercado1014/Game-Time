class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 20;
    this.padding = 20;
    this.offsetTop = 50;
    this.offsetLeft = 140;
    this.hit = false;
    this.score = 0;
    // scoreCount = []
  } 

  buildBricksArray(columns, rows) {
    this.columns = columns;
    this.rows = rows;

    var bricks = [];

    for (var i = 0; i < columns; i++) {
      for (var j = 0; j < rows; j++) {
        var x = (i * (this.width + this.padding)) + this.offsetLeft;
        var y = (j * (this.height + this.padding)) + this.offsetTop;
        var brick = new Brick(x, y, this.width, this.height);

        bricks.push(brick);
      }
    }
    return bricks;
  }
  
  drawBrick(bricksArray, ctx) {
    bricksArray.forEach(function(brick) {
      if (brick.hit === false) {
        ctx.fillStyle = "black";
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
        ctx.fillStyle = "#246BB4";
        ctx.fillRect(brick.x + 2, brick.y + 2, 
          brick.width - 4, brick.height - 4);

      }
    });
  }

  brickCollision(bricksArray, ball) {
    // var brickThis = 
    bricksArray.forEach(function(brick) {
      if (brick.hit === false) {
        console.log(this);
        if (ball.x - ball.radius < brick.x + brick.width &&
          ball.x + ball.radius > brick.x &&
          ball.y + ball.radius > brick.y &&
          ball.y - ball.radius < brick.y + brick.height) {
          ball.dY = -ball.dY
          brick.hit = true;
          // scoreCount.push();
          // this.score++
          // console.log(this.score);
        }
      }
    })
  }

  drawScore(ctx) {
    ctx.fillStyle = "#AE3CD5";
    ctx.font = "25px Poppins";
    ctx.fillText("Score: " + this.score, 15, 30)
  }


}

module.exports = Brick;