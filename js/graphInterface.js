var canvas;
var context;
var mode;

function initialiseScreen() {
    canvas = document.getElementById("game");
    context = canvas.getContext("2d");
    interval = setInterval(draw, 200);
    context.canvas.width  = window.innerWidth;
    context.canvas.height = window.innerHeight;
}

// our draw function that constantly updates our canvas
function draw() {
    //clear screen everytime
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function toggleMode(){
    
}