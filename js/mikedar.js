// mikedar.js

var frame_ = 0;
var canvas; 
var context;
var centerX;
var centerY;
var radius = 70;
		
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
	context.beginPath();
	context.arc(centerX, centerY, radius, frame, 
			frame + .05, false);
	context.lineTo(centerX, centerY);
	context.fillStyle = "green";
	context.fill();
	
	// outer bar
	context.beginPath();
	context.arc(centerX, centerY, radius, frame, 
			frame - .1, true);
	context.lineTo(centerX, centerY);
	context.fillStyle = "grey";
	context.fill();

}