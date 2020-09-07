class Graph{
	constructor(){
		this.graph = {}
		this.edge_list = []
	}
	addNode(node){
		// Adds a node to the graph
		this.graph[node] = [];
	}
}
class Node{
	constructor(name, colour, position, state){
		this.name = name
		this.colour = colour
		this.position = position
		this.state = state
	}
}
class Edge{
	constructor(){
		
	}
}