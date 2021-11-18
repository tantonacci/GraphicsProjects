// Created by Thomas Antonacci
// Wisc: Antonacci
// No Borrowed Code, Everything written by Me
// This file has my helper functions, for ease of use
var curTx;
var txStack;

var debug = false;

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

function scale(factor) {
    if (debug) {
        console.log("Going to scale by factor=" + factor);
        console.log("starting curTx=(" +curTx + ")");
    }

    glMatrix.mat3.scale(curTx, curTx, [factor, factor]);

    if (debug) console.log("Final curTx=(" + curTx + ")");
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