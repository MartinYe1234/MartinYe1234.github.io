var canvas;
var context;
var mode;
var myGraph = new Graph();
var nodeName = 0;

function initialiseScreen() {
    canvas = document.getElementById("screen");
    context = canvas.getContext("2d");
    interval = setInterval(draw, 200);
    context.canvas.width  = window.innerWidth;
    context.canvas.height = window.innerHeight;
    let buttons = document.querySelectorAll('input');
    buttons.forEach(function(button){
        button.addEventListener('click', toggleMode, false);
    });
    canvas.addEventListener('click', canvasEvents, false);
}

// our draw function that constantly updates our canvas
function draw() {
    //clear screen everytime
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function toggleMode(){
    if (this.value === "Add Node"){
        mode = "addnode";
    }
    else if (this.value === "Add Edge"){
        mode = "addedge";
    }
}

// determine what happens everytime the user clicks within the canvas
function canvasEvents(e){
    if(mode == "addnode"){
        let mouseX = e.pageX, mouseY = e.pageY;
        let new_node = new Node(node_name, mouseX, mouseY);
        myGraph.addNode(new_node);
    }
    if(mode == "addedge"){
        alert(myGraph.graph);
    }
}