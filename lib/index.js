var Ball = require('./Ball.js');
var Paddle = require('./Paddle.js');
var Brick = require('./Brick.js');

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var ball1 = new Ball(185, 10, 10, 2, 2); 
var paddle1 = new Paddle(200, canvas.height - 20, 50, 10);

var bricks = [];

buildBricks();

function buildBricks() {
  var rowCount = 8;
  var columnCount = 3;
  for (var i = 0; i < rowCount; i++) {
    if (bricks.length < rowCount){
      var brick = new Brick(10 , 10 + ([i]*20));
      bricks.push(brick)
    } else {
      var brick = new Brick(20 , 10 + ([i]*20));
      bricks.push(brick)
  }
}
}

window.focus();
window.addEventListener('keyup', movePaddle);

function movePaddle(e) {
  if (paddle1.x < canvas.width - paddle1.width) {
    switch (e.keyCode) {
    case 39:
      paddle1.x += 30;
    }
  } 

  if (paddle1.x > 0) {
    switch (e.keyCode) {
    case 37:
      paddle1.x -= 30;
    }
  }
}

function gameLoop() {
  ball1.erase(ctx, canvas).drawBall(ctx).bounce(canvas);
  paddle1.erase(ctx).drawPaddle(ctx);
  bricks.forEach(function(brick){
    ctx.fillStyle = "orange";
    ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
  })

  if (ball1.y + ball1.ballRadius >= paddle1.y && 
    ball1.x + ball1.ballRadius > paddle1.x && 
    ball1.x - ball1.ballRadius < paddle1.x + paddle1.width) {
    ball1.dY = -ball1.dY
  } 

  requestAnimationFrame(gameLoop);
}


requestAnimationFrame(gameLoop);



