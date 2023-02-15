const inc = 10;
let x, y;
function setup() {
    createCanvas(window.innerWidth,window.innerHeight);
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
    ellipse(window.innerWidth/2,window.innerHeight/2,x,y);
   // rect(40, 120, 120, 40);
}
console.log("Hello World");