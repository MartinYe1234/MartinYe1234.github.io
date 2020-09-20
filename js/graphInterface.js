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
    finalisedEdge : 'rgb(181, 68, 0)'
};
var primary = -1; // used for adding edges
var secondary = -1;

function initialiseScreen() {
    canvas = document.getElementById("screen");
    context = canvas.getContext("2d");
    interval = setInterval(draw, 200);
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
    myGraph.drawGraph(context);
}

function toggleMode(){
    if (this.value === "Add Node"){
        mode = "addnode";
    }
    else if (this.value === "Add Edge"){
        mode = "addedge";
    }
    else if (this.value === "Delete Edge"){
        mode = "deledge";
    }
    else if (this.value === "Target Node"){
        mode = "selecttarget";
    }
}

// determine what happens everytime the user clicks within the canvas
function canvasEvents(e){
    let mouseX = e.clientX - canvas.offsetLeft, mouseY = e.clientY - canvas.offsetTop;
    if(mode == "addnode"){
        if(!myGraph.updateNodeStates(mouseX, mouseY)){ // when adding nodes, they can not be within each other
            let new_node = new Node(nodeName, mouseX, mouseY);
            myGraph.addNode(new_node);
            nodeName++;
        };
        
    }
    else if(mode == "addedge"){
        if(myGraph.updateNodeStates(mouseX, mouseY)){
            myGraph.nodes.forEach(function(node){
                if(primary == -1 && node.state == "selected"){
                    primary = node;
                }                    
                else if(primary != -1 && primary != node && node.state == "selected"){
                    secondary = node;
                }
                if (primary != -1 && secondary != -1){  //add the edge and reset primary and secondary
                    newEdge = new Edge(primary, secondary)
                    if (myGraph.edgeList.indexOf(newEdge) == -1){
                        myGraph.addEdge(newEdge);
                    }  // no duplicate edges allowed 
                    primary.toggleState("unselected");
                    secondary.toggleState("unselected");
                    primary = -1;
                    secondary = -1;
                }
            });// loop through each node in all nodes of the graph
        }
    }
    else if(mode == "deledge"){
        if(myGraph.updateNodeStates(mouseX, mouseY)){
            myGraph.nodes.forEach(function(node){
                if(primary == -1 && node.state == "selected"){
                    primary = node;
                }                    
                else if(primary != -1 && primary != node && node.state == "selected"){
                    secondary = node;
                }
                if (primary != -1 && secondary != -1){  //add the edge and reset primary and secondary
                    edge=1;
                    myGraph.edgeList.forEach(function(edge){
                        if(((edge.u==primary)&&(edge.v==secondary))||((edge.u==secondary)&&(edge.v==primary))){
                            myGraph.delEdge(edge);
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

}