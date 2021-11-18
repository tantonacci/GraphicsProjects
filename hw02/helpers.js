// Created by Thomas Antonacci
// Wisc: Antonacci
// No Borrowed Code, Everything written by Me
// This file has my helper functions, for ease of use

// Draws a line from x1,y1 -> x2,y2
function line(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    context.stroke();
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
    //context.stroke();  // Comment as Needed
}
