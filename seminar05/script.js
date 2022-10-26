var my_canvas = document.getElementById("myCanvas");
var ctx = my_canvas.getContext("2d");
const W = my_canvas.clientWidth;
const H = my_canvas.clientHeight;
ctx.fillStyle = "blue";

class Square {
    constructor(x, y, l, dx, dy) {
        this.x = x;
        this.y = y;
        this.l = l;
        this.dx = dx;
        this.dy = dy;
    }

    drawSquare() {
        ctx.fillRect(this.x, this.y, this.l, this.l);
    }

    collide() {
        if(this.x + this.l >= W || this.x <= 0) {
            this.dx *= -1;
        }
        if(this.y + this.l >= H || this.y <= 0) {
            this.dy *= -1;
        }
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
    }
}

// var x = 10;
// var y = 10;
// var dx = 7; // dx -> deplasament x
// var dy = 5;
// var l = 30; // l -> latura

var squares = [];



function addSquare() {
    const square = new Square(10, 10, 30, 1 + Math.random()*10, 1 + Math.random()*10);
    squares.push(square);
}

function init() {
}

function draw() {
    

    ctx.clearRect(0, 0, W, H);

    squares.forEach(square => {
        square.collide();
        square.drawSquare();
    });

    window.requestAnimationFrame(draw);
}

window.onload = window.requestAnimationFrame(draw);

// var interval = window.setInterval(draw, 1000/60);

// function stop() {
//     window.clearInterval(interval);
// }