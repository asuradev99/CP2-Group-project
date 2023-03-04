//get container for our canvas
const sketchContainer = document.getElementById("sketch-container");

//get socket which only uses websockets as a means of communication

const socket = io({
  transports: ["websocket"]
});

//const socket = io('http://game.0000727.xyz:8080')
var clientid

// ---------------------- create a variable containing the id of the client
socket.on("connect", () => {
  clientid = socket.id
  console.log('connected')
});

//the p5js sketch
const sketch = (p) => {

  // ----------------- create variables
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
  var clientPlayer = new Player(clientname, p, window.innerWidth/2, window.innerHeight/2);

  
  
  //the p5js setup function
  p.setup = () => {
    //to fill up the full container, get the width an height
    const containerPos = sketchContainer.getBoundingClientRect();
    //const cnv = p.createCanvas(containerPos.width, containerPos.height); //the canvas!

    // ---------------------- create the canvas as large as the screen width and height
    const cnv = p.createCanvas(window.innerWidth, window.innerHeight);
    //laser = new Laser(width/2, height/2, mouseX, mouseY, 5);
    p.frameRate(60); //set framerate to 30, same as server
    socket.on("positions", (data) => {
      //get the data from the server to continually update the positions
      positions = data;
    });
  };

  //the p5js draw function, runs every frame rate
  //(30-60 times / sec)
  p.draw = () => {

    // check for wasd / arrow keys to move player
    clientPlayer.move();

    // send new player position to server
    sendPacket();

    // get the target angle that the player has to face
    mouseAngle = p.atan2(p.mouseY - clientPlayer.y - clientPlayer.cameraOffsetY, p.mouseX - clientPlayer.x - clientPlayer.cameraOffsetX)

    // laser.move();
    // laser.draw();
    p.background(232); //reset background to black

    // create a grid behind the player
    grid(clientPlayer.cameraOffsetX, clientPlayer.cameraOffsetY)

    // get the angle that the player has to rotate to
    clientPlayer.rotate(mouseAngle);

    // render the player in the middle of the screen
    clientPlayer.render(clientPlayer.cameraOffsetX, clientPlayer.cameraOffsetY);

    // for each client id got from the server except your client, render them
    for (const id in positions) {
      if (id != clientid){
        // create a player for that id in positions
        const player = new Player(positions[id].name, p, positions[id].x, positions[id].y);
        // rotate that player and render them
        player.rotate(positions[id].a)
        player.render(clientPlayer.cameraOffsetX, clientPlayer.cameraOffsetY);
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
/*
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
  */
  function grid(offsetX, offsetY){
    p.stroke(201)
    for (let i = -100; i < window.innerWidth; i+=100){
      for (let j = -100; j < window.innerHeight; j+=100){
        x=window.innerWidth-i+(offsetX%100)-200
        y=window.innerHeight-j+(offsetY%100)-50
        p.line(x, y+200, x, y-window.innerHeight-200)
        p.line(x+200, y, x-window.innerWidth-200, y)
      }
    }
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
