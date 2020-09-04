var canvas; // stores canvas
var context; // stores context
// split canvas up to a 24x24 grid, each containing the position and state of the grid
// stored as [[x,y],state], where x and y is top left of grid
// state -1 means empty, state 0 means food, state 1 means snake occupied
var gameGrid = [];
var eventQueue = [];
var travelSpeed = 1; // speed at which snake moves is based on playerScore
var foodImage = new Image(25, 25);
var timeToMove = 1;
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
    if (timeToMove < 0) {
      timeToMove = 1;
      eventHandler(eventQueue.shift());
      let vx = this.velocity[0];
      let vy = -this.velocity[1]; // this is done so that a negative velocity will 		move snake down the screen
      //update our position
      let previousGrid = JSON.parse(JSON.stringify(this.positioning));
      let headX = previousGrid[0][0],
        headY = previousGrid[0][1]; // head of the snake
      headY += vy;
      headX += vx; // positioning must be changed// this if can be removed
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
  constructor(gridX, gridY) {
    this.img = foodImage;
    this.gridX = gridX;
    this.gridY = gridY;
  }
  update(ctx) {
    let foodX = gameGrid[this.gridX][this.gridY][0][0],
      foodY = gameGrid[this.gridX][this.gridY][0][1]; // generate position to place food piece
    // draw food on canvas	
    ctx.drawImage(food.img, foodX, foodY);
  }
}

// function used to initiliaze necessary items on page load
function startGame() {
  canvas = document.getElementById("game"); // stores canvas
  context = canvas.getContext("2d"); // stores context
  interval = setInterval(draw, 2); // set the refresh rate of the canvas
  canvas.addEventListener('keydown', function(e) {
    eventQueue.push(e.key);
  }, false); // add event listners
  // create our game piece
  generateGrid();
  foodImage.src = "https://i.imgur.com/stVhVK1.png"; // load in images
  snake = new Snake('red', 25, 11, 11, [0, 0]);
  food = new Food(genInt(), genInt());
}

// generates a random integer between 0 and 23 inclusive
function genInt() {
  var min = 0;
  var max = 23;
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// handles all keyboard events
function eventHandler(e) {
  if ((e == "w") && (snake.velocity[0] <= 0)) {
    snake.velocity = [-travelSpeed, 0]
  } // w key
  else if ((e == "s") && (snake.velocity[0] >= 0)) {
    snake.velocity = [travelSpeed, 0]
  } // s key
  else if ((e == "a") && (snake.velocity[1] >= 0)) {
    snake.velocity = [0, travelSpeed]
  } // a key
  else if ((e == "d") && (snake.velocity[1] <= 0)) {
    snake.velocity = [0, -travelSpeed]
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
  food.update(context);
  updateGame(snake, food);
}

function equals(p1, p2) { // checks for collisions
  return JSON.stringify(p1) == JSON.stringify(p2);
}

function updateGame(player, food) { // checks for collisions
  // for movement of snake
  timeToMove -= (1.1 ** snake.positioning.length) / 100;
  // check if snake eats food
  if (equals(player.positioning[0], [food.gridX, food.gridY])) {
    food.gridX = genInt();
    food.gridY = genInt();
    let last = player.positioning[player.positioning.length - 1];
    player.positioning.push(last);
  }
  // check if the player dies, occurs when player strikes themselves
  if (player.positioning.length > 4) { //only possible when player is longer than 4 	
  let head = player.positioning[0];
    for (let i = 3; i < player.positioning.length; i++) {
			if(equals(head, player.positioning[i])){
      	startGame();
      }
    }
  }

}
