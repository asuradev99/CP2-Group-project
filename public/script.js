//get container for our canvas
const sketchContainer = document.getElementById("sketch-container");

//get socket which only uses websockets as a means of communication
const socket = io({
  transports: ["websocket"]
});
var clientid
socket.on("connect", () => {
  clientid = socket.id 
});


//the p5js sketch
const sketch = (p) => {
  let positions = {};
  let xx,yy, aa
  xx = 100
  yy = 100
  aa = 0
  let targetAngle = 0.0;
  let currentAngle = 0.0;
  let x;
  let y;
  let a;
  let smoothSpeed = 1;
  let scl = 25.0;
  const count = 3;
  let iToTheta;

  //the p5js setup function
  p.setup = () => {
    //to fill up the full container, get the width an height
    const containerPos = sketchContainer.getBoundingClientRect();
    const cnv = p.createCanvas(containerPos.width, containerPos.height); //the canvas!
    iToTheta = p.TWO_PI / count;

    p.fill(255); //sets the fill color of the circle to white
    p.frameRate(60); //set framerate to 30, same as server
    socket.on("positions", (data) => {
      //get the data from the server to continually update the positions
      positions = data;
    });
  };

  //the p5js draw function, runs every frame rate
  //(30-60 times / sec)
  p.draw = () => {
    keyboardControl();
    sendPacket();
    aa = p.atan2(p.mouseY - yy, p.mouseX - xx)
    
    p.background(51); //reset background to black
    //draw a circle for every position
    render(xx, yy, aa);
    for (const id in positions) {
      if (id != clientid){
      const position = positions[id];
      //p.circle(position.x, position.y, 50);
      render(position.x, position.y, position.a)
      }
    }
  };

  async function sendPacket() {
    socket.emit("updatePosition", {
      x: xx,
      y: yy,
      a: p.atan2(p.mouseY - y, p.mouseX - x)
    });
  }

  function render(x, y, targetAngle){
    //targetAngle = p.atan2(p.mouseY - y, p.mouseX - x);
	  currentAngle = lerpAngle(currentAngle, targetAngle, smoothSpeed);
    p.beginShape();
	    for (let i = 0; i < count; ++i) {
		    const theta = currentAngle + i * iToTheta;
		    p.vertex(x + p.cos(theta) * scl, y + p.sin(theta) * scl);
	    }
      p.fill(51);
      p.stroke('white');
	  p.endShape(p.CLOSE);
    //console.log(targetAngle)
  }

  function keyboardControl(){
    if(p.keyIsPressed) {
      if(p.keyIsDown(p.LEFT_ARROW)||p.keyIsDown(65)) {
        xx-=5;
      } 
      if(p.keyIsDown(p.RIGHT_ARROW)||p.keyIsDown(68)) {
       xx+=5;
      }
      if(p.keyIsDown(p.UP_ARROW)||p.keyIsDown(87)) {
        yy-=5;
      } 
      if(p.keyIsDown(p.DOWN_ARROW)||p.keyIsDown(83)) {
        yy+=5;
      }
    }
  }

  function lerpAngle(a, b, step) {
  // Prefer shortest distance,
    const delta = b - a;
    if (delta == 0.0) {
      return a;
    } else if (delta < -p.PI) {
      b += p.TWO_PI;
    } else if (delta > p.PI) {
      a += p.TWO_PI;
    }
    return (1.0 - step) * a + step * b;
  }
};




//initialize the sketch!
new p5(sketch, sketchContainer);