class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.height = 20;
    this.width = 80;
    this.hit = false;
    this.colorCount = 0;
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
    return this;
  }

  brickCollision(bricksArray, ball, game) {
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
          game.score++;
          game.highScore++;
          if (ball.x <= brick.x ||
            ball.x >= brick.x + brick.width) {
            ball.dX = -ball.dX;
          } else {
            ball.dY = -ball.dY;
          }
        }
      }
    })
    return this
  }
}

module.exports = Brick;