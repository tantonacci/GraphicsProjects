// Created by Thomas Antonacci
// Wisc: Antonacci
// No Borrowed Code, Everything written by Me

var canvas;
var context;
var walkSlider;

// Personally-Written Ease-Of-Living Functions

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

// Called once when first started
function setup() {
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    walkSlider = document.getElementById('walkSlider');
    walkSlider.value = "0";
    walkSlider.addEventListener("input",draw);

    draw();
}

// Called at each update of the slider
function draw() {

    // Draws a spider in the middle of the canvas (not resizable)
    function spider() {

        // Draws the head of the spider
        function head() {
    
            // Draws the eyes as 8 diagonal red lines. Can change color just below
            function eyes() {
                let tempcolor = context.strokeStyle;

                context.strokeStyle = "#FF0000";
                context.lineWidth = 3; 

                // Outer loop used for flipping over the center line
                for (i = -1; i < 2; i+=2) {
                    for (j = 0; j < 4; j++) {
                        line (225 + 5*i, 55 + 8*j, 225 + 15*i, 60 + 8*j);
                    }
                } 

                //Set back to original strokeColor
                context.strokeStyle = tempcolor;
            }
        
            //context.fillStyle = "#000000";
            rect(200,50,50,50);
            
            eyes();
        }
    
        // Draws the body of the spider
        function body() {
    
            // Draws the legs of the spider
            function legs(width) {
    
                // Draw a single leg of the spider
                // x,y is starting location
                // dir is direction the leg should extend
                // phase is starting rotation for the leg
                function leg(x,y,dir, phase) {
                    context.save();
                    context.translate(x,y);
                    //console.log(Math.sin(phase + (walkSlider.value * .1)));  // Debug line
                    context.rotate(Math.sin(phase + (walkSlider.value * 0.1)) * 0.5 * dir);
                    line(0           ,0      , 60 * dir  , -30);
                    line(60 * dir, -30, 120 * dir, 0);
                    context.restore();
                }
            
                // starting phase will increase slightly for each leg
                let p = 0;
                for (dir = -1; dir < 2; dir +=2) {
                    //p = 0;  // Uncomment for Symmetry
                    for (i = 0; i < 4; i++) {
                        leg(225 + width * dir, 140 + 40*i, dir, p);
                        p += 3.14 / 4;
                    }
                }
            }
    
            // mostly just because I originally drew the body super fat, wanted to slim down a bit
            let width = 30;
            // Drawing the actual polygon for the body
            poly([[200,100],[250, 100], [250 + width, 150],[250 + width,250], [250, 300], [200, 300], [200 - width,250], [200 - width, 150]], true);
        
            context.lineWidth = 10;
            legs(width);
            context.lineWidth = 3;
        }
    
        // Changes the color of the spider
        context.fillStyle = "#111100";
        context.strokeStyle = "#000000";
        head();
        body();
    }

    function bg() {
        context.fillStyle = "#FFFFFF";
        rect(0,0,canvas.width, canvas.height);
    }

    bg();
    spider();
}

window.onload = setup;