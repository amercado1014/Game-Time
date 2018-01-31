class Ball {
  constructor(x, y, radius, dX, dY) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2;
    this.dX = dX;
    this.dY = -dY;
    this.playing = false; 
  }

  drawBall(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    ctx.fillStyle = "#198D94";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
    return this;
  }

  erase(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return this;
  }

  bounce(game) {
    this.x += this.dX;
    this.y += this.dY;

    if (this.x + this.dX > 850 - this.radius ||
      this.x + this.dX < this.radius) {
      this.dX = -this.dX
    }

    if (this.y + this.dY < this.radius) {
      this.dY = -this.dY
    } else if (this.y > 700 - this.radius) {
      if (game.lives > 0) {
        game.lives--
        this.x = 330;
        this.y = 635;
        this.dY = -this.dY
      }

      if (game.lives === 0) {
        this.playing = false;
      }
    }
    return this;
  }
}

module.exports = Ball;