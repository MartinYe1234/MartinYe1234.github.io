//define our canvas
var gameArena = {
	canvas : document.createElement("canvas"),
	start : function(){
		this.canvas.width = 768;
		this.canvas.height = 768;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, null); //inserts the canvas at the bottom of the page
	},
	clear : function(){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}
// function used to initiliaze canvas on page load
function startGame(){
	gameArena.start();
}

// our draw function that constantly updates our canvas
function draw(){
	canvas.clear();
}