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
    this.lives = 3;
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

  bounce(canvas) {
    var gameOverScreen = document.querySelector('.game-over-screen');

    this.x += this.dX;
    this.y += this.dY;

    if (this.x + this.dX > canvas.width - this.radius ||
      this.x + this.dX < this.radius) {
      this.dX = -this.dX
    }

    if (this.y + this.dY < this.radius) {
      this.dY = -this.dY
    } else if (this.y > canvas.height - this.radius) {
      if (this.lives > 0) {
        this.lives--
        this.x = 420;
        this.y = 560;
        this.dY = -this.dY
      }

      if (this.lives === 0) {
        this.playing = false;
        gameOverScreen.style.visibility = 'visible';
      }
    }
    return this;
  }

  drawLives(ctx) {
    ctx.fillStyle = "#AE3CD5";
    ctx.font = "25px Poppins";
    ctx.fillText("Lives: " + this.lives, 385, 30)
    return this
  }
}

module.exports = Ball;