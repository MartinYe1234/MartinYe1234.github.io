class Graph{
	constructor(){
		this.nodes = []
		this.graph = {} // this is the graph in adjacency list form
		this.edge_list = []
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
		this.edge_list.push(edge);
		let temp_set = new Set(this.edge_list); // ensure no duplicate edges
		this.edge_list = Array.from(temp_set);
	}
	delEdge(edge){
		let nodeU = edge.u.name, nodeV = edge.v.name;
		let index = this.edge_list.indexOf(edge); // delete from edge_list
		this.edge_list.splice(index, 1); 
		let index1 = this.graph[nodeU].indexOf([nodeV, edge.weight]); // delete from adjacency list
		this.graph[nodeU].splice(index1, 1)
		let index2 = this.graph[nodeV].indexOf([nodeU, edge.weight]);
		this.graph[nodeV].splice(index2, 1)
	}
	drawGraph(ctx){
		this.nodes.forEach(function(node){node.draw(ctx)});
		this.edge_list.forEach(function(edge){edge.draw(ctx)});
	}
}
class Node{
	constructor(name, x, y){
		this.name = name;
		this.x = x;
		this.y = y;
	}
	draw(ctx){
		ctx.beginPath();
		ctx.arc(this.x, this.y, 12, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'rgb(0, 22, 121)';
		ctx.fill();
		ctx.lineWidth = 3;
		context.strokeStyle = 'rgb(0, 12, 68)';
		ctx.stroke();
	}
}
class Edge{
	constructor(u, v){
		this.u = u;
		this.v = v;
		let x1 = this.u.x, y1 = this.u.y, x2 = this.v.x, y2 = this.v.y;
		this.weight = ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5;
	}
	get_edge(){
		return this;
	}
	get_edge_data(){
		return [this.u.name, this.v.name, this.weight];
	}
	draw(ctx){
		let x1 = this.edge.u.x, y1 = this.edge.u.y, x2 = this.edge.v.x, y2 = this.edge.v.y;
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.lineWidth = 3;
		context.strokeStyle = 'rgb(0, 12, 68)';
		ctx.stroke();
	}
}