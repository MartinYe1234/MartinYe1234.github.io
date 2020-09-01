canvas = document.getElementById("game"); // stores canvas
context = canvas.getContext("2d"); // stores context
var gameGrid = []; // split canvas up a 24x24 grid of 25 pixel squares
var playerScore = 0;
var travelSpeed = 0.2*1.04**playerScore; // speed at which snake moves is based on playerScore
//this is the snake
class Snake {
  constructor(color, width, height, x, y, velocity, length) {
    this.color = color;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.velocity = velocity; // velocity is a list [x,y], representing x and y components of the snakes velocity
		this.length = length;

  }
  update() {
    var vx = this.velocity[0];
    var vy = -this.velocity[1]; // this is done so that a negative velocity will 		move snake down the screen
    //update our position
    this.y += vy;
    this.x += vx;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

// function used to initiliaze necessary items on page load
function startGame() {
  interval = setInterval(draw, 2); // set the refresh rate of the canvas
  canvas.addEventListener('keydown', eventHandler, false); // add event listners
  // create our game piece
  snake = new Snake('red', 30, 30, 10, 120, [0, 0], 1);
}

// our draw function that constantly updates our canvas
function draw() {
  //clear screen everytime
  context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  snake.draw(context);
  snake.update();
}

function eventHandler(e) {
  if (e.keyCode == 87) {snake.velocity = [0, travelSpeed]} // w key
  if (e.keyCode == 83) {snake.velocity = [0, -travelSpeed]} // s key
  if (e.keyCode == 65) {snake.velocity = [-travelSpeed, 0]} // a key
  if (e.keyCode == 68) {snake.velocity = [travelSpeed, 0]} // d key
}