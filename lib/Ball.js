class Ball {
  constructor(x, y, ballRadius, dX, dY) {
    this.x = x;
    this.y = y;
    this.ballRadius = ballRadius;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2;
    this.dX = dX;
    this.dY = dY;
  }

  drawBall(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.ballRadius, this.startAngle, this.endAngle);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
    return this;
  }

  erase(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return this;
  }

  bounce(canvas) {
    this.x += this.dX;
    this.y += this.dY;

    if (this.x + this.dX > canvas.width - this.ballRadius ||
     this.x + this.dX < this.ballRadius) {
      this.dX = -this.dX
    }

    if (this.y + this.dY > canvas.width - this.ballRadius ||
     this.y + this.dY < this.ballRadius) {
      this.dY = -this.dY
    }
    return this;
  }
}

module.exports = Ball;