//define our canvas
var gameArena = {
	canvas : document.createElement("canvas"),
	start : function(){
		this.canvas.width = 768;
		this.canvas.height = 768;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]); //inserts the canvas as first in the document body
	}
}
// function used to initiliaze canvas on page load
function startGame(){
	
}