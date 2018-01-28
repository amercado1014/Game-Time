const { assert } = require('chai');
const Paddle = require('../lib/Paddle.js');
// const canvas = require('../lib/index.js')

describe('Paddle', function() {
  var paddle;
  // var canvas;
  // var ctx;
  beforeEach(function() {
    paddle = new Paddle(10, 20, 30, 40);
 
  });

  it('should have x-position, y-position, width and height', function() {
    assert.equal(paddle.x, 10)
    assert.equal(paddle.y, 20)
    assert.equal(paddle.width, 30)
    assert.equal(paddle.height, 40)
  })

  it('should be filled square', function() {
    // var canvas = createCanvas(200, 200);
    // var ctx = canvas.getContext('2d');
    paddle.drawPaddle(ctx);
    assert.equal(ctx.fillStyle, "#94198D")
  })

  it('should have black background square', function(){
    paddle.drawPaddle(ctx);
    assert.equal(ctx.fillStyle, "black")
  })

})

  // it('background square should be black', function(){
    
  //   assert.equal(paddle, object)
  // })

//drawPaddle
//should be drawn
//should have color
  it('should draw paddle on canvas', function() {

  })


  //erase
  //should not be on page

  //paddle collision
  //should change direction


// })
