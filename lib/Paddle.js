class Paddle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  drawPaddle(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "#94198D";
    ctx.fillRect(this.x + 2, this.y + 2, this.width - 4, this.height - 4);
    return this;
  }

  erase(ctx) {
    ctx.clearRect(this.x, this.y, this.width, this.height);
    return this
  }

  paddleCollision(ball) {
    if (ball.y + ball.radius >= this.y && 
      ball.x + ball.radius > this.x && 
      ball.x - ball.radius < this.x + this.width) {
      ball.dY = -ball.dY;
      // ball.dY = ball.dY + 1;
      // ball.dX += 1;
    }

    return this 
  }
}

module.exports = Paddle;