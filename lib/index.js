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
startButton.addEventListener('click', startGame);
upLevelTwoButton.addEventListener('click', startLevelTwo);
upLevelThreeButton.addEventListener('click', startLevelThree);
restartButton.addEventListener('click', restartGame);
winRestartButton.addEventListener('click', restartGame);

var ball = new Ball(420, 560, 15, 5, 5);
var paddle = new Paddle(375, canvas.height - 50, 300, 20);

var brick = new Brick(null, null);
var game = new Game;

var bricksArray = game.buildBricksArray(6, 1, 20, 140, 50);
// var bricksArray2 = game.buildBricksArray(6, 1, 20, 140, 50);
// var bricksArray3 = game.buildBricksArray(6, 1, 20, 140, 50);

function startGame() {
  startScreen.style.display = 'none';
  canvas.style.display = 'block';
  ball.playing = true;
  gameLoop(ball, bricksArray);
  console.log(game)
}

function restartGame() {
  resetBalls();
  paddle.x = 180;
  game.rows = 1;
  gameOverScreen.style.visibility = 'hidden';
  winScreen.style.visibility = 'hidden';
  resetBricksArrays();
  gameLoop(ball, bricksArray);
}

function resetBalls() {
  ball.playing = true;
  ball.x = 185;
  ball.y = 350;
  ball.radius = 15;
  ball.dX = 5;
  ball.dY = 5;
  game.lives = 3;
}

function resetBricksArrays() {
  bricksArray.forEach(function(brick) { 
    brick.hit = false;
  });
  // bricksArray2.forEach(function(brick) { 
  //   brick.hit = false;
  // });
  // bricksArray3.forEach(function(brick) { 
  //   brick.hit = false;
  // });
}

// function upLevel() {
//   var bricksLeft = bricksArray1.filter(function(brick) {
//     return brick.hit === false
//   })

// }

function levelTwo() {
  var bricksLeft = bricksArray.filter(function(brick) {
    return brick.hit === false
  })

  if (bricksLeft.length === 0) {
    ball.playing = false;
    upLevelTwoScreen.style.visibility = 'visible';
  }
}

function startLevelTwo() {
  upLevelTwoScreen.style.visibility = 'hidden';
  ball.playing = true;
  ball.x = 185;
  ball.y = 350;
  ball.radius = 13;
  ball.dX = 6;
  ball.dY = -6;
  bricksArray = game.buildBricksArray(6, 3, 20, 140, 50);
  paddle.width = 150;
  game.lives = 3;
  console.log(bricksArray);
  // resetBricksArrays();
  gameLoop(ball, bricksArray);
}


function levelThree() {
  var bricksLeft = bricksArray.filter(function(brick) {
    return brick.hit === false
  })

  if (bricksLeft.length === 0) {
    ball.playing = false;
    upLevelThreeScreen.style.visibility = 'visible';
  }
}

function startLevelThree() {
  upLevelThreeScreen.style.visibility = 'hidden';
  ball.playing = true;
  ball.x = 185;
  ball.y = 350;
  ball.radius = 10;
  ball.dX = 7;
  ball.dY = -7;
  bricksArray = game.buildBricksArray(6, 6, 20, 140, 50);
  paddle.width = 100;
  game.lives = 3;
  // resetBricksArrays();
  gameLoop(ball, bricksArray);
}

function winning() {
  var bricksLeft = bricksArray.filter(function(brick) {
    return brick.hit === false
  })

  if (bricksLeft.length === 0) {
    ball.playing = false;
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
  ball.erase(ctx, canvas).drawBall(ctx).bounce(canvas, game);
  game.drawLives(ctx)
  // .drawScore(ctx, bricksArray1, bricksArray2, bricksArray3);
  paddle.erase(ctx).drawPaddle(ctx).paddleCollision(ball);
  brick.drawBrick(bricksArray, ctx);
  brick.brickCollision(bricksArray, ball);
  drawLevel('');
  if (ball.radius === 15 && ball.playing === true) { 
    requestAnimationFrame(function() {
      gameLoop(ball, bricksArray)
    });
    levelTwo();
    drawLevel('1');
  }
  if (ball.radius === 13 && ball.playing === true) { 
    requestAnimationFrame(function() {
      gameLoop(ball, bricksArray)
    });
    levelThree();
    drawLevel('2');
  }
  if (ball.radius === 10 && ball.playing === true) { 
    requestAnimationFrame(function() {
      gameLoop(ball, bricksArray)
    });
    winning();
    drawLevel('3');
  }
}
