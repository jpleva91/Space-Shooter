// - Checks jS is loaded -
console.log("js is loaded");

// === Global Variables ===

// - Ships Initial Rotation Value -
var rotation = 0;

// - Player Beams Array -
var playerBeams = [];

// - Asteroids Array -
var gameAsteroids = [];

// - Interval Timer -
var timer = 1500;

// === Canvas Dimensions ===
// - Bottom Layer Background Canvas -
var canvasBackground = document.getElementById('background');

// - Background Canvas Context - 
var bCtx = canvasBackground.getContext('2d');

// - Main Layer Background Canvas -
var canvasMain = document.getElementById('main');

// - Main Canvas Context -
var mCtx = canvasMain.getContext('2d');

// - Top Layer Ship Canvas -
var canvasShip = document.getElementById('ship');

// - Ship Canvas Context -
var sCtx = canvasShip.getContext('2d');

// === Game Keyboard Controls ===

// - Adds Keydown Event Listener -
window.addEventListener('keydown', this.keyCode, false);

// - Keyboard Controls -
function keyCode(e) {
	
	// - Space Bar Fires -
	if(e.which==32) {
		player.fire();
	}

	// - Up Arrow  -
	if(e.which == 38){
		sCtx.translate(0,-10);
		player.y -= 10;
	}

	// - Down Arrow -
	if(e.which == 40) {
		sCtx.translate(0, 10);
		player.y += 10;
	}

	// - Left Arrow  -
	if(e.which == 37) {
		sCtx.translate(-10,0);
		player.x -= 10;
	}

	// - Right Arrow -
	if(e.which == 39) {
		sCtx.translate(10,0);
		player.x += 10;
	}

	// - ( < ) Rotates Left -
	if(e.which == 188) {
		rotation -= 12;
	}

	// - ( > ) Rotates Right -
	if(e.which == 190) {
		rotation += 12;
	}

}

// === Background Canvas === 

// - Randomly Generated Stars for Background -
function stars() {

	for (let i = 0; i <= 450; i++) {

		let x = Math.floor(Math.random() * 299)
		let y = Math.floor(Math.random() * 440)

		bCtx.fillStyle = "white";

		bCtx.beginPath();
		bCtx.arc(x, y, 1, 0, Math.PI * 2, true);
		bCtx.closePath();
		bCtx.fill();

	}

}

// - Draws Starfield Background on Background Canvas Layer -
function starField() {

	bCtx.fillStyle = "black";
	bCtx.rect(0, 0, 300, 450);
	bCtx.fill();
	// Paint Stars
	stars();

}

// === Ship Canvas ===

// - Draw Ship Function -
function drawShip() {

	var w = 20;
	var h = 33;
	sCtx.save();
	sCtx.translate(canvasShip.width /2, canvasShip.height*.92);
	sCtx.rotate(rotation*Math.PI/180);
	sCtx.beginPath();
	sCtx.moveTo(0, -h / 2);
	sCtx.lineTo(w / 2 , h / 2);
	sCtx.lineTo(-w / 2, h / 2);
	sCtx.lineTo(0, -h / 2);
	sCtx.fillStyle = "rgba(24, 202, 230, .7)";
	sCtx.fill();
	sCtx.closePath();
	sCtx.restore();

};

// === Main Canvas ===

// - Main Canvas Layer Element is Bound to Player Ship -
var player = {

	// - Transparent - 
	color: 'rgba(255,0,0,0)',
	x: 138,
	y: 400,
	width: 23,
	height: 30,
	score: 0,

	draw: function() {

		mCtx.fillStyle = this.color;
		mCtx.fillRect(this.x, this.y, this.width, this.height);

	}

};

// === Player Beams ===

// - Beam Object -
function Beam(I) {

	// - Beam Starts Active -
	I.active = true;

	// - Doesn't Move Along X Axis (Need to Link this to Rotation) - 
	I.xVelocity = 0;

	// - Shoots Upward -
	I.yVelocity = -I.speed;

	// - Beam Width -
	I.width = 3;

	//- Beam Height -
	I.height = 10;

	// - Beam Color -
	I.color = 'red';

	// - Return True While Inbounds -
	I.inBounds = function() {

		return I.x >= 0 && I.x <= canvasMain.width &&  I.y >= I.y <= canvasMain.height;

	};

	// - Draws Beams -
	I.draw = function() {

		mCtx.fillStyle = this.color;
		mCtx.fillRect(this.x, this.y, this.width, this.height);

	};

	// - Updates Beams -
	I.update = function() {

		I.x += I.xVelocity;
		I.y += I.yVelocity;

		I.active = I.active && I.inBounds();

	};

	return I;
}

// === Asteroids! ===

function Asteroid(A) {

	A.active = true;

	A.xVelocity = 0;

	A.yVelocity = A.speed;

	A.width = 60;

	A.height = 60;

	A.color = 'rgba(126, 44, 44, 0.7)';

	A.inBounds = function() {

		return A.x >= 0 && A.x<= canvasMain.width && A.y >= A.y <= canvasMain.height;

	};

	A.draw = function() {

		mCtx.fillStyle = this.color;
		mCtx.fillRect(this.x, this.y, this.width, this.height);

	};

	A.update = function() {

		A.x += A.xVelocity;
		A.y += A.yVelocity;

	};

	A.destroy = function() {
		this.active = false;
	}

	return A;

}

function topAtRandom() {

	return {

		x: Math.floor(Math.random()*canvasMain.width),
		y: 0


	};

};


player.point = function() {
	this.score += 1;
	console.log(this.score);
}

player.destroy = function() {
	this.active = false;
	alert('You Died!!');
};

// - Player Fire -
player.fire = function() {

	// - Fire from Middle of Ship -
	var beamPosition = this.midpoint();

	// - Push Beam Object to Player Beams Array -
	playerBeams.push(Beam({

		// - Beam Fire Rate -
		speed: 6,
		x: beamPosition.x,
		y: beamPosition.y

	}));
	
};

// - Determines Midpoint of Player -
player.midpoint = function() {

	return {

		x: this.x + this.width / 2,
		y: this.y + this.height /2

	};

};

// === Collision Detection === 
function collides(a, b) {
	return a.x < b.x + b.width &&
				 a.x + a.width > b.x &&
				 a.y < b.y + b.height &&
				 a.y + a.height > b.y;
}

function collisionDetection() {
	playerBeams.forEach(function(beam) {
		gameAsteroids.forEach(function(asteroid) {
			if(collides(beam, asteroid)) {
				player.point();
				asteroid.destroy();
				beam.active = false;
			}
		});
	});

	gameAsteroids.forEach(function(asteroid) {
		if (collides(asteroid, player)) {
			asteroid.destroy();
			player.destroy();
		}
	})
}

// === Renders Game Loop ===


window.setInterval(asteroid, 250);

function asteroid() {

	var asteroidPosition = topAtRandom(canvasMain);

	gameAsteroids.push(Asteroid({

		speed: 7,
		x: asteroidPosition.x,
		y: asteroidPosition.y,

	}));

};

// - Renders Every Frame -
function render() {

	 // - Frame Rate -
	requestAnimationFrame(render);

	// - Clear Ship Canvas Every Frame -
	sCtx.clearRect(0,0,canvasShip.width, canvasShip.height);

	// - Clear Main Canvas Every Frame -
	mCtx.clearRect(0,0, canvasShip.width, canvasShip.height);

	// - Draw Player Ship on Ship Canvas
	drawShip();	

	// - Draw Player Object on Main Canvas
	player.draw();

	// - Updates Beams Every Frame -
	playerBeams.forEach(function(beam) {

		beam.update();

	});

	// - Filters Active Beams -
	playerBeams = playerBeams.filter(function(beam) {

		return beam.active;

	});

	// - Draws Active Beams -
	playerBeams.forEach(function(beam) {

		beam.draw();

	});

	gameAsteroids.forEach(function(asteroid) {
		asteroid.update();
	});

	gameAsteroids = gameAsteroids.filter(function(asteroid) {
		return asteroid.active;
	});

	gameAsteroids.forEach(function(asteroid) {
		asteroid.draw();
	});

	collisionDetection();

}

// - Calls Render Function -
render();