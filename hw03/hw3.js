// Created by Thomas Antonacci
// Wisc: Antonacci
// Using glmatrix, but no other code
// This file holds the artistic part of my program

var canvas;
var context;

var t;

function clock(length, count) {
    if (count > 12) {
        return;
    }

    let hourPhi = t * 0.0003 ;
    let minutePhi =  t * 0.0003  * 60;
    let shrinkRate = 0.85;

    if (debug) {
        console.log("drawing clock with length=", length);
        console.log("starting curTx=(" + curTx + ")");
    }

    push();
    rotate(hourPhi);
    line(0,0,0,length * 0.8);
    translate(0, length * 0.8);
    scale(shrinkRate);
    clock(length, count + 1);
    pop();
    push();
    rotate(minutePhi);
    line(0,0,0,length);
    translate(0, length);
    scale(shrinkRate);
    clock(length, count + 1);
    pop();

}

function draw() {
    canvas.width = canvas.width;
    setupTx();

    let dt = parseInt(timeSlider.value);

    context.strokeStyle = `rgba(50,100,50, 0.4)`;
    context.lineWidth = 2;

    t = t + dt;
    translate(canvas.width / 2, canvas.height / 2);
    clock(50, 0);

    var a = glMatrix.vec2.create();

    window.requestAnimationFrame(draw);
}

function setup() {
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    
    //setupTx();

    timeSlider.value = "1";
    t = 0;
    window.requestAnimationFrame(draw);
}


window.onload = setup;