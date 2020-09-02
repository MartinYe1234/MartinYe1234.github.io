var canvas = document.getElementById("game"); // stores canvas
var context = canvas.getContext("2d"); // stores context
// split canvas up to a 24x24 grid, each containing the position and state of the grid
var gameGrid = []; // stored as [[x,y],state], where x and y is top left of grid, state describes what goes on in the grid
var playerScore = 0;
var travelSpeed = 0.2 * 1.04 ** playerScore; // speed at which snake moves is based on playerScore
var foodPlaced = true; // if a Food Object exists
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

class Food {
  constructor(color, sideLength, x, y) {
    this.color = color;
    this.sideLength = sideLength;
    this.x = x;
    this.y = y;
  }
  update(ctx, foodPlaced) {
    // determine if food needs to be placed
    if (foodPlaced == false){food = new Food('red', 25, gameGrid[genInt()][genInt()][0][0],gameGrid[genInt()][genInt()][0][1]);}
    // draw food on canvas
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.sideLength, this.sideLength);
  }
}

// function used to initiliaze necessary items on page load
function startGame() {
	alert("startgame runs");
  var interval = setInterval(draw, 2); // set the refresh rate of the canvas
  canvas.addEventListener('keydown', eventHandler, false); // add event listners
  // create our game piece
  generateGrid();
  snake = new Snake('red', 25, 25, 0, 25, [0, 0], 1);
  food = new Food('red', 25, gameGrid[genInt()][genInt()][0][0],gameGrid[genInt()][genInt()][0][1]);
}

// generates a random integer between 0 and 23 inclusive
function genInt(){
  var min = 0;
  var max = 23;
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// handles all keyboard events
function eventHandler(e) {
  if (e.keyCode == 87) {
    snake.velocity = [0, travelSpeed]
  } // w key
  if (e.keyCode == 83) {
    snake.velocity = [0, -travelSpeed]
  } // s key
  if (e.keyCode == 65) {
    snake.velocity = [-travelSpeed, 0]
  } // a key
  if (e.keyCode == 68) {
    snake.velocity = [travelSpeed, 0]
  } // d key
}

function generateGrid() {
  for (let i = 0; i < 24; i++) {
    gameGrid[i] = [];
    for (let j = 0; j < 24; j++) {
      gameGrid[i][j] = [];
      gameGrid[i][j] = [[j * 25, i * 25], -1] // reversed so rows will be together
    }
  }
}

// our draw function that constantly updates our canvas
function draw() {
	alert("draw runs");
  //clear screen everytime
  context.clearRect(0, 0, canvas.width, canvas.height);
  snake.draw(context);
  snake.update();
  food.update(context, foodPlaced);
	alert("evertything runs");
}