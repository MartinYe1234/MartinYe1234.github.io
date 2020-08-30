var canvas; // initialise canvas
var context; // initialise context
//this is the player
class Snake {
  constructor(color, width, height, x, y) {
    this.color = color;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }
  update(){
  	this.y -=0.01;
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
  canvas.addEventListener('keydown', eventHandler(event));
  canvas.addEventListener('keyup', eventHandler(event));
  // create our game piece
  player = new Snake('red', 30, 30, 10, 120);
}

// our draw function that constantly updates our canvas
function draw() {
  //clear screen everytime
  context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  //eventHandler(event);
  player.draw(context);
  player.update();
}

function eventHandler(event) {
  console.log(event.type);
}
