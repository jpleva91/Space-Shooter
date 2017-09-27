// - Checks jS is loaded -
console.log("js is loaded");

// === Global Variables ===

// - Canvas Dimensions - 
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function render() {

	// Paint Canvas Black
	ctx.fillStyle = "black";
	ctx.rect(0, 0, 300, 300);
	ctx.fill();

	// Paint Stars
	stars();

	// Paint Ship
	makeShip();
}

function stars() {

	for (let i = 0; i <= 299; i++) {

		let x = Math.floor(Math.random() * 299)
		let y = Math.floor(Math.random() * 299)

		ctx.fillStyle = "white";

		ctx.beginPath();
		ctx.arc(x, y, 1, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();

	}

}

function makeShip() {

	ctx.beginPath();
	ctx.moveTo(160,160);
	ctx.lineTo(140,160);
	ctx.lineTo(150,130);
	ctx.lineTo(160,160);
	ctx.closePath();
	ctx.fillStyle = "rgb(24, 202, 230)";
	ctx.fill();

}