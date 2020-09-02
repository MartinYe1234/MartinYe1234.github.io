var canvas; // stores canvas
var context; // stores context
// split canvas up to a 24x24 grid, each containing the position and state of the grid
// stored as [[x,y],state], where x and y is top left of grid
// state -1 means empty, state 0 means food, state 1 means snake occupied
var gameGrid = [];
var playerScore = 0;
var travelSpeed = 0.3 * 1.04 ** playerScore; // speed at which snake moves is based on playerScore
var foodPlaced = false; // if a Food Object exists
var foodImage= new Image(25, 25);
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
  constructor(img, x, y) {
    this.img = img;
    this.x = x;
    this.y = y;
  }
  update(ctx, foodPlaced) {
		var x=genInt(), y=genInt();
		var foodX=gameGrid[x][y][0][0], foodY=gameGrid[x][y][0][1]; // generate position to place food piece
    // determine if food needs to be placed
    if (foodPlaced == false){
			food = new Food(foodImage, foodX, foodY);
			gameGrid[foodX][foodY][1] = 0; // set to 0 to show that a food has been placed on this tile
		}
		// draw food on canvas	
		ctx.drawImage(food.img, foodX, foodY);
		foodPlaced = true;
		alert("runs");
  }
}

// function used to initiliaze necessary items on page load
function startGame(){
	canvas = document.getElementById("game"); // stores canvas
	context = canvas.getContext("2d"); // stores context
  var interval = setInterval(draw, 2); // set the refresh rate of the canvas
  canvas.addEventListener('keydown', eventHandler, false); // add event listners
  // create our game piece
  generateGrid();
  snake = new Snake('red', 25, 25, 0, 25, [0, 0], 1);
	foodImage.src = "../images/snakeFood.png";// load in images
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
  //clear screen everytime
  context.clearRect(0, 0, canvas.width, canvas.height);
  snake.draw(context);
  snake.update();
  food.update(context, foodPlaced);
}