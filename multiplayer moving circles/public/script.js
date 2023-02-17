//get container for our canvas
const sketchContainer = document.getElementById("sketch-container");

//get socket which only uses websockets as a means of communication
const socket = io({
  transports: ["websocket"]
});

//the p5js sketch
const sketch = (p) => {
  let positions = {};
  let xx,yy
  xx = 100
  yy = 100
  //the p5js setup function
  p.setup = () => {
    //to fill up the full container, get the width an height
    const containerPos = sketchContainer.getBoundingClientRect();
    const cnv = p.createCanvas(containerPos.width, containerPos.height); //the canvas!
/*
    cnv.mousePressed(() => {
      //when you click on the canvas, update your position
      socket.emit("updatePosition", {
        x: p.mouseX / p.width, // always send relative number of position between 0 and 1
        y: p.mouseY / p.height //so it positions are the relatively the same on different screen sizes.
      });
    });*/
    p.fill(255); //sets the fill color of the circle to white
    p.frameRate(30); //set framerate to 30, same as server
    socket.on("positions", (data) => {
      //get the data from the server to continually update the positions
      positions = data;
    });
  };

  //the p5js draw function, runs every frame rate
  //(30-60 times / sec)
  p.draw = () => {
    if(p.keyIsPressed){
      if(p.key == 'w'){
        yy-=10
      } if(p.key == 'a'){
        xx-=10
      } if(p.key == 's'){
        yy+=10
      } if(p.key == 'd'){
        xx+=10
      }
      socket.emit("updatePosition", {
        x: xx,
        y: yy
      });
      console.log("bruh")
    }
    p.background(0); //reset background to black
    //draw a circle for every position
    for (const id in positions) {
      const position = positions[id];
      p.circle(position.x, position.y, 50);
    }
  };
};

//initialize the sketch!
new p5(sketch, sketchContainer);