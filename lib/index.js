var Ball = require('./Ball.js');
var Paddle = require('./Paddle.js');
var Brick = require('./Brick.js');

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var startScreen = document.querySelector('.start-screen');
var startButton = document.querySelector('.start-button');
var gameOverScreen = document.querySelector('.game-over-screen');
var restartButton = document.querySelector('.restart-button');

window.focus();
window.addEventListener('keyup', movePaddle);
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

function startGame() {
  startScreen.style.display = 'none';
  canvas.style.visibility = 'visible';
  ball1.playing = true;
  gameLoop();
}

function restartGame() {
  ball1.playing = true;
  ball1.x = 185;
  ball1.y = 350;
  paddle1.x = 180;
  ball1.dY = -ball1.dY;
  gameOverScreen.style.visibility = 'hidden';
  gameLoop();
  bricksArray.forEach(function(brick) { 
    brick.hit = false;
  })
}

var ball1 = new Ball(420, 560, 10, 3, 3); 
var paddle1 = new Paddle(375, canvas.height - 50, 200, 20);
var brick = new Brick(null, null);

var bricksArray = brick.buildBricksArray(6, 6);


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

function drawLevel() {
  ctx.fillStyle = "#AE3CD5";
  ctx.font = "25px Poppins";
  ctx.fillText("Level: 1", 750, 30)
}

function gameLoop() {
  ball1.erase(ctx, canvas).drawBall(ctx).bounce(canvas);
  paddle1.erase(ctx).drawPaddle(ctx).paddleCollision(ball1);
  brick.drawBrick(bricksArray, ctx);
  brick.brickCollision(bricksArray, ball1).drawScore(ctx, bricksArray);
  drawLevel();

  if (ball1.playing === true) { 
    requestAnimationFrame(gameLoop);
  }
}