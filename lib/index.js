var Ball = require('./Ball.js');
var Paddle = require('./Paddle.js');
var Brick = require('./Brick.js');

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var startScreen = document.querySelector('.start-screen');
var startButton = document.querySelector('.start-button');
var gameOverScreen = document.querySelector('.game-over-screen');
var restartButton = document.querySelector('.restart-button');
var winScreen = document.querySelector('.win-screen');
var winRestartButton = document.querySelector('.win-restart-button');

window.focus();
window.addEventListener('keyup', movePaddle);  
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
winRestartButton.addEventListener('click', restartGame);

var ball1 = new Ball(420, 560, 15, 5, 5);
var ball2 = new Ball(420, 560, 13, 2, 2);
var ball3 = new Ball(420, 560, 10, 2, 2); 
var paddle = new Paddle(375, canvas.height - 50, 300, 20);

var brick = new Brick(null, null);

var bricksArray1 = brick.buildBricksArray(6, 1);
var bricksArray2 = brick.buildBricksArray(6, 1);
var bricksArray3 = brick.buildBricksArray(6, 1);

function startGame() {
  startScreen.style.display = 'none';
  canvas.style.display = 'block';
  ball1.playing = true;
  gameLoop(ball1, bricksArray1);
}

function restartGame() {
  resetBalls();
  paddle.x = 180;
  gameOverScreen.style.visibility = 'hidden';
  winScreen.style.visibility = 'hidden';
  resetBricksArrays();
  gameLoop(ball1, bricksArray1);
}

function resetBalls() {
  ball1.playing = true;
  ball1.x = 185;
  ball1.y = 350;
  ball2.x = 185;
  ball2.y = 350;
  ball3.x = 185;
  ball3.y = 350;
  ball1.lives = 3;
  ball2.lives = 3;
  ball3.lives = 3;
  ball1.dY = -ball1.dY;
  ball2.dY = -ball2.dY;
}

function resetBricksArrays() {
  bricksArray1.forEach(function(brick) { 
    brick.hit = false;
  });
  bricksArray2.forEach(function(brick) { 
    brick.hit = false;
  });
  bricksArray3.forEach(function(brick) { 
    brick.hit = false;
  });
}

function levelTwo() {
  var bricksLeft = bricksArray1.filter(function(brick) {
    return brick.hit === false
  })

  if (bricksLeft.length === 0) {
    ball1.playing = false;
    ball2.playing = true;
    paddle.width = 150;
    gameLoop(ball2, bricksArray2);
  }
}

function levelThree() {
  var bricksLeft = bricksArray2.filter(function(brick) {
    return brick.hit === false
  })

  if (bricksLeft.length === 0) {
    ball2.playing = false;
    ball3.playing = true;
    paddle.width = 100;
    gameLoop(ball3, bricksArray3);
  }
}

function winning() {
  var bricksLeft = bricksArray3.filter(function(brick) {
    return brick.hit === false
  })

  if (bricksLeft.length === 0) {
    ball3.playing = false;
    winScreen.style.visibility = 'visible'
  }
}

function movePaddle(e) {
  if (paddle.x < canvas.width - paddle.width) {
    switch (e.keyCode) {
    case 39:
      paddle.x += 50;
    }
  } 

  if (paddle.x > 0) {
    switch (e.keyCode) {
    case 37:
      paddle.x -= 50;
    }
  }
}

function drawLevel(level) {
  ctx.fillStyle = "#AE3CD5";
  ctx.font = "25px Poppins";
  ctx.fillText("Level: " + level, 750, 30)
}

function gameLoop(ball, bricksArray) {
  ball.erase(ctx, canvas).drawBall(ctx).bounce(canvas).drawLives(ctx);
  paddle.erase(ctx).drawPaddle(ctx).paddleCollision(ball);
  brick.drawBrick(bricksArray, ctx);
  brick.brickCollision(bricksArray, ball);
  brick.drawScore(ctx, bricksArray1, bricksArray2, bricksArray3);
  drawLevel('');
  if (ball1.playing === true) { 
    requestAnimationFrame(function() {gameLoop(ball1, bricksArray1)});
    levelTwo();
    drawLevel('1');
  }
  if (ball2.playing === true) { 
    requestAnimationFrame(function() {gameLoop(ball2, bricksArray2)});
    levelThree();
    drawLevel('2');
  }
  if (ball3.playing === true) { 
    requestAnimationFrame(function() {gameLoop(ball3, bricksArray3)});
    winning();
    drawLevel('3');
  }
}
