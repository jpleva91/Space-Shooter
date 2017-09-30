// - Checks jS is loaded -
console.log("js is loaded");

// === Global Variables ===
// - Shift Button Counter -
var shiftCount = 0;
// - Audio -
var audioBeam = new Audio('assets/beam.wav');
var explosion = new Audio('assets/explosion.wav')
var point = new Audio('assets/point.wav');
// - Player Beams Array -
var playerBeams = [];
// - Asteroids Array -
var gameAsteroids = [];
// - Player Scoring -
var playerOne = document.getElementById("playerOne");
var playerTwo = document.getElementById("playerTwo");
var counter = 0;
var winner = document.getElementById("winner");

// === Local Storage Functions and Variables ===
// - Store Variables From Form Input to Local Storage - 
function playerNames() {
	var playerOneName = document.getElementById("playerOneName");
	localStorage.setItem("playerOneName", playerOneName.value);

	var playerTwoName = document.getElementById("playerTwoName");
	localStorage.setItem("playerTwoName", playerTwoName.value);
}

// - Pull from Local Storage and Store in New Variables -
var storedPlayerOne = localStorage.getItem("playerOneName");
var storedPlayerTwo = localStorage.getItem("playerTwoName");

// - Change HTML Using Stored Values -
playerOne.innerHTML =
storedPlayerOne + "'s Score: 0";

playerTwo.innerHTML = 
storedPlayerTwo + "'s Score: 0";

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
	// - Press Shift to Start -
	if(e.which==16) {
		if(shiftCount < 1) {
			gameStart();
			shiftCount += 1;
		}
	// - Space Bar Fires -
	if(e.which==32) {
		player.fire();
	}
	// - Up Arrow  -
	if(e.which == 38){
		ship.y -= 15;
		player.y -= 15;
	}
	// - Down Arrow -
	if(e.which == 40) {
		ship.y += 15;
		player.y += 15;
	}
	// - Left Arrow  -
	if(e.which == 37) {
		ship.x -= 15;
		player.x -= 15;
	}
	// - Right Arrow -
	if(e.which == 39) {
		ship.x += 15;
		player.x += 15;
	}
}

// === Background Canvas === 
// - Randomly Generated Stars for Background -
function stars() {
	for (let i = 0; i <= 500; i++) {
		let x = Math.floor(Math.random() * 299);
		let y = Math.floor(Math.random() * 499);

		bCtx.fillStyle = "white";
		bCtx.beginPath();
		bCtx.arc(x, y, 1, 0, Math.PI * 2, true);
		bCtx.closePath();
		bCtx.fill();
	}
}

// - Draws Starfield Background on Background Canvas Layer -
function starField() {
	bCtx.fillStyle = "rgba(0, 0, 0, .7)";
	bCtx.rect(0, 0, 300, 450);
	bCtx.fill();
	// - Paint Stars -
	stars();
	// - Game Start Overlay -
	sCtx.font = "28px Helvetica";
	sCtx.fillStyle = "yellow";
	sCtx.fillText("Press Shift To Start", 23, 200);
}

// === Ship Canvas ===
// - Draw Ship Function -
var ship = {
	shipOne: new Image(),
	shipTwo: new Image(),
	x: canvasShip.width /2,
	y: canvasShip.height *.88,
	width: 43,
	height: 43,
	// - Draw Ship Based On Turn -
	draw: function() {
		if(counter % 2) {
			sCtx.drawImage(this.shipOne, this.x, this.y, this.width, this.height);
		} else {
			sCtx.drawImage(this.shipTwo, this.x, this.y, this.width, this.height);
		}
	}
}
ship.shipOne.src = 'img/shipOne.png';
ship.shipTwo.src = 'img/shipTwo.png';

ship.destroy = function() {
		ship.x = canvasShip.width /2;
		ship.y = canvasShip.height *.88;
}


// === Main Canvas ===
// - Main Canvas Layer Element is Bound to Player Ship -
var player = {
	// - Transparent - 
	color: 'rgba(255,0,0,0)',
	x: 164,
	y: 420,
	width: 15,
	height: 15,
	scoreOne: 0,
	scoreTwo: 0,
	// - Draw Player -
	draw: function() {
		mCtx.fillStyle = this.color;
		mCtx.fillRect(this.x, this.y, this.width, this.height);
	}
};

// - Scoring -
player.point = function() {
	// - First to 100 Wins -
	if(player.scoreOne === 100) {
		winner.classList.toggle("gameOver");
		winner.innerHTML = storedPlayerOne + " Wins! Press CMD+R To Play Again";
	}
	if(player.scoreTwo === 100) {
		winner.classList.toggle("gameOver");
		winner.innerHTML = storedPlayerTwo + " Wins! Press CMD+R To Play Again";	
	}
	// - Updates Score Based On Counter -
	if(counter % 2) {
		this.scoreTwo += 2;
		playerTwo.innerHTML = 
		storedPlayerTwo + "'s Score: " + this.scoreTwo;
	} else {
		this.scoreOne += 2;
		playerOne.innerHTML =
		storedPlayerOne + "'s Score: " + this.scoreOne;
	}	
}

// - Marks Player Object Inactive -
player.destroy = function() {
	explosion.play();
	this.active = false;
	gameAsteroids.forEach(function(asteroid) {
		asteroid.active = false;
	});
	counter += 1;
	player.x = 164;
	player.y = 420;
	if(player.scoreOne < 100 && player.scoreTwo < 100) {
		if(counter % 2){
			alert(storedPlayerTwo + "'s Turn!");
		} else {
			alert(storedPlayerOne + "'s Turn!");
		}
	}
};

// - Player Fire -
player.fire = function() {
	// - Fire from Middle of Ship -
	var beamPosition = this.midpoint();
	//- Pew Sound -
	audioBeam.play();
	// - Push Beam Object to Player Beams Array -
	playerBeams.push(Beam({
		// - Beam Fire Rate -
		speed: 6,
		x: beamPosition.x,
		y: beamPosition.y-10
	}));
};

// - Determines Midpoint of Player -
player.midpoint = function() {
	return {
		x: this.x + this.width / 2 -1.8,
		y: this.y + this.height /2
	};
};

// === Player Beams ===
// - Beam Object -
function Beam(I) {
	// - Beam Starts Active -
	I.active = true;
	// - Links to Rotation - 
	I.xVelocity = 0;
	// - Shoots Upward -
	I.yVelocity = -I.speed;
	// - Beam Width -
	I.width = 5;
	//- Beam Height -
	I.height = 13;
	// - Beam Color -
	if(counter % 2) {
		I.color = "red";
	} else {
		I.color = "orange";
	};
	// - Return True While Inbounds -
	I.inBounds = function() {
		return I.x >= 0 && I.x <= canvasMain.width &&  I.y <= canvasMain.height;
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
// - Asteroid Object -
function Asteroid(A) {
	// - Starts Active -
	A.active = true;
	// - Random number between 1 and 2 -
	var num = Math.floor(Math.random()*1) + .3;
	// - Positive and Negative -
	A.xVelocity = 
	num *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
	// - Falls Top to Bottom - 
	A.yVelocity = A.speed;
	A.width = 60;
	A.height = 60;
	// - Asteroid Image -
	A.image = new Image();
	A.image.src = 'img/asteroid.svg';
	// - Returns True While Inbounds -
	A.inBounds = function() {
		return A.x >= -50 && A.x<= canvasMain.width && A.y >= -100 <= canvasMain.height;
	};
	// - Draw Asteroid -
	A.draw = function() {
		mCtx.drawImage(A.image, A.x, A.y, A.width, A.height);
	};
	// - Update Position -
	A.update = function() {
		A.x += A.xVelocity;
		A.y += A.yVelocity;
	};
	// - Asteroid is Marked Inactive -
	A.destroy = function() {
		this.active = false;
	}
	return A;
}

// - Asteroid Settings -
function asteroid() {
	for(let i = 0; i < 15; i ++) {
		var asteroidPosition = topAtRandom();
		gameAsteroids.push(Asteroid({
			speed: 4 ,
			x: asteroidPosition.x,
			y: asteroidPosition.y,
		}));
	}
};
// - Returns Random Location Along the X Axis and 0 -
function topAtRandom() {
	return {
		x: Math.floor(Math.random()*canvasMain.width),
		y: Math.floor(-Math.random()*canvasMain.height) 
	};
};

// === Collision Detection === 
function collides(a, b) {
	// - Checks x and y values of two parameters -
	return a.x < b.x + b.width &&
				 a.x + a.width > b.x &&
				 a.y < b.y + b.height &&
				 a.y + a.height > b.y;
};

// - Collision Handler -
function collisionDetection() {
	playerBeams.forEach(function(beam) {
		gameAsteroids.forEach(function(asteroid) {
			// - If a Player Beam Collids with an Asteroid -
			if(collides(beam, asteroid)) {
				// - Increase Player Score -
				player.point();
				point.play();
				// - Destroy Asteroid -
				asteroid.destroy();
				// - Mark Beam Inactive -
				beam.active = false;
			};
		});
	});
	// - Asteroid Collision functions -
	gameAsteroids.forEach(function(asteroid) {
		if (collides(asteroid, player)) {
			asteroid.destroy();
			player.destroy();
			ship.destroy();
		}
	});
};


// === Renders Game Loop ===
// - Game Start Function Bound to Shift Button -
function gameStart() {
	window.setInterval(asteroid, 4500);
	render();
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
	ship.draw();	
	// - Draw Player Object on Main Canvas
	player.draw();
	// - Updates Beams Every Frame -
	playerBeams.forEach(function(beam) {
		beam.update();
		if(beam.y <= 20) {
			beam.active = false;
		}
	});
	// - Filters Active Beams -
	playerBeams = playerBeams.filter(function(beam) {
		return beam.active;
	});
	// - Draws Active Beams -
	playerBeams.forEach(function(beam) {
		beam.draw();
	});
	// - Updates Asteroids Every Frame -
	gameAsteroids.forEach(function(asteroid) {
		asteroid.update();
		if(asteroid.y >= 445) {
			asteroid.active = false;
		}
	});
	// - Returns Active Asteroids -
	gameAsteroids = gameAsteroids.filter(function(asteroid) {
		return asteroid.active;
	});
	// - Draw Active Asteroids -
	gameAsteroids.forEach(function(asteroid) {
		asteroid.draw();
	});
	// - Handle Collisons Every Frame -
	collisionDetection();
}