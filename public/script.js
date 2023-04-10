//get container for our canvas
//const sketchContainer = document.getElementById("sketch-container");

//get socket which only uses websockets as a means of communication

const socket = io({
  transports: ["websocket"]
});

//const socket = io('http://game.0000727.xyz:8080')
var clientid;

// ---------------------- create a variable containing the id of the client
socket.on("connect", () => {
  clientid = socket.id
  clientPlayer.id = clientid
  console.log('connected')
  console.log(clientid)
});

//the p5js sketch


// ----------------- create variables
let positions = {};
let lasers = [];
let lastShotTime = 0;
let lastHitTime = 0;
let canShoot;
let mill;
let newLaser;

let laserThatLastHitThePlayer;

mouseAngle = 0

let clientname = window.prompt("what is ur name","deez nuts");
var clientPlayer = new Player(clientname, window.innerWidth/2, window.innerHeight/2, lastShotTime, 100, 25, clientid);



//the p5js setup function
function setup() {
  //to fill up the full container, get the width an height
  // create the canvas as large as the screen width and height
  createCanvas(window.innerWidth, window.innerHeight);

  frameRate(60); //set framerate to 30, same as server

  socket.on("positions", (data) => {
    //get the data from the server to continually update the positions
    positions = data;
  });
  socket.on("time", (data) => {
    mill = data;
  });
  socket.on("recievebullet", (data) => {
    console.log("we bullet")
    newLaser = data;
    
  })
  socket.on("recievekill", (data) =>{
    if(clientid == data){
      clientPlayer.points+=100;
    }
  })

};

//the p5js draw function, runs every frame rate
//(30-60 times / sec)
function draw() {

  //draw background color and grid
  background(0); 

  //apply camera transformation
  translate(width / 2, height / 2);
  translate(-clientPlayer.x, -clientPlayer.y);

  //grid
  grid()

  //update player position
  clientPlayer.move();
  mouseAngle = atan2(mouseY - height / 2, mouseX - width / 2)
  clientPlayer.rotate(mouseAngle);
  clientPlayer.render();

  // for each client id got from the server except your client, render them
  for (const id in positions) {
    if (id != clientid && positions[id].hp > 0){
      // create a player for that id in positions
      const player = new Player(positions[id].name, positions[id].x, positions[id].y, positions[id].lastShotTime, positions[id].hp, positions[id].shield, id);
      // rotate that player and render them
      player.rotate(positions[id].a)
      player.render();

      var circx, circy;
      var smallerside, dist;
      dist = player.findDistance(clientPlayer)
      
      player.collisionCheck(clientPlayer);
      if(window.innerHeight < window.innerWidth){
        smallerside = window.innerHeight;
      } else{
        smallerside = window.innerWidth;
      }
      if(dist>smallerside/2){
        r = ((smallerside/2)-50) / dist
        circx = r * player.x + (1 - r) * clientPlayer.x;
        circy = r * player.y + (1 - r) * clientPlayer.y;
      }
      noFill();
      circle(circx, circy, 200/(dist/100));
      fill(0, 0, 0);
      text(player.playername, circx, circy);
      text(player.hp, circx, circy+20);
      

      if(newLaser == id) {
        console.log("i ahve to shot")
        laser = new Laser(player.x, player.y, player.currentAngle, 10, 500, player, id);
        
        lasers.push(laser)
      }

 
      // if(positions[id].isShooting){
      //   text("I am soting", player.x, player.y)
      //   player.shoot(lasers, mill)
      // }
      
    }
  }


  //laser stuff
  for (var j = lasers.length - 1; j >= 0; j--) {
    lasers[j].draw();
    lasers[j].move();

    // laser hit player
    if (lasers[j].collisionCheck(clientPlayer) && lasers[j].hit == false){
      if(clientPlayer.shield > 0){
        clientPlayer.shield=clientPlayer.shield-5;
        if(clientPlayer.shield < 0){
          clientPlayer.hp=clientPlayer.hp+clientPlayer.shield-1
          clientPlayer.shield=0;
        }
      } else{
        clientPlayer.hp=clientPlayer.hp-5;
      }
      lasers[j].hit = true;
      laserThatLastHitThePlayer = lasers[j].id;

      lastHitTime = performance.now()
    }

    // remove lasers that are not moving
    if (lasers[j].speed == 0){
      lasers.splice(j, 1)
    }
  }

  //shield come back
  if(performance.now() - lastHitTime > 1000) {
    if(clientPlayer.shield < 25){
      clientPlayer.shield=clientPlayer.shield+0.1;
    }
  }

  // shoot bullet
  if (mouseIsPressed) {
    if(performance.now() - clientPlayer.lastShotTime >= clientPlayer.reloadTime) {
      sendBullet(lasers)
      
    }
    clientPlayer.shoot(lasers, performance.now());

    clientPlayer.isShooting = true;
  } else {
    clientPlayer.isShooting = false;
  }

  //send updated packet to server
  sendPacket();

  newLaser = -1;
  
//die
  if(clientPlayer.hp <= 0){
    para = document.createElement("p");
    text = "you are dead, not big surprise, you were killed by "+positions[laserThatLastHitThePlayer].name;
    node = document.createTextNode(text);
    sendKill(laserThatLastHitThePlayer);
    para.appendChild(node);
    elmnt = document.getElementById("bruh");
    elmnt.appendChild(para);
    elmnt = document.getElementById("defaultCanvas0"); elmnt.remove();
  }
};

async function sendPacket() {
  socket.emit("updatePosition", {
    x: clientPlayer.x,
    y: clientPlayer.y,
    a: mouseAngle,
    name: clientname,
    isShooting: clientPlayer.isShooting,
    lastShotTime: clientPlayer.lastShotTime,
    millis: mill,
    hp: clientPlayer.hp,
    shield: clientPlayer.shield
  });

}

async function sendBullet(x, y ,a) {
  socket.emit("bullet", {
    x: x,
    y: y,
    a: a
    
  })
}

async function sendKill(id){
  socket.emit("kill", {
    id: id
  })
}

//grid
function grid(){
  stroke(51)
  for (let i = 0; i < window.innerWidth; i+=100){
    for (let j = 0; j < window.innerHeight; j+=100){
      x=clientPlayer.x - window.innerWidth/2;
      y=clientPlayer.y - window.innerHeight/2;
      line(x, y, x, y+window.innerHeight)
      line(x+window.innerWidth/2, y, x-window.innerWidth/2, y)
    }
  }
}


