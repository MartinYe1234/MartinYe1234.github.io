var testvar = "green";
function test(){
	document.getElementById("header").style.color = testvar;
}

function hoverOver(){
	if (document.getElementById("snakeLOGO")){
		document.getElementById("snakeLOGO").src="images/snakeGameGIF.gif";
	}
}

function hoverOff(){
	if (document.getElementById("snakeLOGO")){
		document.getElementById("snakeLOGO").src="images/snakeGameLOGO.png";
	}
}
