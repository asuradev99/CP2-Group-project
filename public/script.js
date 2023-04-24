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
let lasers = [];
let lastShotTime = 0;
let lastHitTime = 0;
let canShoot;
let numberOfPlayers = 0;
let newLaser;
let newPoints;
let newMoney;
let diesound = new Audio('./sound/die.wav');

let laserThatLastHitThePlayer;

mouseAngle = 0

// steven
let clientname = window.prompt("what is ur name","deez nuts");
var clientPlayer = new Player(clientname, window.innerWidth/2, window.innerHeight/2, lastShotTime, 100, 25, clientid, 0);



//the p5js setup function
// steven and ethan
function setup() {
  //to fill up the full container, get the width an height
  // create the canvas as large as the screen width and height
  createCanvas(window.innerWidth, window.innerHeight);
  //  S = new Store();
  // StoreButton = createButton('Store');
  // StoreButton.position(window.innerWidth- 100, 100);
  // StoreButton.mousePressed(S.Display());
  frameRate(60); //set framerate to 60, same as server

  socket.on("positions", (data) => {
    //get the data from the server to continually update the positions
    positions = data;
  });
  socket.on("time", (data) => {
    numberOfPlayers = data;
  });
  socket.on("recievebullet", (data) => {
    console.log("we bullet")
    newLaser = data;
    
  })
  socket.on("recievekill", (data) =>{
    if(clientid == data.id){
      console.log("kill confirmed")
      newPoints = 100+positions[data.id2].points;
      newMoney = 100+positions[data.id2].money;
      clientPlayer.points = clientPlayer.points + newPoints
      clientPlayer.money = clientPlayer.money + newMoney
    }
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
      const player = new Player(positions[id].name, positions[id].x, positions[id].y, positions[id].lastShotTime, positions[id].hp, positions[id].shield, id, positions[id].points, positions[id].money);
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
      
      // ethan
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


  //laser stuff ayush + alon
  for (var j = lasers.length - 1; j >= 0; j--) {
    lasers[j].draw();
    lasers[j].move();

    //laser hit player
    if (lasers[j].collisionCheck(clientPlayer) && lasers[j].hit == false){
      //shield steven
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
    // steven
    if (lasers[j].speed == 0){
      lasers.splice(j, 1)
    }
  }

  //shield come back
  // steven
  if(performance.now() - lastHitTime > 5000) {
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

  // steven and ethan
  newLaser = -1;
  
//die
// steven
  if(clientPlayer.hp <= 0){
    sendKill(laserThatLastHitThePlayer, clientid);
    para = document.createElement("p");
    text = "you are dead, not big surprise, you were killed by "+positions[laserThatLastHitThePlayer].name;

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
    money: clientPlayer.money
  });

}
// seteven and ethan
async function sendBullet(x, y ,a) {
  socket.emit("bullet", {
    x: x,
    y: y,
    a: a
    
  })
}
// steven
async function sendKill(id, id2){
  socket.emit("kill", {
    id: id,
    id2: id2
  })
}

// steven
function leaderboard(){
  console.log(numberOfPlayers)
  stroke(255,0,0)
  let sortedPoints = [
    ['LEADERBOARD', 9999],
    ['best sorting algorithm', 9998],
    ['------------------', 9997]
  ];
  for(const id in positions){
    for(let i = 0; i<numberOfPlayers+1; i++){
      if(sortedPoints[i][1]<positions[id].points){
        sortedPoints.splice(i, 0, [positions[id].name, positions[id].points])
      } else{
        temparray = [positions[id].name, positions[id].points]
        sortedPoints.push(temparray)
      }
    }
  }

  // for(const id in positions){
  //   temparray = [positions[id].name, positions[id].points];
  //   sortedPoints.push(temparray);
  // };
  // for(let i = 0; i < sortedPoints.length; i++){
  //   let minindex = i
  //   j = i+1;
  //   for(j< sortedPoints.length; j++;){
  //     jValue = sortedPoints[j]
  //     indexValue = sortedPoints[minindex]
  //     // if(jValue < indexValue){
  //     //   minindex = j;
  //     // }
  //   }
  //   let tempi = sortedPoints[i][1]
  //   let tempminindex = sortedPoints[minindex][1]
  //   sortedPoints[i][1] = tempminindex;
  //   sortedPoints[minindex][1] = tempi;
  // }

  //steven
  let temptext = sortedPoints[0][0]
  text(temptext, clientPlayer.x+window.innerWidth/3, clientPlayer.y-window.innerHeight/3)
  temptext = sortedPoints[1][0]
  text(temptext, clientPlayer.x+window.innerWidth/3, clientPlayer.y-window.innerHeight/3+20)
  temptext = sortedPoints[2][0]
  text(temptext, clientPlayer.x+window.innerWidth/3, clientPlayer.y-window.innerHeight/3+40)
  for(let i = 3; i<sortedPoints.length-1; i++){
    let temptext = sortedPoints[i][0]+': '+sortedPoints[i][1]
    text(temptext, clientPlayer.x+window.innerWidth/3, clientPlayer.y-window.innerHeight/3+20*i)
    //console.log('printing leaderboard: '+temptext)
 
  }
}
