class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 10;
    this.padding = 10;
    this.offsetTop = 30;
    this.offsetLeft = 25;
    this.hit = false;
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
        ctx.fillStyle = "orange";
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
      }
    });
  }


}

module.exports = Brick;