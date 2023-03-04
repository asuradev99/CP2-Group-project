//get container for our canvas
const sketchContainer = document.getElementById("sketch-container");

//get socket which only uses websockets as a means of communication

const socket = io({
  transports: ["websocket"]
});

//const socket = io('http://game.0000727.xyz:8080')
var clientid

socket.on("connect", () => {
  clientid = socket.id
  console.log('connected')
});

//the p5js sketch
const sketch = (p) => {
  let positions = {};
  let xx,yy, mouseAngle;
  // xx = 100
  // yy = 100
  mouseAngle = 0
  // let targetAngle = 0.0;
  // let currentAngle = 0.0;
  // let x;
  // let y;
  // let a;
  // let smoothSpeed = 1;
  // let scl = 25.0;
  // const count = 3;
  // let iToTheta;
  let clientname = window.prompt("what is ur name","deez nuts");
  var clientPlayer = new Player(clientname, p, 100, 100);

  
  
  //the p5js setup function
  p.setup = () => {
    //to fill up the full container, get the width an height
    const containerPos = sketchContainer.getBoundingClientRect();
    //const cnv = p.createCanvas(containerPos.width, containerPos.height); //the canvas!
    const cnv = p.createCanvas(window.innerWidth, window.innerHeight);
    //laser = new Laser(width/2, height/2, mouseX, mouseY, 5);
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
    clientPlayer.move();
    sendPacket();
    mouseAngle = p.atan2(p.mouseY - clientPlayer.y, p.mouseX - clientPlayer.x)
    // laser.move();
    // laser.draw();
    p.background(51); //reset background to black
    //draw a circle for every position
    clientPlayer.rotate(mouseAngle);
    clientPlayer.render();
    for (const id in positions) {
      if (id != clientid){
        const player = new Player(positions[id].name, p, positions[id].x, positions[id].y);
        player.rotate(positions[id].a)
        player.render();
      }
    }
  };

  async function sendPacket() {
    socket.emit("updatePosition", {
      x: clientPlayer.x,
      y: clientPlayer.y,
      a: mouseAngle,
      name: clientname
    });
    // socket.emit("updateServer", {
    //   player: clientPlayer
    // })
  }

  function render(x, y, targetAngle, name){
    //targetAngle = p.atan2(p.mouseY - y, p.mouseX - x);
	  currentAngle = lerpAngle(currentAngle, targetAngle, smoothSpeed);
    p.beginShape();
	    for (let i = 0; i < count; ++i) {
		    const theta = currentAngle + i * iToTheta;
		    p.vertex(x + p.cos(theta) * scl, y + p.sin(theta) * scl);
	    }
      p.fill('white');
      p.stroke('red');
	  p.endShape(p.CLOSE);
    p.text(name, x, y)
    //console.log(targetAngle)
  }

  // function keyboardControl(){
  //   if(p.keyIsPressed) {
  //     if(p.keyIsDown(p.LEFT_ARROW)||p.keyIsDown(65)) {
  //       xx-=5;
  //     } 
  //     if(p.keyIsDown(p.RIGHT_ARROW)||p.keyIsDown(68)) {
  //      xx+=5;
  //     }
  //     if(p.keyIsDown(p.UP_ARROW)||p.keyIsDown(87)) {
  //       yy-=5;
  //     } 
  //     if(p.keyIsDown(p.DOWN_ARROW)||p.keyIsDown(83)) {
  //       yy+=5;
  //     }
  //   }
  // }

  // function lerpAngle(a, b, step) {
  // // Prefer shortest distance,
  //   const delta = b - a;
  //   if (delta == 0.0) {
  //     return a;
  //   } else if (delta < -p.PI) {
  //     b += p.TWO_PI;
  //   } else if (delta > p.PI) {
  //     a += p.TWO_PI;
  //   }
  //   return (1.0 - step) * a + step * b;
  // }
};




//initialize the sketch!
//new p5(sketch, sketchContainer);
new p5(sketch, sketchContainer)