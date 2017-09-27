// - Checks jS is loaded -
console.log("js is loaded");

// === Global Variables ===
var x;
var y;
var rotation = 0;

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
		var moveUp = sCtx.translate(0,-6);
	}
	if(code == 40) {
		var moveDown = sCtx.translate(0, 6);
	}
	if(code == 37) {
		var moveLeft = rotation-= 10;
	}
	if(code == 39) {
		var moveRight = rotation+= 10;
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

var deltaX = 0;
var deltaY = 0;

function makeShip() {


	var w = 20;
	var h = 33;
	sCtx.save();
	sCtx.translate(canvasShip.width /2, canvasShip.height/2);
	sCtx.rotate(rotation*Math.PI/180);
	sCtx.beginPath();
	//Center of Canvas
	sCtx.moveTo(0 + (deltaX), (-h + deltaY) / 2);
	//10px left and 30 px down
	sCtx.lineTo(w / 2 , h / 2);
	//20px right
	sCtx.lineTo(-w / 2, h / 2);
	sCtx.lineTo(0, -h / 2);
	sCtx.fillStyle = "rgb(24, 202, 230)";
	sCtx.fill();
	sCtx.closePath();
	sCtx.restore();
}
