const my_canvas = document.getElementById("myCanvas");
const context = my_canvas.getContext("2d");

const y_speed_init = 1;
const y_start = 150;
const squish_max = 35;
const y_acc = 0.1;          // y_acc -> acceleratia pe y

var width = 100;
var height = 100;
var x = my_canvas.width/2;
var y = y_start;
var direction = "down";
var squish = 0;             // squish -> cu cat scade height cand mingea atinge pamantul
var y_speed = y_speed_init;
var y_speed_;               // y_speed_ -> stocheaza y_speed in pause() si unpause()
var paused = false;         // paused -> check daca animatia e oprita


function init() {
    window.requestAnimationFrame(draw);
}


function drawBall(y, squish = 0) {
    context.beginPath();
    context.strokeStyle = "#da6f0b";
    context.fillStyle = "#f27a0d";
    context.ellipse(x, y, width + squish, height - squish, 0, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
}


function draw() {
    if(paused) {
        return;
    } else {
        context.clearRect(0, 0, my_canvas.width, my_canvas.height);
        drawBall(y, squish);

        if(y + height - squish >= my_canvas.height) {       // lower boundary
            squish += y_speed;
            if(squish >= squish_max) {
                direction = "up";
            }
        }

        if(y_speed <= 0 && direction === "up") {            // upper boundary
            y_speed = 0;
            direction = "down";
        }

        if(y_speed < 0) {           // validari pentru y_speed
            y_speed = 0;
        }

        if(y_speed > 8) {
            y_speed = 8;
        }

        if(direction === "down") {          // update pozitie pe y
            y += y_speed;
            y_speed += y_acc;
        } else if(direction === "up") {
            if(squish) {
                squish -= y_speed;
                if(squish < 0) {
                    squish = 0;
                }
            }
            y -= y_speed;
            y_speed -= y_acc;
        }

        

        document.getElementById("spanY_speed").innerHTML = y_speed.toFixed(2);
        document.getElementById("span_y").innerHTML = y.toFixed(2);
        window.requestAnimationFrame(draw);
    }
}


function resetAnimation() {
    y = y_start;
    y_speed = y_speed_init;
    squish = 0;
    direction = "down";
}


function swapState() {
    if(paused) {
        unpause();
        document.getElementById("btPause").innerHTML = "Pause";
    } else if(!paused) {
        pause();
        document.getElementById("btPause").innerHTML = "Unpause";
    }
}

function unpause() {
    paused = false;
    window.requestAnimationFrame(draw);
}

function pause() {
    paused = true;
}

window.onload = init();
