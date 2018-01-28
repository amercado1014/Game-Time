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

function startGame() {
  startScreen.style.display = 'none';
  canvas.style.visibility = 'visible';
  ball1.playing = true;
  gameLoop1();
}

function restartGame() {
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
  paddle1.x = 180;
  ball2.dY = -ball2.dY;
  gameOverScreen.style.visibility = 'hidden';
  winScreen.style.visibility = 'hidden';
  bricksArray1.forEach(function(brick) { 
    brick.hit = false;
  });
  bricksArray2.forEach(function(brick) { 
    brick.hit = false;
  });
  bricksArray3.forEach(function(brick) { 
    brick.hit = false;
  });
  gameLoop1();
}

function levelTwo() {
  var bricksLeft = bricksArray1.filter(function(brick) {
    return brick.hit === false
  })

  if (bricksLeft.length === 0) {
    ball1.playing = false;
    ball2.playing = true;
    gameLoop2()
  }
}

function levelThree() {
  var bricksLeft = bricksArray2.filter(function(brick) {
    return brick.hit === false
  })

  if (bricksLeft.length === 0) {
    ball2.playing = false;
    ball3.playing = true;
    gameLoop3()
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

var ball1 = new Ball(420, 560, 15, 5, 5);
var ball2 = new Ball(420, 560, 13, 5, 5);
var ball3 = new Ball(420, 560, 10, 6, 6) 
var paddle1 = new Paddle(375, canvas.height - 50, 300, 20);
var brick = new Brick(null, null);

var bricksArray1 = brick.buildBricksArray(6, 1);
var bricksArray2 = brick.buildBricksArray(6, 1);
var bricksArray3 = brick.buildBricksArray(6, 1);


function movePaddle(e) {
  if (paddle1.x < canvas.width - paddle1.width) {
    switch (e.keyCode) {
    case 39:
      paddle1.x += 50;
    }
  } 

  if (paddle1.x > 0) {
    switch (e.keyCode) {
    case 37:
      paddle1.x -= 50;
    }
  }
}

function drawLevel(level) {
  ctx.fillStyle = "#AE3CD5";
  ctx.font = "25px Poppins";
  ctx.fillText("Level: " + level, 750, 30)
}

function gameLoop1() {
  ball1.erase(ctx, canvas).drawBall(ctx).bounce(canvas).drawLives(ctx);
  paddle1.erase(ctx).drawPaddle(ctx).paddleCollision(ball1);
  brick.drawBrick(bricksArray1, ctx);
  brick.brickCollision(bricksArray1, ball1).drawScore(ctx, bricksArray1);
  levelTwo();
  drawLevel('1');
  if (ball1.playing === true) { 
    requestAnimationFrame(gameLoop1);
  }
}

function gameLoop2() {
  ball2.erase(ctx, canvas).drawBall(ctx).bounce(canvas).drawLives(ctx);
  paddle1.erase(ctx).drawPaddle(ctx).paddleCollision(ball2);
  brick.drawBrick(bricksArray2, ctx);
  brick.brickCollision(bricksArray2, ball2).drawScore(ctx, bricksArray2);
  levelThree();
  drawLevel('2');
  if (ball2.playing === true) { 
    requestAnimationFrame(gameLoop2);
  }
}

function gameLoop3() {
  ball3.erase(ctx, canvas).drawBall(ctx).bounce(canvas).drawLives(ctx);
  paddle1.erase(ctx).drawPaddle(ctx).paddleCollision(ball3);
  brick.drawBrick(bricksArray3, ctx);
  brick.brickCollision(bricksArray3, ball3).drawScore(ctx, bricksArray3);
  winning();
  drawLevel('3');
  if (ball3.playing === true) { 
    requestAnimationFrame(gameLoop3);
  }
}
