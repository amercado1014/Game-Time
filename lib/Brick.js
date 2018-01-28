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
    this.colorCount = y;
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
        this.colorCount = y;
        console.log(y);

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
        if (brick.colorCount === 50) {
          ctx.fillStyle = "#246BB4";
          ctx.fillRect(brick.x + 2, brick.y + 2, 
            brick.width - 4, brick.height - 4);
        } else if (brick.colorCount === 90) {
          ctx.fillStyle = "blue";
          ctx.fillRect(brick.x + 2, brick.y + 2, 
            brick.width - 4, brick.height - 4);
        } else if (brick.colorCount === 130) {
          ctx.fillStyle = "green";
          ctx.fillRect(brick.x + 2, brick.y + 2, 
            brick.width - 4, brick.height - 4);
        } else if (brick.colorCount === 170) {
          ctx.fillStyle = "yellow";
          ctx.fillRect(brick.x + 2, brick.y + 2, 
            brick.width - 4, brick.height - 4);
        } else if (brick.colorCount === 210) {
          ctx.fillStyle = "red";
          ctx.fillRect(brick.x + 2, brick.y + 2, 
            brick.width - 4, brick.height - 4);
        } else {
          ctx.fillStyle = "purple";
          ctx.fillRect(brick.x + 2, brick.y + 2, 
            brick.width - 4, brick.height - 4);
        }
      }
    });
  }

  brickCollision(bricksArray, ball) {
    bricksArray.forEach(function(brick) {
      if (brick.hit === false) {
        if (ball.x - ball.radius <= brick.x + brick.width &&
          ball.x + ball.radius >= brick.x &&
          ball.y + ball.radius >= brick.y &&
          ball.y - ball.radius <= brick.y + brick.height &&
          (ball.x + ball.radius >= brick.x &&
             ball.y + ball.radius >= brick.y) &&
          (ball.x + ball.radius >= brick.x &&
             ball.y - ball.radius <= brick.y + brick.height) &&
          (ball.x - ball.radius <= brick.x + brick.width &&
             ball.y + ball.radius >= brick.y) &&
          (ball.x - ball.radius <= brick.x + brick.width &&
             ball.y - ball.radius <= brick.x + brick.height)
        ) {
          brick.hit = true;
          if (ball.x  <= brick.x ||
            ball.x  >= brick.x + brick.width) {
            ball.dX = -ball.dX;
          } else {
            ball.dY = -ball.dY;
          }
        }
      }
    })
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
  }
}

module.exports = Brick;