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

  // movePaddle(e) {
  //   // e.preventDefault();
  //   switch(e.keyCode) {
  //     case 37:
  //       this.x -= 1;
  //       break;
  //     case 39:
  //       this.x += 1;
  //       break;
  //   }
  //   return this
  // }

  erase(ctx) {
    ctx.clearRect(this.x, this.y, this.width, this.height);
    return this
  }

}



module.exports = Paddle;