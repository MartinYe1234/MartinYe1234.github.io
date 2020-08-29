var testvar = "green";
function test(){
	document.getElementById("header").style.color = testvar;
}

function hoverOver(){
	if (document.getElementsByClassName("projectSnake")){
		document.getElementById("snakeLOGO").src="images/snakeGameGIF.gif";
	}
}

function hoverOff(){
	if (document.getElementsByClassName("projectSnake")){
		document.getElementById("snakeLOGO").src="images/snakeGameLOGO.png";
	}
}
