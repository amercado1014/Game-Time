var Ball = require('./Ball.js');
var Paddle = require('./Paddle.js');
var Brick = require('./Brick.js');
var Game = require('./Game.js');

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var startScreen = document.querySelector('.start-screen');
var startButton = document.querySelector('.start-button');
var upLevelTwoScreen = document.querySelector('.level-2-screen');
var upLevelThreeScreen = document.querySelector('.level-3-screen');
var upLevelTwoButton = document.querySelector('.up-level-2-button');
var upLevelThreeButton = document.querySelector('.up-level-3-button');
var gameOverScreen = document.querySelector('.game-over-screen');
var restartButton = document.querySelector('.restart-button');
var winScreen = document.querySelector('.win-screen');
var winRestartButton = document.querySelector('.win-restart-button');

window.focus();
window.addEventListener('keyup', movePaddle);
window.addEventListener('keydown', pauseGame);  
startButton.addEventListener('click', startGame);
upLevelTwoButton.addEventListener('click', startLevelTwo);
upLevelThreeButton.addEventListener('click', startLevelThree);
restartButton.addEventListener('click', restartGame);
winRestartButton.addEventListener('click', restartGame);
winRestartButton.addEventListener('click', resetHighScore);

var ball = new Ball(140, 100, 15, 5, 5);
var paddle = new Paddle(375, canvas.height - 50, 300, 20);
var brick = new Brick(null, null);
var game = new Game;
var bricksArray = game.buildBricksArray(6, 6, 20, 140, 50);

function startGame() {
  startScreen.style.display = 'none';
  canvas.style.display = 'block';
  ball.playing = true;
  resetHighScore();
  gameLoop();
}

function resetHighScore() {
  localStorage.clear();
  var objectToStore = {HighScore: 0};
  var stringifiedObject = JSON.stringify(objectToStore);

  localStorage.setItem("Stored Score", stringifiedObject);
}

function restartGame() {
  resetBalls();
  paddle.x = 180;
  paddle.width = 300;
  ball.radius = 15;
  ball.dX = 5;
  ball.dY = -5;
  game.score = 0;
  game.highScore = 0;
  bricksArray = game.buildBricksArray(6, 2, 20, 140, 50);
  gameOverScreen.style.visibility = 'hidden';
  winScreen.style.visibility = 'hidden';
  gameLoop();
}

function resetBalls() {
  ball.playing = true;
  ball.x = 185;
  ball.y = 350;
  game.lives = 3;
}

function upLevel() {
  var bricksLeft = bricksArray.filter(function(brick) {
    return brick.hit === false
  });

  if (bricksLeft.length === 0 && ball.radius === 15) {
    ball.playing = false;
    upLevelTwoScreen.style.visibility = 'visible';
  } else if (bricksLeft.length === 0 && ball.radius === 13) {
    ball.playing = false;
    upLevelThreeScreen.style.visibility = 'visible';
  } else if (bricksLeft.length === 0 && ball.radius === 10) {
    ball.playing = false;
    winScreen.style.visibility = 'visible'
  }

  if (game.lives === 1 && ball.y > 680) {
    gameOverScreen.style.visibility = 'visible';
  }
}

function startLevelTwo() {
  resetBalls();
  upLevelTwoScreen.style.visibility = 'hidden';
  ball.radius = 13;
  ball.dX = 5;
  ball.dY = -5;
  paddle.width = 150;
  bricksArray = game.buildBricksArray(6, 3, 20, 140, 50);
  gameLoop();
}

function startLevelThree() {
  resetBalls();
  upLevelThreeScreen.style.visibility = 'hidden';
  ball.radius = 10;
  ball.dX = 5;
  ball.dY = -5;
  paddle.width = 100;
  bricksArray = game.buildBricksArray(6, 4, 20, 140, 50);
  gameLoop();
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

function pauseGame(e) {
  switch (e.keyCode) {
  case 32:
    if (ball.playing === false) {
      ball.playing = true;
      gameLoop();
    } else if (ball.playing === true) {
      ball.playing = false
    }
  }
}

function drawLevel(level) {
  ctx.fillStyle = "#AE3CD5";
  ctx.font = "25px Poppins";
  ctx.fillText("Level: " + level, 750, 30)
}

function gameLoop() {
  ball.erase(ctx, canvas).drawBall(ctx).bounce(game);
  game.drawLives(ctx).drawScore(ctx).drawHighScore(ctx);
  paddle.erase(ctx).drawPaddle(ctx).paddleCollision(ball);
  brick.drawBrick(bricksArray, ctx).brickCollision(bricksArray, ball, game);
  drawLevel('');
  if (ball.radius === 15 && ball.playing === true) { 
    requestAnimationFrame(gameLoop);
    upLevel();
    drawLevel('1');
  }
  if (ball.radius === 13 && ball.playing === true) { 
    requestAnimationFrame(gameLoop);
    upLevel();
    drawLevel('2');
  }
  if (ball.radius === 10 && ball.playing === true) { 
    requestAnimationFrame(gameLoop);
    upLevel();
    drawLevel('3');
  }
}
