class Brick {
  constructor(x, y,) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 10;
    
  }  

  drawBrick() {
    // for (var i = 0; i < bricks.length; i++) {
      ctx.fillStyle = "orange";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    // }
  }
}

module.exports = Brick;