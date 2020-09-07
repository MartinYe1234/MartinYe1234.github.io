var testvar = "green";
function test(){
	document.getElementById("header").style.color = testvar;
}

function hoverOver(){
	if (document.getElementById("snakeLOGO").matches(':hover')){
		document.getElementById("snakeLOGO").src="images/snakeGameGIF.gif";
	}
	else if (document.getElementById("graphLOGO").matches(':hover')){
		document.getElementById("graphLOGO").src="images/graphGIF.gif";
	}
}

function hoverOff(){
	document.getElementById("snakeLOGO").src="images/snakeGameLOGO.png";
	document.getElementById("graphLOGO").src="images/graphLOGO.png";

}
