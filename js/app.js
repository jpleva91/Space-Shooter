// - Checks jS is loaded -
console.log("js is loaded");

// === Global Variables ===
var x;
var y;
var rotation = 0;
var playerBullets = [];

// - Canvas Dimensions - 
var canvasBackground = document.getElementById('background');
var bCtx = canvasBackground.getContext('2d');
var canvasMain = document.getElementById('main');
var mCtx = canvasMain.getContext('2d');
var canvasShip = document.getElementById('ship');
var sCtx = canvasShip.getContext('2d');

window.addEventListener('keydown', this.keyCode, false);

function keyCode(e) {
	let code = e.keyCode;
	
	if(e.which==32) {
		player.shoot();
	}
	if(code == 38){
		sCtx.translate(0,-10);
		player.y -= 10;
	}
	if(code == 40) {
		sCtx.translate(0, 10);
		player.y += 10;
	}
	if(code == 37) {
		sCtx.translate(-10,0);
		player.x -= 10;
	}
	if(code == 39) {
		sCtx.translate(10,0);
		player.x += 10;
	}
	if(code == 188) {
		rotation -= 12;
	}
	if(code == 190) {
		rotation += 12;
	}

}

function starField() {

	bCtx.fillStyle = "black";
	bCtx.rect(0, 0, 300, 450);
	bCtx.fill();
	// Paint Stars
	stars();

}

var player = {
	color: 'rgba(0,0,0,1)',
	x: 139,
	y: 210,
	width: 20,
	height: 32,
	draw: function() {
		mCtx.fillStyle = this.color;
		mCtx.fillRect(this.x, this.y, this.width, this.height);
	},
	shoot: function() {
		console.log("pew");
	}
};

function Bullet(I) {
	I.active = true;

	I.xVelocity = 0;
	I.yVelocity = -I.speed;
	I.width = 3;
	I.height = 7;
	I.color = 'orange';

	I.inBounds = function() {
		return I.x >= 0 && I.x <= canvasMain.width &&  I.y >= I.y <= canvasMain.height;
	};

	I.draw = function() {
		mCtx.fillStyle = this.color;
		mCtx.fillRect(this.x, this.y, this.width, this.height);
	};

	I.update = function() {
		I.x += I.xVelocity;
		I.y += I.yVelocity;

		I.active = I.active && I.inBounds();
	};

	return I;
}

player.shoot = function() {
	console.log('pew');
	console.log(this.midpoint());
	var bulletPosition = this.midpoint();

	playerBullets.push(Bullet({
		speed: 7,
		x: bulletPosition.x,
		y: bulletPosition.y
	}));
	console.log(playerBullets);
};

player.midpoint = function() {
	return {
		x: this.x + this.width / 2,
		y: this.y + this.height /2
	};
};


function render() {
	requestAnimationFrame(render);
	sCtx.clearRect(0,0,300,450);
	mCtx.clearRect(0,0, canvasShip.width, canvasShip.height);

	// Paint Ship
	makeShip();	
	player.draw();

	playerBullets.forEach(function(bullet) {
		bullet.update();
	});

	playerBullets = playerBullets.filter(function(bullet) {
		return bullet.active;
	});

	playerBullets.forEach(function(bullet) {
		bullet.draw();
	});
}

render();

function stars() {

	for (let i = 0; i <= 300; i++) {

		let x = Math.floor(Math.random() * 299)
		let y = Math.floor(Math.random() * 440)

		bCtx.fillStyle = "white";

		bCtx.beginPath();
		bCtx.arc(x, y, 1, 0, Math.PI * 2, true);
		bCtx.closePath();
		bCtx.fill();

	}

}

function makeShip() {
	var w = 20;
	var h = 33;
	sCtx.save();
	sCtx.translate(canvasShip.width /2, canvasShip.height/2);
	sCtx.rotate(rotation*Math.PI/180);
	sCtx.beginPath();
	//Center of Canvas
	sCtx.moveTo(0, -h / 2);
	//10px left and 30 px down
	sCtx.lineTo(w / 2 , h / 2);
	//20px right
	sCtx.lineTo(-w / 2, h / 2);
	sCtx.lineTo(0, -h / 2);
	sCtx.fillStyle = "rgb(24, 202, 230)";
	sCtx.fill();
	sCtx.closePath();
	sCtx.restore();
};
