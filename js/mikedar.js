// mikedar.js

// constants
var speed = (5 * Math.PI); // higher = faster radar
var numActive = 3;
var blipDuration = 115;
var blipX = 15;
var blipY = 10;
var blipAlpha = .8;
var blipLives = 1;
var refreshRate = 30; // ms
var cWidth = 600;
var cHeight = 400;
var cooldown = 25;
var randomDuration = false;
var imgWidth = 100;
var imgHeight = 100;

// lazy gradient hack
var rS = 53;
var gS = 150;
var bS = 6;
var rD = 85 - rS;
var gD = 252 - gS;
var bD = 7 - bS;

// vars
var frame_;
var canvas; 
var context;
var centerX;
var centerY;
var radius = 70;

// map of {x, y, t}
var blips = [];

	
window.onload = function() {
        canvas = document.getElementById("canvas");
		context = canvas.getContext("2d");
		centerX = canvas.width / 2;
		centerY = canvas.height / 2;
		frame_ = Math.round(Math.random() * 200);
		setInterval(function() {
			draw(frame_++);
		},refreshRate);
		
		for (var i=0; i<numActive; i++) {
			blips.push(getBlip(frame_, true));
		}
      };

function draw() {
	context.clearRect(0,0,cWidth,cHeight);
	var frame = frame_ / speed;
	frame %= 2 * Math.PI;

	context.globalAlpha = 1;
	// background circle
	context.beginPath();
	context.arc(centerX, centerY, radius + .2, 0, 2 * Math.PI, false);
	context.fillStyle = "#1C800F";
	context.fill();
	
	// inner radars
	for (var i=1; i<=4; i++) {
		context.beginPath();
		context.arc(centerX, centerY, i*radius/4 + 1.5, 0, 2 * Math.PI, false);
		context.lineWidth = 2;
		context.strokeStyle = "#52FF00";
		context.stroke();
	}
	// main bar
	context.globalAlpha = 0.64;
	for (var i=25; i>0; i--) {
		context.beginPath();
		context.arc(centerX, centerY, radius + 3, frame + (.2*i)/16, 
				frame + (.2*(i))/15, false);
		context.lineTo(centerX, centerY);
		var rgb = "rgb(" + Math.round(rS + rD*i/15) + ',' +
				Math.round(gS + gD*i/15) + ',' + 
				Math.round(bS + bD*i/15) + ')';
		context.fillStyle = rgb;
		context.fill();
	}
	// high quality blip action
	for (var i=0; i<numActive; i++) {
		var blip = blips[i];
		
		if (--blip.t < 0 && --blip.cooldown < 0) {
			blip.t = blipDuration;
			
			if (--blip.lives <= 0) {
				blip = getBlip(frame);
			}
			blips[i] = blip;
		}
		context.globalAlpha = Math.max(0, blipAlpha * blip.t / blipDuration);
		//context.drawImage(blip.img, blip.x, blip.y, imgWidth, imgHeight);
		context.beginPath();
        context.rect(centerX + blip.x - blipX/2, 
				centerY + blip.y - blipY/2, blipX, blipY);
        context.fillStyle = '#6AC934';
        context.fill();
	}
}

function getBlip(frame, invisible) {
	var blip = {};
	
	var dist = Math.min(
		Math.abs(gaussian(radius/2, radius/2)), radius);
	// todo: max/min
	
	
	blip.x = Math.cos(frame + .5) * dist;
	blip.y = Math.sin(frame + .5) * dist;
	blip.cooldown = invisible ? Math.abs(gaussian(blipDuration/4, blipDuration/2)) : 
			Math.abs(gaussian(cooldown, cooldown/2)) + blipDuration;
	if (randomDuration && !invisible) {
		blip.t = gaussian(blipDuration, blipDuration/2);
	} else {
		blip.t = invisible ? 0: blipDuration;
	}
	blip.lives = blipLives;
	blip.img = getImage();
	return blip;
}

function getImage() {
	var image = new Image();
	image.src = "img/vader.png";
	return image;
}

// snag a random from a normal distribution
function gaussian(mean, std) {
	// from http://www.protonfish.com/random.shtml
	var rand = (Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1);
	return rand*std+mean;
}
