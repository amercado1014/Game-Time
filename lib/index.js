var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

console.log('working');


var x = 185;
var y = 10;
var dX = 2;
var dY = 2;
var ballRadius = 10;

function drawCircle() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
}

function gameLoop(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawCircle();
    x += dX;
    y += dY;

    if (x + dX > canvas.width - 10 || x + dX < 10){
      dX = -dX
    }

    if (y + dY > canvas.width - 10 || y + dY < 10){
      dY = -dY
    }

requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);



