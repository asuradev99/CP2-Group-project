const inc = 10;
let x, y;
function setup() {
    createCanvas(window.innerWidth,window.innerHeight);
    x = width/2;
    y = height/2;
}
function KeyboardControl(){
    if (key == 'w') {
        y -= inc;
      } else if (key == 'a') {
        x -= inc;
      } else if (key == 's') {
        y += inc;
      } else if (key == 'd') {
        x += inc;
      }
}
function draw() {
    background(200);
    ellipse(window.innerWidth/2,window.innerHeight/2,200,200);
   // rect(40, 120, 120, 40);
}
console.log("Hello World");