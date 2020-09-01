var canvas; // initialise canvas
var context; // initialise context
//this is the player
class Snake {
  constructor(color, width, height, x, y, velocity) {
    this.color = color;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.velocity = velocity; // velocity is a list [x,y], representing x and y components of the snakes velocity
    this.vx = this.velocity[0];
    this.vy = -this.velocity[1]; // this is done so that a negative velocity will move player down the screen
  }
  update(){
  	//update our position
  	this.y += this.vy;
    this.x += this.vx;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

// function used to initiliaze necessary items on page load
function startGame() {
	// create a canvas, context, dimensions and event listeners
  canvas = document.createElement("canvas");
  canvas.width = 250;
  canvas.height = 250;
  context = canvas.getContext("2d");
  document.body.insertBefore(this.canvas, null);
  interval = setInterval(draw, 2);
  canvas.addEventListener('keydown', eventHandler, false);
  canvas.addEventListener('keyup', eventHandler, false);
	canvas.addEventListener('mousedown', eventHandler, false);
  // create our game piece
  player = new Snake('red', 30, 30, 10, 120, [0,0.1]);
}

// our draw function that constantly updates our canvas
function draw() {
  //clear screen everytime
  context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  player.draw(context);
  player.update();
}

function eventHandler(event) {
	var types = event.keyCode;
	alert(types);
}
