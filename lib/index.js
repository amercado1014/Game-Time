var Ball = require('./Ball.js');
var Paddle = require('./Paddle.js')

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var ball1 = new Ball(185, 10, 10, 2, 2); 
var paddle1 = new Paddle(200, canvas.height-20, 50, 10);

window.addEventListener('keyup', movePaddle)
// movePaddle();

function movePaddle(e){
      alert(e.keyCode);
  // e.preventDefault();
  // switch(e.keycode) {

      // case 37:
      //   this.x -= 1;
      //   break;
      // case 39:
      //   this.x += 1;
      //   break;
    // }
}

function gameLoop(){
  ball1.erase(ctx, canvas).drawBall(ctx).bounce(canvas);
  paddle1.erase(ctx).drawPaddle(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);



