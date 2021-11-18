// Created by Thomas Antonacci
// Wisc: Antonacci
// No Borrowed Code, Everything written by Me
// This file holds the artistic part of my program

var canvas;
var context;

var t;

function clock(length) {
    if (length < 5) {
        return;
    }

    let hourPhi = t * 0.0001;
    let minutePhi =  t * 0.0001 * 60;


    context.save();
    context.rotate(hourPhi);
    line(0,0,0,length * 0.8);
    context.translate(0, length * 0.8);
    clock(length * 0.8);
    context.restore();
    context.save();
    context.rotate(minutePhi);
    line(0,0,0,length);
    context.translate(0, length);
    clock(length * 0.85);
    context.restore();

}

function draw() {
    canvas.width = canvas.width;

    let dt = parseInt(timeSlider.value);

    context.strokeStyle = `rgba(50,100,50, 0.4)`;
    context.lineWidth = 2;

    t = t + dt;
    context.translate(canvas.width / 2, canvas.height / 2);
    clock(50);


    window.requestAnimationFrame(draw);
}

function setup() {
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');

    timeSlider.value = "1";
    t = 0;
    window.requestAnimationFrame(draw);
}


window.onload = setup;