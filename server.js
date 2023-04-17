const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  transports: ["websocket"] //set to use websocket only
}); //this loads socket.io and connects it to the server.

const port = process.env.PORT || 8080;


//this next line makes sure we can put all our html/css/javascript in the public directory
app.use(express.static(__dirname + "/public"));
//we just have 1 route to the home page rendering an index html
app.get("/", (req, res) => {
  res.render("index.html");
});

//run the server which uses express
http.listen(port, () => {
  console.log(`Server is active at port:${port}`);
});

//store the positions of each client in this object.
//It would be safer to connect it to a database as well so the data doesn't get destroyed when the server restarts
//but we'll just use an object for simplicity.
//const positions = {};
const positions = {};
let bullets = 0;
let lastKill = {};
let numberOfPlayers = 0;
let e = performance.now();

//Socket configuration
io.on("connection", (socket) => {
  //each time someone visits the site and connect to socket.io this function  gets called
  //it includes the socket object from which you can get the id, useful for identifying each client
  if(performance.now()-e < 1000){
    socket.disconnect();
  } else{
  console.log(`${socket.id} connected`);

  //lets add a starting position when the client connects
  positions[socket.id] = { x: 100, y: 100 , a: 0, name: '', isShooting: false, lastShotTime: 0, millis: 0, hp: 100, shield: 25, points: 0};
  //players[socket.id] = {player: new Player(''), a: 0}
  socket.on("disconnect", () => {
    //when this client disconnects, lets delete its position from the object.
    delete positions[socket.id];
    numberOfPlayers=numberOfPlayers-1;
    console.log(`${socket.id} disconnected`);
  });

  io.sockets.on('connect', function(socket) {
    numberOfPlayers=numberOfPlayers+1;
    const sessionID = socket.id;
  });

  //client can send a message 'updatePosition' each time the clients position changes
  socket.on("updatePosition", (data) => {
    positions[socket.id].x = data.x;
    positions[socket.id].y = data.y;
    positions[socket.id].a = data.a;
    positions[socket.id].name = data.name;
    positions[socket.id].isShooting = data.isShooting;
    positions[socket.id].lastShotTime = data.lastShotTime;
    positions[socket.id].millis = data.millis;
    positions[socket.id].hp = data.hp;
    positions[socket.id].shield = data.shield;
    positions[socket.id].points = data.points;
  });

  socket.on("bullet", (data) => {
    // bullets.x = data.x;
    // bullets.y = data.y;
    // bullets.a = data.a;
    bullets  = socket.id;
    io.emit("recievebullet", bullets);
  })

  socket.on("kill", (data) => {
    lastKill.id = data.id;
    lastKill.id2 = data.id2;
    io.emit("recievekill", lastKill);
  })
}});

//send positions every framerate to each client
const frameRate = 60;
setInterval(() => {
  numberOfPlayers=
  io.emit("positions", positions);
  
  io.emit("time", numberOfPlayers);
}, 1000 / frameRate);


