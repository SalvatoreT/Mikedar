// mikedar.js

// constants
var speed = (5 * Math.PI); // higher = faster radar
var numActive = 3;
var blipDuration = 100;
var blipX = 15;
var blipY = 10;
var blipAlpha = .8;
var blipLives = 3;
var refreshRate = 30; // ms
// lazy gradient hack
var rS = 53;
var gS = 150;
var bS = 6;
var rD = 85 - rS;
var gD = 252 - gS;
var bD = 7 - bS;

// vars
var frame_ = 0;
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

		setInterval(function() {
			draw(frame_++);
		},refreshRate);
		
		for (var i=0; i<numActive; i++) {
			blips.push(getBlip());
		}
      };

function draw() {
	context.clearRect(0,0,600,400);
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
		context.arc(centerX, centerY, radius, frame + (.2*i)/16, 
				frame + (.2*(i))/15, false);
		context.lineTo(centerX, centerY);
		var rgb = "rgb(" + Math.round(rS + rD*i/15) + ',' +
				Math.round(gS + gD*i/15) + ',' + 
				Math.round(bS + bD*i/15) + ')';
		context.fillStyle = rgb;
		context.fill();
	}
	
	for (var i=0; i<numActive; i++) {
		var blip = blips[i];
		if (--blip.t < 0) {
			blip.t = blipDuration;
			if (--blip.lives <= 0) {
				blip = getBlip();
			}
			blips[i] = blip;
		}
		context.globalAlpha = blipAlpha * blip.t / blipDuration;
		context.beginPath();
        context.rect(centerX + blip.x, centerY + blip.y, blipX, blipY);
        context.fillStyle = '#6AC934';
        context.fill();
	}
}

function getBlip() {
	var blip = [];
	blip.x = (Math.random() - .5) * radius * 2;
	blip.y = (Math.random() - .5) * radius * 2;
	blip.t = blipDuration;
	blip.lives = blipLives;
	return blip;
}