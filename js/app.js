// - Checks jS is loaded -
console.log("js is loaded");

// === Global Variables ===

// - Canvas Dimensions - 
var canvasBackground = document.getElementById('background');
var bCtx = canvasBackground.getContext('2d');
var canvasMain = document.getElementById('main');
var mCtx = canvasMain.getContext('2d');
var canvasShip = document.getElementById('ship');
var sCtx = canvasShip.getContext('2d');


// - Key Codes -
window.addEventListener('keydown', this.keyCode, false);

function keyCode(e) {
	var code = e.keyCode;
	if(code == 38){
		var moveUp = sCtx.translate(0, -6);
	}
	if(code == 40) {
		var moveDown = sCtx.translate(0, 6);
	}
	if(code == 37) {
		var moveLeft = sCtx.translate(-6, 0);
	}
	if(code == 39) {
		var moveRight = sCtx.translate(6, 0);
	}

}

function starField() {

	bCtx.fillStyle = "black";
	bCtx.rect(0, 0, 300, 300);
	bCtx.fill();
	// Paint Stars
	stars();

}


function render() {
	requestAnimationFrame(render);

	sCtx.clearRect(0,0,300,300);
	// Paint Ship
	makeShip();

}

render();

function stars() {

	for (let i = 0; i <= 300; i++) {

		let x = Math.floor(Math.random() * 299)
		let y = Math.floor(Math.random() * 299)

		bCtx.fillStyle = "white";

		bCtx.beginPath();
		bCtx.arc(x, y, 1, 0, Math.PI * 2, true);
		bCtx.closePath();
		bCtx.fill();

	}

}

function makeShip() {

	sCtx.beginPath();
	sCtx.moveTo(160,160);
	sCtx.lineTo(140,160);
	sCtx.lineTo(150,130);
	sCtx.lineTo(160,160);
	sCtx.closePath();
	sCtx.fillStyle = "rgb(24, 202, 230)";
	sCtx.fill();

}
