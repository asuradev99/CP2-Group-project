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
  let xx,yy
  xx = 100
  yy = 100
  let targetAngle = 0.0;
  let currentAngle = 0.0;
  let x;
  let y;
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
    if(p.keyIsPressed) {
      if(p.keyCode==p.LEFT_ARROW||p.key=='a') {
        xx-=5;
      } else if(p.keyCode==p.RIGHT_ARROW||p.key=='d') {
       xx+=5;
      }
      if(p.keyCode==p.UP_ARROW||p.key=='w') {
        yy-=5;
      } else if(p.keyCode==p.DOWN_ARROW||p.key=='s') {
        yy+=5;
      }
    }
    /*
      socket.emit("updatePosition", {
        x: xx,
        y: yy
      });
      console.log("bruh")*/
    sendPacket();
    
    p.background(51); //reset background to black
    //draw a circle for every position
    render(xx, yy);
    for (const id in positions) {
      if (id != clientid){
      const position = positions[id];
      p.circle(position.x, position.y, 50);
      }
    }
  };

  async function sendPacket() {
    socket.emit("updatePosition", {
      x: xx,
      y: yy
    });
  }
  function render(x, y){
    p.circle(x, y, 100)
  }
};


function lerpAngle(a, b, step) {
  // Prefer shortest distance,
    const delta = b - a;
    if (delta == 0.0) {
      return a;
    } else if (delta < -PI) {
      b += p.TWO_PI;
    } else if (delta > PI) {
      a += p.TWO_PI;
    }
    return (1.0 - step) * a + step * b;
  }

//initialize the sketch!
new p5(sketch, sketchContainer);