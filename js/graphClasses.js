

class Graph{
	constructor(){
		this.graph = {}
		this.edge_list = []
	}
	addNode(node){
		// Adds a node to the graph
		this.graph[node] = [];
	}
	delEdge(edge){ // unfinished
		let index = this.edge_list.indexOf(edge);
		this.edge_list.splice(edge, 1);
	}
	getGraph(){ // returns graph as adjacency list in the form: dict(u:[[weight,v1],[weight,v2]])
		let keys = Object.keys(this.graph);
		let adjList = {};
		keys.forEach(function(key){
			if(key in Object.keys(adjList)){
				adjList[key] = [];
			} else{
				adjList[key].push(); // incomplete
			}
			
		});
		return adjList;
	}
}
class Node{
	constructor(name, x, y){
		this.name = name;
		this.x = x;
		this.y = y;
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
}