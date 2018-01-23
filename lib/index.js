var Ball = require('./Ball.js');

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var ball1 = new Ball(185, 10, 10, 2, 2); 

function gameLoop(){
  ball1.erase(ctx, canvas).drawBall(ctx).bounce(canvas);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);



