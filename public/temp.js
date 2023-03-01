let targetAngle = 0.0;
let currentAngle = 0.0;
let x;
let y;
let smoothSpeed = 1;
let scl = 25.0;
const count = 3;
let iToTheta;
function setup() {
  createCanvas(windowWidth, windowHeight);
	x = width * 0.5;
	y = height * 0.5;
	iToTheta = TWO_PI / count;
}

function draw() {
  background(51);
  if(keyIsPressed) {
    if(keyCode==LEFT_ARROW||key=='a') {
      x-=5;
    } else if(keyCode==RIGHT_ARROW||key=='d') {
     x+=5;
    }
    if(keyCode==UP_ARROW||key=='w') {
      y-=5;
    } else if(keyCode==DOWN_ARROW||key=='s') {
    y+=5;
    }
  }
  targetAngle = atan2(mouseY - y, mouseX - x);
	currentAngle = lerpAngle(currentAngle, targetAngle, smoothSpeed);
  beginShape();
	for (let i = 0; i < count; ++i) {
		const theta = currentAngle + i * iToTheta;
		vertex(x + cos(theta) * scl, y + sin(theta) * scl);
	}
    fill(51);
    stroke('red');
	endShape(CLOSE);
}

function lerpAngle(a, b, step) {
// Prefer shortest distance,
	const delta = b - a;
	if (delta == 0.0) {
		return a;
	} else if (delta < -PI) {
		b += TWO_PI;
	} else if (delta > PI) {
		a += TWO_PI;
	}
	return (1.0 - step) * a + step * b;
}