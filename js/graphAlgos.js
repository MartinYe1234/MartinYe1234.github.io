function bfs(graph, start, target){ // runs bfs and recieves graph as an adjacency list
    let orderVisited = [start]; // used for the animation of bfs, contains pairs of nodes, in order that they were visited
    let queue = [start];
    let visited = {}; // visited dictionary
    graph.nodes.forEach(function(node){visited[node.name] = 0});
    while(queue.length != 0){
        let current = queue.shift(); // dequeue
        visited[current] = 1;// mark as visited
        graph[current].forEach(function(adjacent){
            let adjacentNode = adjacent[0];
            order_visited.push([current, adjacent_node]);
            if(adjacentNode == target){
                return order_visited;
            }
            if(!visited[adjacent_node]){
                queue.push(adjacent_node);
            }
        });   
    }
    return orderVisited;
}   

function animateBfs(){

}
function dfs(graph, start){
    let order_visited = [start];
}
