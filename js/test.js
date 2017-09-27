// - Checks jS is loaded -
console.log("js is loaded");

// === Global Variables ===

// - Canvas Dimensions - 
var canvas = document.getElementById('asteroidsCanvas');
var ctx = canvas.getContext('2d');
var CANVAS_WIDTH = canvas.width;
var CANVAS_HEIGHT = canvas.height;
var bb = canvas.getBoundingClientRect();
var offsetX = bb.left;
var offsetY = bb.top;
var started, dx, dy;

// - Asteroids Array -
var asteroids = [];

// - Game Speed -
//var FPS = 40;

// - For Loops -
var i = 0;

// - Ship Projectiles Array -
var shipPews = []; 

// === Ship Object ===
var ship = {

  color: 'black',
  x: 140,
  y: 140,
  width: 20,
  height: 20,
  draw: function () {

    ctx.strokeStyle = this.color;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  
  }

};

// === Projectiles ===
function Pew(x, y, dx, dy) {

	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.color = 'black';

}

Pew.prototype.display = function () {

	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, 5, 5);

}

/*function Pew(Pew) {

	// - Projectile Starts Active - 
	Pew.active = true;

	// - Starting Velocity -
	Pew.xVelocity = 0;
	Pew.yVelocity = - Pew.speed;

	// - Projectile Dimensions -
	Pew.width = 3;
	Pew.height = 3;
	Pew.color = 'black';

	// - If Projectile is Inbounds Return True - 
	Pew.inbounds = function() {

		// - Return True if Projectile is Inside the Canvas -
		return Pew.x >= 0 && Pew.x <= CANVAS_WIDTH && 
			Pew.y >= 0 && Pew.y <= CANVAS_HEIGHT;


	}

	// - Draw Projectile -
	Pew.draw = function() {

		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);

	};


	// - Update Projectile -
	Pew.update = function() {

		// - Fires Bottom to Top - 
		Pew.x += Pew.xVelocity;
		Pew.y += Pew.yVelocity;

		// - Projectile Remains Active While True and Inbounds -
		Pew.active = Pew.active && Pew.inbounds();

	};

	return Pew;

};*/

// === Ship Fire ===
// - Returns Midpoint of Ship -
ship.midpoint = function() {

	return {

		x: this.x + this.width/2,
		y: this.y + this.height/2

	};

};

// - Testing New Ship.fire function -
ship.fire = function() {

	started = true;
	var setFirePosition = this.midpoint();	
	console.log(shipPews);

}

// - KeyDown Listener - 
document.addEventListener('keydown', function(e){
	//console.log(e);

	if(e.which==32) {
		ship.fire();
	}

	console.log(e);

	// - Move Left -
	if(e.which==37) {
		
		ship.x -=.035;

		// - Testing Rotation -
		//shipRadian = (spin * Math.PI/180);
		//ctx.rotate(shipRadian);

	}
	// - Move Right - 
	if(e.which==39) {
		ship.x +=.035;
	}
	// - Move Up -
	if(e.which==38) {
		ship.y -=.035;
	}
	// - Move Down -
	if(e.which==40) {
		ship.y +=.035;
	}

});
		

requestAnimationFrame(animate);

function setFirePosition() {

	ship.x = parseInt(ship.x - offsetX);
	ship.y = parseInt(ship.y - offsetY);
	dx = (ship.x >= CANVAS_WIDTH / 2) ? -3 : 3;
	dy = (ship.y >= CANVAS_HEIGHT / 2) ? -3 : 3;

}

function animate() {

	ship.draw();

	requestAnimationFrame(animate);


	// - If Spacebar is Keydown Add a Projectile -
	if (started) {

		shipPews.push(new Pew(ship.x, ship.y, dx, dy));

	}

	// - Return if Empty -
	if (shipPews.length == 0) {

		return;

	}

	// - Active Pew Array - 
	var a =[];

	// - Clear Canvas This Frame
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	for(; i < shipPews.length; i++) {

		// - Get Active Pew -
		var pew = shipPews[i];

		// - Move Pew -
		pew.x += pew.dx;
		pew.y += pew.dy;

		// - If Pew is Still Onscreen -
		if(pew.x >= 0 && pew.x <= CANVAS_WIDTH && pew.y > 0 && pew.y <= CANVAS_HEIGHT) {

			// - Push to Array - 
			a.push(pew);

			// - Draw the Projectile -
			pew.display();

		}

		if (a.length < shipPews.length) {
			shipPews.length = 0;
			Array.prototype.push.apply(pews, a);
		}
	}

}

/*ship.fire = function() {

	// - Fires from Mid Ship - 
	var pewPosition = this.midpoint();

	// - Push a Projectile to the Projectiles Array -
	shipPews.push(Pew({

		speed: 5,
		x: pewPosition.x,
		y: pewPosition.y,

	}));

};*/

// - Testing Animation Frame -
/*var start = null;

function step(timestamp) {
	if(!start) start = timestamp;
	var progress = timestamp - start;
	if(progress < 200000) {
		window.requestAnimationFrame(step);
		update();
	  draw();
	}
}

window.requestAnimationFrame(step);*/

/*function update() {

	// - Keydown Listener - 
	// - Testing Mousedown Listener -
	//canvas.onmousedown = function(e) {

	document.addEventListener('keydown', function(e){
		//console.log(e);

		if(e.which==32) {
			ship.fire();
		}

		// - Move Left -
		if(e.which==37) {
			
			ship.x -=.035;

			// - Testing Rotation -
			//shipRadian = (spin * Math.PI/180);
			//ctx.rotate(shipRadian);

		}
		// - Move Right - 
		if(e.which==39) {
			ship.x +=.035;
		}
		// - Move Up -
		if(e.which==38) {
			ship.y -=.035;
		}
		// - Move Down -
		if(e.which==40) {
			ship.y +=.035;
		}



		/*shipPews.forEach(function(pew) {

			pew.update();

		});

		shipPews = shipPews.filter(function(pew) {

			return pew.active;

		});

	});

};

/*function draw() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // - Draw Ship -
  ship.draw();

  // - Draw Projectiles -
  shipPews.forEach(function(pew) {

  	pew.draw();

  });

  // - Draws Asteroids - 
  ctx.strokeStyle = 'rgb(0,0,0)';
  ctx.stroke(asteroids[0]);
  ctx.stroke(asteroids[1]);
  ctx.stroke(asteroids[2]);

};*/

// === Creates N Asteroids ===
for(; i < 3; i++) {

  createAsteroid();

};


// - Creates Each Asteroid and Pushes it to Asteroids Array -
function createAsteroid() {

    var position = [
      // - Positions Asteroid at Top of Canvas - 
      [Math.floor(Math.random()*300), -25],
      // - Positions Asteroid at Left of Canvas -
      [-25, Math.floor(Math.random()*300)],
      // - Positions Asteroid at Right of Canas - 
      [Math.floor(Math.random()*300), 295],
      // - Positions Asteroid at Bottom of Canvas -
      [295, Math.floor(Math.random()*300)]
    ];

    // - Chooses Random Line - 
    var index = Math.floor(Math.random()*4);

    // - Associates Fixed Positing to Position Index
    var x = position[index][0];
    var y = position[index][1];

    // - Asteroid SVG Path - 
    var newAsteroid = 
    new Path2D('M' + x + ' ' + y + ' l 20 5 l 10 -5 l 5 10 l -5 10 l 5 10 l -15 5 l -5 -5 l -10 10 l -10 -15 l 5 -15 l 0 -10');

    // - Push Asteroid Into the Asteroids Array -
    asteroids.push(newAsteroid);

};