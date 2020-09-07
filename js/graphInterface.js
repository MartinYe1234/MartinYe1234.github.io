var canvas;
var context;
var mode;
const button;

alert("this works");
function initialiseScreen() {
    alert("runs");
    canvas = document.getElementById("screen");
    context = canvas.getContext("2d");
    interval = setInterval(draw, 200);
    context.canvas.width  = window.innerWidth;
    context.canvas.height = window.innerHeight;
    button = document.querySelector('input');
    button.addEventListner('click', toggleMode, false);
    alert("ran");
}

// our draw function that constantly updates our canvas
function draw() {
    //clear screen everytime
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function toggleMode(){
    alert("run");
    document.getElementById("test").innerHTML = "hello";
    if (button.value === "Add Node"){
        mode = "addnode";
        document.getElementById("test").innerHTML = mode;
    }
    else if (button.value === "Add Edge"){
        mode = "addedge";
        document.getElementById("test").innerHTML = mode;
    }
}