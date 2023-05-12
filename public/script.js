//get container for our canvas
//const sketchContainer = document.getElementById("sketch-container");

//get socket which only uses websockets as a means of communication
//everybody wrote script
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
let players = [];
let lasers = [];
let lastShotTime = 0;
let lastHitTime = 0;
let canShoot;
let numberOfPlayers = 0;
let newLaser = [-1, -1];
let newPoints;
let newMoney;
var diesound = new Audio('/sound/die.wav');
var bidensong = new Audio('/sound/the_song.wav');
var boundaryX= 2000;
var boundaryY = 2000;
let laserThatLastHitThePlayer;
let bulletCounter = 0;

// its like garbagew collection but for lasers
let laserCollection = [-1, -1]

mouseAngle = 0

// steven
let clientname = "";
while(clientname.length < 1 || clientname.length > 30){
  clientname = window.prompt("what is ur name (max length is 30 characters)","Name");
}
var clientPlayer = new Player(clientname, window.innerWidth/2, window.innerHeight/2, lastShotTime, 100, 25, clientid, 0, 0, 0, 5, 10);



//the p5js setup function
// steven and ethan
function setup() {
  //to fill up the full container, get the width an height
  // create the canvas as large as the screen width and height
  createCanvas(window.innerWidth, window.innerHeight);
  // S = new Store();
  // let StoreButton = createButton('Store');
  // StoreButton.position(window.innerWidth- 100, 100);
  // StoreButton.mousePressed(S.Display());

  store = new Store();
  store.start(clientPlayer);

  frameRate(60); //set framerate to 60, same as server

  socket.on("positions", (data) => {
    //get the data from the server to continually update the positions
    positions = data;
  });
  socket.on("time", (data) => {
    numberOfPlayers = data;
  });
  socket.on("recievebullet", (data) => {
    //console.log("we bullet")
    newLaser = data;
    
  })
  socket.on("recievekill", (data) =>{
    if(clientid == data.id){
      //console.log("kill confirmed")
      newPoints = 100+positions[data.id2].points;
      newMoney = 1+positions[data.id2].money;
      clientPlayer.points = clientPlayer.points + newPoints
      clientPlayer.money = clientPlayer.money + newMoney
    }
  })

  socket.on("recieveDeleteBullet", (data) =>{
    laserCollection = data;
  })

};

// ethan
function drawGrid() {
  let step = 100;

   //calculate starting and ending coordinates of the grid based on the position of the camera and the zoom level
   let left = -step + Math.ceil((clientPlayer.x - 1.5 * (canvas.width / 2)) / step) * step;
   let top = -step + Math.ceil((clientPlayer.y - 1.5 * (canvas.height / 2 )) / step) * step;
   let right = clientPlayer.x + 1.5 * (canvas.width / 2);
   let bottom = clientPlayer.y + 1.5 * (canvas.height / 2);


   strokeWeight(6);
   stroke(40);


   for (let x = left; x < right; x += step) {
      line(x, top, x, bottom);
   }

   for (let y = top; y < bottom; y += step) {
      line(left, y, right, y);
   }

}


//the p5js draw function, runs every frame rate
//(30-60 times / sec)
function draw() {

  //draw background color and grid ethan
  background(0); 

  //apply camera transformation ethan
  translate(width / 2, height / 2);
  translate(-clientPlayer.x, -clientPlayer.y);

  //grid
  //grid()
  drawGrid();

  //boundary
  checkBoundary();

  // leaderboard
  leaderboard()

  //update player position
  clientPlayer.move();
  mouseAngle = atan2(mouseY - height / 2, mouseX - width / 2)
  clientPlayer.rotate(mouseAngle);
  clientPlayer.render();

  // for each client id got from the server except your client, render them
  // steven
  for (const id in positions) {
    if (id != clientid && positions[id].hp > 0){
      // create a player for that id in positions
      const player = new Player(positions[id].name, positions[id].x, positions[id].y, positions[id].lastShotTime, positions[id].hp, positions[id].shield, id, positions[id].points, positions[id].money, positions[id].inertia, positions[id].laserDamage, positions[id].laserSpeed);
      // rotate that player and render them
      player.rotate(positions[id].a)
      player.render();

      // put a circle if the player is offscreen
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
      
      // ethan
      if(newLaser[0] == id) {
        //console.log("i ahve to shot")
        laser = new Laser(player.x, player.y, player.currentAngle, player.laserSpeed, 500, player, id, player.laserDamage, player.inertia, newLaser[1]);
        
        lasers.push(laser)
      }

 
      // if(positions[id].isShooting){
      //   text("I am soting", player.x, player.y)
      //   player.shoot(lasers, mill)
      // }
      
    }
  }


  //laser stuff ayush + alon
  for (var j = lasers.length - 1; j >= 0; j--) {
    lasers[j].draw();
    lasers[j].move();

    // remove lasers that are not moving
    // steven
    if (lasers[j].speed == 0 || lasers[j].hit){
      lasers.splice(j, 1)
    }

    //laser hit player
    if (lasers[j].collisionCheck(clientPlayer) && lasers[j].hit == false){
      sendDeleteBullet([lasers[j].id, lasers[j].bulletid]);
      //shield steven
      if(clientPlayer.shield > 0){
        //clientPlayer.shield=clientPlayer.shield - lasers[j].damage;
        clientPlayer.shield=clientPlayer.shield - lasers[j].damage;
        if(clientPlayer.shield < 0){
          clientPlayer.hp=clientPlayer.hp+clientPlayer.shield-1
          clientPlayer.shield=0;
        }
      } else{
        clientPlayer.hp=clientPlayer.hp-lasers[j].damage;
      }
      lasers[j].hit = true;
      laserThatLastHitThePlayer = lasers[j].id;

      lastHitTime = performance.now()

      if(lasers[j].id == laserCollection[0] && lasers[j].bulletid == laserCollection[1]){
        lasers[j].speed = 0;
      }
      lasers.splice(j, 1);
      break;
    }

    
  }

  //shield come back
  // steven
  if(performance.now() - lastHitTime > 5000) {
    if(clientPlayer.shield < clientPlayer.maxShield){
      clientPlayer.shield=clientPlayer.shield+clientPlayer.shieldRegen;
    }
    if(clientPlayer.isHpRegen){
      if(clientPlayer.hp < clientPlayer.maxHp){
        clientPlayer.hp = clientPlayer.hp + clientPlayer.hpRegen;
      }
    }
  }

  // shoot bullet
  if (mouseIsPressed) {
    if(performance.now() - clientPlayer.lastShotTime >= clientPlayer.reloadTime) {
      sendBullet(bulletCounter);
      bulletCounter++;
      
    }
    clientPlayer.shoot(lasers, performance.now());

    clientPlayer.isShooting = true;
  } else {
    clientPlayer.isShooting = false;
  }

  //send updated packet to server
  sendPacket();

  // steven and ethan
  newLaser = [-1, -1];
  
//die
// steven
  if(clientPlayer.hp <= 0){
    sendKill(laserThatLastHitThePlayer, clientid);
    para = document.createElement("p");
    try{
    text = "you are dead, not big surprise, you were killed by "+positions[laserThatLastHitThePlayer].name;
    }catch{
      text = "you committed suicide"
    }

    // ayush
    diesound.play();

    node = document.createTextNode(text);
    para.appendChild(node);
    elmnt = document.getElementById("bruh");
    elmnt.appendChild(para);
    var img = document.createElement("img");
    if(Math.floor(Math.random()*2)==0){
      img.src = "./graphics/death png.png";
    } else{
      img.src = "./graphics/elon_game_over.png"
    }
    var src = document.getElementById("bruh");
    src.appendChild(img);
    elmnt = document.getElementById("defaultCanvas0"); elmnt.remove();
    0/0;
  }
};

// steven and ethan
async function sendPacket() {
  socket.emit("updatePosition", {
    x: clientPlayer.x,
    y: clientPlayer.y,
    a: mouseAngle,
    name: clientname,
    isShooting: clientPlayer.isShooting,
    lastShotTime: clientPlayer.lastShotTime,
    millis: 0,
    hp: clientPlayer.hp,
    shield: clientPlayer.shield,
    points: clientPlayer.points,
    money: clientPlayer.money,
    inertia: clientPlayer.inertia,
    laserDamage: clientPlayer.laserDamage,
    laserSpeed: clientPlayer.laserSpeed
  });

}
// seteven and ethan
async function sendBullet(c) {
  socket.emit("bullet", {
    c: c
    
  })
}
// steven
async function sendKill(id, id2){
  socket.emit("kill", {
    id: id,
    id2: id2
  })
}
//delete laser
async function sendDeleteBullet(id){
  socket.emit("deleteBullet", {
    id: id
  })
}


//boundary alon + ayush
function checkBoundary(){
  stroke(255,255,255);
  strokeWeight(10);
  noFill();
  rect(-2010,-2010,4010,4010);
    if (clientPlayer.x <= -boundaryX) { 
      clientPlayer.x = -1999;
    }
    if (clientPlayer.x >= boundaryX) {
      clientPlayer.x = 1999;
    }
    if (clientPlayer.y <= -boundaryY) { 
      clientPlayer.y = -1999;
    }
    if (clientPlayer.y >= boundaryY) {
     clientPlayer.y = 1999;
 }
 fill(0,0,0);
}

// steven
function leaderboard(){
  stroke(255,0,0)
  strokeWeight(6);
  let sortedPoints = [
    ['LEADERBOARD', 9999],
    ['------------------', 9997]
  ];
  for(const id in positions){
    // for(let i = 0; i<numberOfPlayers+1; i++){
    //   if(sortedPoints[i][1]<positions[id].points){
    //     sortedPoints.splice(i, 0, [positions[id].name, positions[id].points])
    //   } else{
    //     temparray = [positions[id].name, positions[id].points]
    //     sortedPoints.push(temparray)
    //   }
    // }
    if(positions[id].hp > 0 && positions[id].name.length > 0){
      temparray = [positions[id].name, positions[id].points]
      sortedPoints.push(temparray)
    }
  }

  for(let i = 0; i < sortedPoints.length; i++){
    for(let j = i+1; j < sortedPoints.length; j++){
      if(sortedPoints[j][1] > sortedPoints[i][1]){
        let temp = sortedPoints[i];
        sortedPoints[i] = sortedPoints[j];
        sortedPoints[j] = temp;
      }
    }
  }

  //steven
  let temptext = sortedPoints[0][0]
  text(temptext, clientPlayer.x+window.innerWidth/3, clientPlayer.y-window.innerHeight/3)
  temptext = sortedPoints[1][0]
  text(temptext, clientPlayer.x+window.innerWidth/3, clientPlayer.y-window.innerHeight/3+20)
  for(let i = 3; i<sortedPoints.length; i++){
    let temptext = sortedPoints[i][0]+': '+sortedPoints[i][1]
    text(temptext, clientPlayer.x+window.innerWidth/3, clientPlayer.y-window.innerHeight/3+20*i)
    //console.log('printing leaderboard: '+temptext)
 
  }
}
