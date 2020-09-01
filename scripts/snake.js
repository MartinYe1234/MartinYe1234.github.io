canvas = document.getElementById("game"); // stores canvas
context = canvas.getContext("2d"); // stores context
var gameGrid = []; // split canvas up into sections
//this is the player
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
    var vy = -this.velocity[1]; // this is done so that a negative velocity will 		move player down the screen
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
  canvas.addEventListener('keyup', eventHandler, false);
  // create our game piece
  player = new Snake('red', 30, 30, 10, 120, [0, 0], 1);
}

// our draw function that constantly updates our canvas
function draw() {
  //clear screen everytime
  context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  player.draw(context);
  player.update();
}

function eventHandler(e) {
  if (e.keyCode == 87) {player.velocity = [0, 0.25]} // w key
  if (e.keyCode == 83) {player.velocity = [0, -0.25]} // s key
  if (e.keyCode == 65) {player.velocity = [-0.25, 0]} // a key
  if (e.keyCode == 68) {player.velocity = [0.25, 0]} // d key
}