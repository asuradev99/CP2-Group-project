function setup() {
  createCanvas(400, 400);
}

var x1 = 30;
var y1 = 75;
var x2 = 58;
var y2 = 20;
var x3 = 86
var y3 = 75;

function draw() {
  background(220);
  if(keyIsPressed) {
    if(keyCode==LEFT_ARROW) {
      x1--;
      x2--;
      x3--;
    } else if(keyCode==RIGHT_ARROW) {
      x1++;
      x2++;
      x3++;
    }
    if(keyCode==UP_ARROW) {
      y1--;
      y2--;
      y3--;
    } else if(keyCode==DOWN_ARROW) {
      y1++;
      y2++;
      y3++;
    }
  }
  
  triangle(x1, y1, x2, y2, x3, y3);
  
}
