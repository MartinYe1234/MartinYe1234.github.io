class Graph{
	constructor(){
		this.nodes = [];
		this.graph = {}; // this is the graph in adjacency list form
		this.edgeList = [];
	}
	addNode(node){
		// Adds a node to the graph
		this.graph[node.name] = [];
		this.nodes.push(node);
	}
	addEdge(edge){ 
		// Adds a bi-directional weighted edge
    	let nodeU = edge.u.name, nodeV = edge.v.name;
		this.graph[nodeU].push([nodeV, edge.weight]);
		this.graph[nodeV].push([nodeU, edge.weight]);
		this.edgeList.push(edge);
		let temp_set = new Set(this.edgeList); // ensure no duplicate edges
		this.edgeList = Array.from(temp_set);
	}
	delNode(node){
		let nodes = this.nodes; // this is required because apparently you can't reference this. inside a foreach function
  		let edgeList = this.edgeList;
    	let graph = this.graph;
		let nodeIndex = this.nodes.indexOf(node); // remove node for nodes list
		nodes.splice(nodeIndex, 1);
		edgeList.forEach(function(edge){ // remove all edges with the node in it
			if((edge.u == node) || (edge.v == node)){
				let edgeIndex = edgeList.indexOf(edge);
				edgeList[edgeIndex] = -1;
			}
		});
		edgeList = edgeList.filter(function(edge){
			if(edge!=-1){
				return edge;
			}
		});
		this.edgeList = edgeList; 
		graph = {}; // remove all mentions of node for the adjacency list, done by rebuilding it from scratch
		nodes.forEach(function(node){
			graph[node.name] = [];
		});
	
		edgeList.forEach(function(edge){
			let nodeU = edge.u.name, nodeV = edge.v.name;
			graph[nodeU].push([nodeV, edge.weight]);
			graph[nodeV].push([nodeU, edge.weight]);
		});
	}
	delEdge(edge){
		let nodeU = edge.u.name, nodeV = edge.v.name;
		let edgeIndex = this.edgeList.indexOf(edge); // delete from edgeList
		this.edgeList.splice(edgeIndex, 1); 
		let index1 = this.graph[nodeU].indexOf([nodeV, edge.weight]); // delete from adjacency list
		this.graph[nodeU].splice(index1, 1)
		let index2 = this.graph[nodeV].indexOf([nodeU, edge.weight]);
		this.graph[nodeV].splice(index2, 1)
	}
	drawGraph(ctx){
		this.nodes.forEach(function(node){node.draw(ctx)});
		this.edgeList.forEach(function(edge){edge.draw(ctx)});
	}
	updateNodeStates(x, y){ // used for updating all node states after mouse click
		// returns whether or not a change occured in the states
		let somethingWasSelected = false;
		this.nodes.forEach(function(node){
			if(node.isSelected(x, y)){ // if the node was selected
				somethingWasSelected = true;
				if (mode != "addnode"){
					node.toggleState("selected");
				}
			}
		});
		return somethingWasSelected;
	}
}
class Node{
	constructor(name, x, y){
		this.name = name;
		this.x = x;
		this.y = y;
		this.radius = 12;
		this.state = "unselected";
		this.innerColour=colours.unselectedInnerNode;
		this.outerColour=colours.unselectedOuterNode;
	}
	draw(ctx){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = this.innerColour; // colouring
		context.strokeStyle = this.outerColour;
		ctx.fill();
		ctx.lineWidth = 3;
		ctx.stroke();
	}
	toggleState(state){
		if(state == "selected"){
			this.innerColour = colours.selectedInnerNode;
			this.outerColour = colours.selectedOuterNode;
			this.state = "selected";
		}
		else if(state == "final"){
			this.innerColour = colours.finalisedInnerNode;
			this.outerColour = colours.finalisedOuterNode;
			this.state = "final";
		}
		else if(state = "unselected"){
			this.innerColour = colours.unselectedInnerNode;
			this.outerColour = colours.unselectedOuterNode;
			this.state = "unselected";
		}
	}
	isSelected(x, y){ // determine if the player clicked on a node, calculated using click position and size of the node
		let distance = ((this.x-x)**2 + (this.y-y)**2)**0.5;
		return (distance <= (this.radius+5))
	}
}
class Edge{
	constructor(u, v){
		this.u = u;
		this.v = v;
		let x1 = this.u.x, y1 = this.u.y, x2 = this.v.x, y2 = this.v.y;
		this.weight = ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5;
		this.colour = colours.unselectedEdge;
	}
	getEdge(){
		return this;
	}
	getEdgeData(){
		return [this.u.name, this.v.name, this.weight];
	}
	draw(ctx){
		let x1 = this.u.x, y1 = this.u.y, x2 = this.v.x, y2 = this.v.y;
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.lineWidth = 3;
		context.strokeStyle = this.colour;
		ctx.stroke();
	}
}