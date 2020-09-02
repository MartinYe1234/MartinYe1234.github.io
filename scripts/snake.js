var canvas; // stores canvas
var context; // stores context
// split canvas up to a 24x24 grid, each containing the position and state of the grid
// stored as [[x,y],state], where x and y is top left of grid
// state -1 means empty, state 0 means food, state 1 means snake occupied
var gameGrid = [];
var playerScore = 0;
var travelSpeed = 1; // speed at which snake moves is based on playerScore
var foodPlaced = true; // if a Food Object exists
var foodImage = new Image(25, 25);
//this is the snake
class Snake {
  constructor(color, sideLength, gridX, gridY, velocity) {
    this.color = color;
    this.sideLength = sideLength;
    this.gridX = gridX;
    this.gridY = gridY;
    this.velocity = velocity; // velocity is a list [x,y], representing x and y components of the snakes velocity
    this.positioning = [
      [this.gridX, this.gridY]
    ];

  }
  update() {
    var vx = this.velocity[0];
    var vy = -this.velocity[1]; // this is done so that a negative velocity will 		move snake down the screen
    //update our position
    let previousGrid = JSON.parse(JSON.stringify(this.positioning));
    let headX = previousGrid[0][0],
      headY = previousGrid[0][1]; // head of the snake
    headY += vx;
    headX += vy; // positioning must be changed// this if can be removed
    if (this.positioning.length == 1) {
      this.positioning[0] = [headX, headY];
    } else { // for all lengths greater than 1
      for (let i = 0; i < this.positioning.length; i++) { // update positioning
        if (i == 0) {
          this.positioning[0] = [headX, headY];
        } else {
          this.positioning[i] = [previousGrid[i - 1][0], previousGrid[i - 1][1]];
        }
      }
    }
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    for (let i = 0; i < this.positioning.length; i++) {
      var gridX = this.positioning[i][0],
        gridY = this.positioning[i][1];
      var x = gameGrid[gridX][gridY][0][0],
        y = gameGrid[gridX][gridY][0][1];
      ctx.fillRect(x, y, this.sideLength, this.sideLength);
    }

  }
}

class Food {
  constructor(x, y) {
    this.img = foodImage;
    this.x = x;
    this.y = y;
  }
  update(ctx, foodPlaced) {

    // determine if food needs to be placed
    if (foodPlaced == false) {
      var x = genInt(),
        y = genInt();
      var foodX = gameGrid[x][y][0][0],
        foodY = gameGrid[x][y][0][1]; // generate position to place food piece
      food = new Food(foodX, foodY);
      gameGrid[foodX][foodY][1] = 0; // set to 0 to show that a food has been placed on this tile
    }
    // draw food on canvas	
    ctx.drawImage(food.img, food.x, food.y);
    foodPlaced = true;
  }
}

// function used to initiliaze necessary items on page load
function startGame() {
  canvas = document.getElementById("game"); // stores canvas
  context = canvas.getContext("2d"); // stores context
  interval = setInterval(draw, 500); // set the refresh rate of the canvas
  canvas.addEventListener('keydown', eventHandler, false); // add event listners
  // create our game piece
  generateGrid();
  foodImage.src = "../images/snakeFood.png"; // load in images
  snake = new Snake('red', 25, 1, 2, [0, 0]);
  snake.positioning.push([1, 1]);
  snake.positioning.push([1, 0]);
  food = new Food(0, 0);
}

// generates a random integer between 0 and 23 inclusive
function genInt() {
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
      gameGrid[i][j] = [
        [j * 25, i * 25], -1
      ] // reversed so rows will be together
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