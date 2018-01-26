var Ball = require('./Ball.js');
var Paddle = require('./Paddle.js');
var Brick = require('./Brick.js');

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var startScreen = document.querySelector('.start-screen');
var startButton = document.querySelector('.start-button');

startButton.addEventListener('click', startGame);

function startGame() {
  startScreen.style.display = 'none';
  canvas.style.visibility = 'visible';
  console.log(ball1);
  ball1.playing = true;
  gameLoop();
}

var ball1 = new Ball(185, 350, 10, 2, 2); 
var paddle1 = new Paddle(50, canvas.height - 20, 300, 10);
var brick = new Brick(null, null);

var bricksArray = brick.buildBricksArray(6, 6);

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

var score = 0

function drawScore() {
  ctx.fillStyle = "green";
  ctx.font = "15px Arial";
  ctx.fillText("Score: " + score, 10, 20)
}

function drawLevel() {
  ctx.fillStyle = "green";
  ctx.font = "15px Arial";
  ctx.fillText("Level: 1", 335, 20)
}

function brickCollision() {
  bricksArray.forEach(function(brick) {
    if (brick.hit === false) {
      if (ball1.x - ball1.radius < brick.x + brick.width &&
        ball1.x + ball1.radius > brick.x &&
        ball1.y + ball1.radius > brick.y &&
        ball1.y - ball1.radius < brick.y + brick.height) {
        ball1.dY = -ball1.dY
        brick.hit = true;
        score++
      }
    }
  })
}

function gameLoop() {
  ball1.erase(ctx, canvas).drawBall(ctx).bounce(canvas);
  paddle1.erase(ctx).drawPaddle(ctx).paddleCollision(ball1);
  brick.drawBrick(bricksArray, ctx);
  brickCollision();
  drawScore();
  drawLevel();

  if (ball1.playing === true) { 
    requestAnimationFrame(gameLoop);
  }
}

// requestAnimationFrame(gameLoop);



