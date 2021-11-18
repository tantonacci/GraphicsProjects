// Created by Thomas Antonacci
// Wisc: Antonacci
// No Borrowed Code, Everything written by Me
// This file has my helper functions, for ease of use
var curTx;
var txStack;

var debug = false;

var curveRes = 100;

function setupTx() {
curTx = glMatrix.mat3.create();
//glMatrix.mat3.set(curTx, 0, 0, 0, 0, 0, 0, 0, 0, 0)
//glMatrix.mat3.fromTranslation(curTx,[0,0]);
txStack = [];
txStack.push(curTx);
}

// Draws a line from x1,y1 -> x2,y2
function line(x1, y1, x2, y2) {
    context.beginPath();
    moveToTx(x1,y1);
    lineToTx(x2,y2);
    context.stroke();
}

function moveToTx(x, y) {
    var res = glMatrix.vec2.create();
    glMatrix.vec2.transformMat3(res, [x, y], curTx);
    context.moveTo(res[0], res[1]);
}

function lineToTx(x,y) {
    var res = glMatrix.vec2.create();
    glMatrix.vec2.transformMat3(res, [x, y], curTx);
    context.lineTo(res[0], res[1]);
}

// Draws a rectangle with x,y corner and width/height of w/h
function rect(x, y, w, h) {
    context.beginPath();
    context.rect(x, y, w, h);
    context.fill();
}

var hermite = function(t) {
    return [
        2*(t**3) - 3*(t**2) + 1,
        (t**3) - 2*(t**2) + t,
        -2*(t**3) + 3*(t**2),
        (t**3)-(t**2)
    ];
}

var dHermite = function(t) {
    return [
        6*(t**2) - 6*(t),
        3*(t**2) - 4*(t) + 1,
        -6*(t**2) + 6*(t),
        3*(t**2) - 2*(t)
    ];
}

function cubic(P, t) {
    var b = hermite(t);
    var result= glMatrix.vec2.create();
    glMatrix.vec2.scale(result,P[0], b[0]);
    for (var i = 1; i < 4; i++) {
        glMatrix.vec2.scaleAndAdd(result,result,P[i],b[i]);
    }
    return result;
}

function dCubic(P, t) {
    var b = dHermite(t);
    var result= glMatrix.vec2.create();
    glMatrix.vec2.scale(result,P[0], b[0]);
    for (var i = 1; i < 4; i++) {
        glMatrix.vec2.scaleAndAdd(result,result,P[i],b[i]);
    }
    return result;
}

// Expects an array of point arrays and a distance through the curve
function multiCurve(P, t) {
    return cubic(P[Math.floor(t) % P.length], t % 1)
}

function dMultiCurve(P, t) {
    return dCubic(P[Math.floor(t) % P.length], t % 1)
}

function drawCubic(P) {
    context.beginPath();
    var point = cubic(P,0);
    moveToTx(point[0], point[1]);
    for (var i = 1; i <= curveRes; i++) {
        point = cubic(P, i / curveRes);
        lineToTx(point[0], point[1]);
    }
    context.stroke();
}

function drawMultiCubic(P) {
    context.beginPath();
    var point = cubic(P[0],0);
    moveToTx(point[0], point[1]);
    // for (var p = 0; p < P.length; p++) {
    //     for (var i = 1; i <= curveRes; i++) {
    //         point = cubic(P[p], i / curveRes);
    //         lineToTx(point[0], point[1]);
    //     }
    // }
    multiCurve(P, 0);
    multiCurve(P, 1);
    multiCurve(P, 2);
    for (var i = 1; i <= P.length * curveRes; i++) {
        point = multiCurve(P, i / curveRes);
        lineToTx(point[0], point[1]);
    }

    context.stroke();
}

// Draws a polygon
// Shape: a list of vertices to draw
// closed: boolean that determines fill
function poly(shape, closed) {
    context.beginPath();
    context.moveTo(shape[0][0], shape[0][1]);
    for (i = 1; i < shape.length; i++) {
        context.lineTo(shape[i][0],shape[i][1]);
    }
    
    context.closePath();
    if (closed) {
        context.fill();
    }
}

function translate(x, y) {
    if (debug) {
        console.log("Going to translate by x=" + x.toString() + " and y=" + y);
        console.log("starting curTx=(" +curTx + ")");
    }

    glMatrix.mat3.translate(curTx, curTx, [x,y]);

    if (debug) console.log("Final curTx=(" + curTx + ")");

}

function rotate(phi) {
    if (debug) {
        console.log("Going to rotate by phi=" + phi);
        console.log("starting curTx=(" +curTx + ")");
    }

    glMatrix.mat3.rotate(curTx, curTx, phi);

    if (debug) console.log("Final curTx=(" + curTx + ")");
}

function scale2(factorX, factorY) {
    if (debug) {
        console.log("Going to scale by factor=" + factor);
        console.log("starting curTx=(" +curTx + ")");
    }

    glMatrix.mat3.scale(curTx, curTx, [factorX, factorY]);

    if (debug) console.log("Final curTx=(" + curTx + ")");
}

function scale(factor) {
    scale2(factor, factor);
}

function push() {
    if (debug) {
        console.log("Pushing to stack, curTx=(" + curTx +")");
    }
    var cloneTx = glMatrix.mat3.clone(curTx);
    txStack.push(cloneTx);
}

function pop() {
    if (debug) {
        console.log("Before pop, curTx=(" + curTx +")");
    }
    curTx = txStack.pop();
    if (debug) {
        console.log("After pop, curTx=(" + curTx +")");
    }
}