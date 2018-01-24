var Ball = require('./Ball.js');
var Paddle = require('./Paddle.js')

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var ball1 = new Ball(185, 10, 10, 2, 2); 
var paddle1 = new Paddle(200, canvas.height - 20, 50, 10);

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
  // movePaddle();

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);



