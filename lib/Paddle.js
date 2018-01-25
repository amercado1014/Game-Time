class Paddle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  drawPaddle(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }

  erase(ctx) {
    ctx.clearRect(this.x, this.y, this.width, this.height);
    return this
  }

  paddleCollision(ball) {
    if (ball.y + ball.ballRadius >= this.y && 
      ball.x + ball.ballRadius > this.x && 
      ball.x - ball.ballRadius < this.x + this.width) {
      ball.dY = -ball.dY
    }
    return this 
  }
}

module.exports = Paddle;