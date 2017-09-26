// - Checks jS is loaded -
console.log("js is loaded");

// - Global variables - 
	var canvas;
	var ctx;
	var ship = new Image();

// - Called on Page Load - 
function canvasAsteroids() {

  // - Get the Canvas Element - 
	canvas = document.getElementById('asteroidsCanvas');

	// - 2d Canvas - 
	ctx = canvas.getContext("2d");

	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, 300, 300);

	// - Draw Space Ship - 
	makeShip();

	// - Draw Asteroid - 
	makeAsteroids();

}

init();


function makeShip() {

	var newShip = 
	new Path2D('M150 130 l 10 25 h -20 l 10 -25');
	
	ctx.strokeStyle = 'rgb(0,255,0)';
	ctx.stroke(newShip);

}

function makeAsteroids() {

	for(i = 0; i < 3; i++){

		var position = [
			//top
			[Math.floor(Math.random()*300), -25],
			//left
			[-25, Math.floor(Math.random()*300)],
			//right
			[Math.floor(Math.random()*300), 295],
			//bottom
			[295, Math.floor(Math.random()*300)]
		];

		var index = Math.floor(Math.random()*4);

		var x = position[index][0];
		var y = position[index][1];
		console.log(x +", "+ y);

		var newAsteroid = 
		new Path2D('M' + x + ' ' + y + ' l 20 5 l 10 -5 l 5 10 l -5 10 l 5 10 l -15 5 l -5 -5 l -10 10 l -10 -15 l 5 -15 l 0 -10');

		ctx.strokeStyle = 'rgb(0,255,0)';
		ctx.stroke(newAsteroid);
	}

}
