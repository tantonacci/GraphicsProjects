// Created by Thomas Antonacci
// Wisc: Antonacci
// Using glmatrix, but no other code
// This file holds the artistic part of my program

var canvas;
var context;

var t;

function plane() {
    function nose() {
        var p0 = [0,0];
        var d0 = [-1, 1];
        var p1 = [-1, 2];
        var d1 = [0, 1];

        var L = [p0, d0, p1, d1];

        drawCubic(L);
        line(p1[0], p1[1], p1[0], p1[1] + 2);

    }
    
    function wing() {
        line(0,0,-3, 3);
        var p0 = [-3,3];
        var d0 = [-1, 1];
        var p1 = [-4, 5];
        var d1 = [0, 2];

        var L = [p0, d0, p1, d1];

        drawCubic(L);
        line(p1[0], p1[1], p1[0], p1[1] + 1);
        line(p1[0], p1[1] + 1, 0, p1[1] - 1);
    }

    function tail() {
        var p0 = [0,0];
        var d0 = [0,1];
        var p1 = [0.3, 3];
        var d1 = [1,1];

        var L = [p0, d0, p1, d1];
        drawCubic(L);
        line(0.3, 3, -1, 4);

        p0 = [-1, 4];
        d0 = [-.25, .25];
        p1 = [-1, 4.5];
        d1 = [0, 1];
        L = [p0, d0, p1, d1];

        drawCubic(L);
        line(-1, 4.5, 1, 4);
    }

    function planeHalf() { 
        push();
        nose();
        translate(-1, 4);
        wing();
        translate(0, 4);
        tail();
        pop();
    }

    push();
    translate(0, -5);
    planeHalf();
    scale2(-1, 1);
    planeHalf();
    context.fillStyle = "blue";
    context.fill();
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
    scale(130);

    //line(0, 0, 100, 100);

    var p0=[1,1]; 
    var d0=[0, -2]; 
    var p1=[-1,-1]; 
    var d1=[0,-2]; 
    var p2=[0,-2]; 
    var d2=[1,0]; 
    var p3=[1,-1];
    var d3=[0, 2];
    var p4=[-1,1];
    var d4=[0, 2];
    var p5=[0, 2];
    var d5=[1, 0]


    var P0 = [p0,d0,p1,d1]; // First two points and tangents 
    var P1 = [p1,d1,p2,d2];
    var P2 = [p2,d2,p3,d3];
    var P3 = [p3,d3,p4,d4];
    var P4 = [p4,d4,p5,d5];
    var P5 = [p5,d5,p0,d0];

    var P = [P0, P1, P2, P3, P4, P5];
    drawMultiCubic(P);

    push();
    //console.log(multiCurve(P, t))
    var loc = multiCurve(P, t/(curveRes*5));
    var tangent = dMultiCurve(P, t/(curveRes*5));
    var angle = Math.atan2(tangent[1],tangent[0]);
    translate(loc[0], loc[1]);
    scale(0.05);
    rotate(angle + Math.PI / 2);
    plane();
    pop();

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