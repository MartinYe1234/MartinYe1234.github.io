function bfs(graph, start){ // runs bfs and recieves graph as an adjacency list
    let order_visited = [start]; // used for the animation of bfs, contains pairs of nodes, in order that they were visited
    let queue = [start];
    let visited = {}; // visited dictionary
    graph.nodes.forEach(function(node){visited[node.name] = 0});
    while(queue.length != 0){
        let current = queue.shift(); // dequeue
        visited[current] = 1;// mark as visited
        graph[current].forEach(function(adjacent){
            let adjacent_node = adjacent[0];
            if(!visited[adjacent_node]){
                queue.push(adjacent_node);
                order_visited.push([current, adjacent_node]);
            }
        });   
    }
    return order_visited;
}   
function dfs(graph, start){
    let order_visited = [start];
}