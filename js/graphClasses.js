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
}
class Node{
	constructor(name, pos, state){
		this.name = name;
		this.position = pos;
		this.state = state;
	}
}
class Edge{
	constructor(u, v){
		this.u = u;
		this.v = v;
		let x1 = this.u.pos[0], y1 = this.u.pos[1], x2 = this.v.pos[0], y2 = this.v.pos[1];
		this.weight = ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5;
	}
	get_edge(){
		return this;
	}
	get_edge_data(){
		return [this.u.name, this.v.name, this.weight];
	}
}