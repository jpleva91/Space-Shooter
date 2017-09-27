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


function render() {

	// Paint Canvas Black
	bCtx.fillStyle = "black";
	bCtx.rect(0, 0, 300, 300);
	bCtx.fill();

	// Paint Stars
	stars();

	// Paint Ship
	makeShip();
}

function stars() {

	for (let i = 0; i <= 299; i++) {

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
