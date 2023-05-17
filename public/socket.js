
//networking stuff 

const socket = io({
    transports: ["websocket"]
});

//const socket = io('http://game.0000727.xyz:8080')

// ---------------------- create a variable containing the id of the client
socket.on("connect", () => {
    clientid = socket.id
    clientPlayer.id = clientid
    console.log('connected')
    console.log(clientid)
});


socket.on("positions", (data) => {
    //get the data from the server to continually update the positions
    positions = data;
});


socket.on("recievebullet", (data) => {
    //console.log("we bullet")
    newLaser = data;
    id = data[0];

    let player = new Player();
    if(id != clientPlayer.id) {
        player.updateFromMsg(positions[id]);
        laser = new Laser(player.x, player.y, player.currentAngle, player.laserSpeed, 500, player, id, player.laserDamage, player.inertia, newLaser[1], player.width / 2);
        lasers.push(laser)
    }

})

socket.on("recieveDeleteBullet", (data) => {
    //console.log(data)
    laserCollection = data;
})

socket.on("foodUpdate", (data) => {
    localFoodList = data;
})

socket.on("recievekill", (data) => {
    if (clientid == data.id) {
        let moneyScale = (100 * Math.pow(0.99912111, clientPlayer.points)) / 10;
        newPoints = Math.floor(positions[data.id2].points / 2);
        newMoney = moneyScale + positions[data.id2].money * moneyScale;
        clientPlayer.reward(newPoints)
        clientPlayer.money = clientPlayer.money + newMoney

    }
})


socket.on("awardPoints", (data) => {
    if (clientPlayer.id == data[0]) {
       // let moneyScale = data[1] * (100 * Math.pow(0.997, clientPlayer.points)) / 30;
        clientPlayer.money += 2;
        clientPlayer.reward(20)

    }
})


// steven and ethan
async function sendPacket() {
  // socket.emit("updatePosition", {
  //   x: clientPlayer.x,
  //   y: clientPlayer.y,
  //   a: mouseAngle,
  //   name: clientname,
  //   isShooting: clientPlayer.isShooting,
  //   lastShotTime: clientPlayer.lastShotTime,
  //   millis: 0,
  //   hp: clientPlayer.hp,
  //   shield: clientPlayer.shield,
  //   points: clientPlayer.points,
  //   money: clientPlayer.money,
  //   inertia: clientPlayer.inertia,
  //   laserDamage: clientPlayer.laserDamage,
  //   laserSpeed: clientPlayer.laserSpeed
  // });
  
   socket.emit("updatePosition", clientPlayer.emitUpdateMsg("all"))

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
async function sendDamageFood(damage, foodID, id){
    socket.emit("damageFood", {
	damage: damage,
	foodID: foodID,
	clientid: id
    })
}

//delete laser
async function sendDeleteBullet(id){
  socket.emit("deleteBullet", {
    id: id[0],
    count: id[1]
  })
}

