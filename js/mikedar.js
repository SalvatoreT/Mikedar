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

        //context.lineWidth = 5;
        //context.strokeStyle = "black";
        //context.stroke();
      };

function draw() {
	var frame = frame_ / (.5 * Math.PI);
	frame /= 10;

	context.beginPath();
	context.arc(centerX, centerY, radius + .2, 0, 2 * Math.PI, false);
	context.fillStyle = "silver";
	context.fill();
	
	context.beginPath();
	context.arc(centerX, centerY, radius, frame, 
			frame + .05, false);
	context.lineTo(centerX, centerY);
	context.fillStyle = "green";
	context.fill();

}