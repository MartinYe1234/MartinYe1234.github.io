var canvas;
var context;
var mode; // used to determine what event should happen when the user clicks on the screen
var myGraph;
var nodeName = 0;
var colours = { // dictionary of colours to represent different the many different statuses of the nodes/edges
    unselectedInnerNode : 'rgb(0, 22, 121)',
    unselectedOuterNode : 'rgb(0, 12, 68)',
    unselectedEdge : 'rgb(0, 12, 68)',
    selectedInnerNode: 'rgb(158, 1, 1)',
    selectedOuterNode : 'rgb(100, 0, 0)',
    selectedEdge : 'rgb(100, 0, 0)',
    finalisedInnerNode : 'rgb(200, 92, 0)',
    finalisedOuterNode : 'rgb(181, 68, 0)',
    finalisedEdge : 'rgb(181, 68, 0)',
    startInner : 'rgb(9, 219, 65)',
    startOuter : 'rgb(5, 166, 48)',
    targetInner : 'rgb(150, 0, 224)',
    targetOuter : 'rgb(106, 0, 158)'
};
var primary = -1; // used for adding edges
var secondary = -1;
var targetNode = -1; // used for graph algorithms
var startNode = -1;
var selectedAlgorithm = "null";

function initialiseScreen() {
    canvas = document.getElementById("screen");
    context = canvas.getContext("2d");
    interval = setInterval(draw, 50);
    context.canvas.width  = window.innerWidth;
    context.canvas.height = window.innerHeight;
    myGraph = new Graph();
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
    if(mode == "run"){
        animateGraph(context, selectedAlgorithm);
    }
    else{
        myGraph.drawGraph(context);
    }
}

// used to handle button inputs
function toggleMode(){
    if (this.value == "Add Node"){
        mode = "addnode";
    }
    else if (this.value == "Add Edge"){
        mode = "addedge";
    }
    else if (this.value == "Delete Edge"){
        mode = "deledge";
    }
    else if (this.value == "Delete Node"){
        mode = "delnode";
    }
    else if (this.value == "Select Start"){
        mode = "setstart";
    }
    else if (this.value == "Select Target"){
        mode = "settarget";
    }
    else if (this.value == "Reset"){
        initialiseScreen();
    }
    else if (this.value == "BFS"){
        selectedAlgorithm = "BFS";
    }
    else if (this.value == "DFS"){
        selectedAlgorithm = "DFS";
    }
    else if (this.value == "tobeadded"){
        selectedAlgorithm = "tobeadded";
    }
    else if (this.value == "Run"){
        mode = "run";
    }
}

// determine what happens everytime the user clicks within the canvas
function canvasEvents(e){
    let mouseX = e.clientX - canvas.offsetLeft, mouseY = e.clientY - canvas.offsetTop;
    if(mode == "addnode"){
        canvasAddNode(myGraph, mouseX, mouseY);
    }
    else if(mode == "addedge"){
        canvasAddEdge(myGraph, mouseX, mouseY);
    }
    else if(mode == "delnode"){
        canvasDelNode(myGraph, mouseX, mouseY);
    }
    else if(mode == "deledge"){
        canvasDelEdge(myGraph, mouseX, mouseY);
    }
    else if(mode == "setstart"){
        canvasSetStart(myGraph, mouseX, mouseY);
    }
    else if(mode == "settarget"){
        canvasSetTarget(myGraph, mouseX, mouseY);
    }
}

/*
Helper Functions for canvasEvents
*/
function canvasAddNode(graph, x, y){
    if(!graph.updateNodeStates(x, y)){ // when adding nodes, they can not be within each other
        let newNode = new Node(nodeName, x, y);
        graph.addNode(newNode);
        nodeName++;
    };
}
function canvasAddEdge(graph, x, y){
    if(graph.updateNodeStates(x, y)){ // a node must be selected
        graph.nodes.forEach(function(node){
            if(primary == -1 && node.state == "selected"){
                primary = node;
            }                    
            else if(primary != -1 && primary != node && node.state == "selected"){
                secondary = node;
            }
            if (primary != -1 && secondary != -1){  //add the edge and reset primary and secondary
                newEdge = new Edge(primary, secondary)
                if (graph.edgeList.indexOf(newEdge) == -1){
                    graph.addEdge(newEdge);
                }  // no duplicate edges allowed 
                primary.toggleState("unselected");
                secondary.toggleState("unselected");
                primary = -1;
                secondary = -1;
            }
        });// loop through each node in all nodes of the graph
    }
}
function canvasDelNode(graph, x, y){
    if(graph.updateNodeStates(x, y)){
        graph.nodes.forEach(function(node){
            if(node.state == "selected"){
                graph.delNode(node);
            }
        });
    }
}
function canvasDelEdge(graph, x, y){
    if(graph.updateNodeStates(x, y)){
        graph.nodes.forEach(function(node){
            if(primary == -1 && node.state == "selected"){
                primary = node;
            }                    
            else if(primary != -1 && primary != node && node.state == "selected"){
                secondary = node;
            }
            if (primary != -1 && secondary != -1){  //add the edge and reset primary and secondary
                edge=1;
                graph.edgeList.forEach(function(edge){
                    if(((edge.u==primary)&&(edge.v==secondary))||((edge.u==secondary)&&(edge.v==primary))){
                        graph.delEdge(edge);
                    }
                }); 
                primary.toggleState("unselected");
                secondary.toggleState("unselected");
                primary = -1;
                secondary = -1;
            }
        });// loop through each node in all nodes of the graph
    }
}
function canvasSetStart(graph, x, y){
    if(graph.updateNodeStates(x, y)){ // if a node was selected
        graph.nodes.forEach(function(node){
            if(node.state == "start"){ // only 1 start node allowed
                node.toggleState("unselected");
            }
            if(node.state == "selected"){
                node.toggleState("start");
                startNode = node;
            }
        });
    }
}
function canvasSetTarget(graph, x, y){
    if(graph.updateNodeStates(x, y)){ // if a node was selected
        graph.nodes.forEach(function(node){
            if(node.state == "target"){ // only 1 target node allowed
                node.toggleState("unselected");
            }
            if(node.state == "selected"){
                node.toggleState("target");
                targetNode = node;
            }
        });
    }
}