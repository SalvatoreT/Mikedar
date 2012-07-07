// mikedar.js

var frame_ = 0;
var canvas; 
var context;
var centerX;
var centerY;
var radius = 70;

// lazy gradient hack
// rgb(53, 150, 7) to  85, 252, 6
var rS = 53;
var gS = 150;
var bS = 6;
var rD = 85 - rS;
var gD = 252 - gS;
var bD = 7 - bS;

		
window.onload = function() {
        canvas = document.getElementById("canvas");
		context = canvas.getContext("2d");
		centerX = canvas.width / 2;
		centerY = canvas.height / 2;

		setInterval(function() {
			draw(frame_++);
		},50);

      };

function draw() {
	var frame = frame_ / (.5 * Math.PI);
	frame /= 10;

	context.globalAlpha = 1;
	// background circle
	context.beginPath();
	context.arc(centerX, centerY, radius + .2, 0, 2 * Math.PI, false);
	context.fillStyle = "silver";
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
	context.globalAlpha = 0.75;
	for (var i=25; i>0; i--) {
		context.beginPath();
		context.arc(centerX, centerY, radius, frame + (.2*i)/16, 
				frame + (.2*(i))/15, false);
		context.lineTo(centerX, centerY);
		var rgb = "rgb(" + Math.round(rS + rD*i/15) + ',' +
				Math.round(gS + gD*i/15) + ',' + 
				Math.round(bS + bD*i/15) + ')';
		context.fillStyle = rgb;
		//alert(rgb);
		//85, 252, 6
		context.fill();
	}
	
	// outer bar
	//context.beginPath();
	//context.arc(centerX, centerY, radius, frame, 
	//		frame - .1, true);
	//context.lineTo(centerX, centerY);
	//context.fillStyle = "grey";
	//context.fill();

}