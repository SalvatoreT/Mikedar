// mikedar.js

window.onload = function() {
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        var radius = 70;

        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = "#8ED6FF";
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = "black";
        context.stroke();
      };
