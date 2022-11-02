const my_canvas = document.getElementById("myCanvas");
const ctx = my_canvas.getContext("2d");
const video = document.getElementById("my_video");
const W = my_canvas.clientWidth;
const H = my_canvas.clientHeight;

var vr = 0;
var xc = 50;
var yc = 50;

var dx = 6;
var dy = 6;
var r = 40;

var xm = 0;
var ym = 0;
var mouse_click_state = false;

document.getElementById("rosu_p").onclick = function() {
    if(vr < 215)    vr +=40 ;
}

document.getElementById("rosu_m").onclick = function() {
    if(vr > 40)    vr -=40 ;
}

function functMouseDown(eventarg) { // xm = x cursor in pagina - x canvas
    const obj = my_canvas.getBoundingClientRect();
    xm = eventarg.clientX - obj.x;
    ym = eventarg.clientY - obj.y;
    if (eventarg.buttons == 1) {
        mouse_click_state = true;
    }
}

function functMouseMove(eventarg) {
    const obj = my_canvas.getBoundingClientRect();
    xm = eventarg.clientX - obj.x;
    ym = eventarg.clientY - obj.y;
}

function functMouseUp(eventarg) {
    mouse_click_state = false;
}

my_canvas.addEventListener("mouseup", functMouseUp);
my_canvas.addEventListener("mousemove", functMouseMove);
my_canvas.addEventListener("mousedown", functMouseDown);

function draw() {
    ctx.drawImage(video, 0, 0);
    var image_data = ctx.getImageData(0, 0, W, H);
    const pixels = image_data.data;
    var index;

    if(xc + r >= W || xc - r <= 0) {
        dx *= -1;
    }
    if(yc + r >= H || yc - r <= 0) {
        dy *= -1;
    }

    // console.log(xm);
    // console.log(ym);
    console.log(mouse_click_state);

    for (y = 0 ; y < H ; y++) {
        for (x = 0 ; x < W ; x++) {
            index = (y * W + x) * 4;
            pixels[index] += vr; // alteram valoarea R 
            if(Math.sqrt((x-xc)*(x-xc) + (y-yc)*(y-yc)) <= r) { // desen cerc prin setarea de alpha
                pixels[index + 3] = 150;
            }
            if(Math.sqrt((x-xm)*(x-xm) + (y-ym)*(y-ym)) <= r && mouse_click_state) {
                pixels[index + 3] = 150;
            }
        }
    }

    xc += dx;
    yc += dy;

    ctx.putImageData(image_data, 0, 0);
    
    window.requestAnimationFrame(draw);
}

window.onload = window.requestAnimationFrame(draw);