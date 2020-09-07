var testvar = "green";
function test(){
	document.getElementById("header").style.color = testvar;
}

function hoverOver(){
	if (document.getElementById("snakeLOGO")){
		document.getElementById("snakeLOGO").src="images/snakeGameGIF.gif";
	}
	else if (document.getElementById("graphLOGO")){
		document.getElementById("graphLOGO").src="images/graphGIF.gif";
	}
}

function hoverOff(){
	if (document.getElementById("snakeLOGO")){
		document.getElementById("snakeLOGO").src="images/snakeGameLOGO.png";
	}
	else if (document.getElementById("graphLOGO")){
		document.getElementById("graphLOGO").src="images/graphLOGO.png";
	}
}
