var testvar = "green";
function test(){
	document.getElementById("header").style.color = testvar;
}

function hoverOver(){
	if (document.getElementsByClassName("projectSnake")){
		this.src="images/StewburryLOGO.png";
	}
}

function hoverOff(){
	if (document.getElementsByClassName("projectSnake")){
		this.src="images/snakeGameLOGO.png";
	}
}
