
//networking stuff 

// initialize websocket
const socket = io({
    transports: ["websocket"]
});

//const socket = io('http://game.0000727.xyz:8080')
require('events').EventEmitter.defaultMaxListeners = 100;

// ---------------------- create a variable containing the id of the client
socket.on("connect", () => {
    clientid = socket.id
    clientPlayer.id = clientid
    console.log('connected')
    console.log(clientid)
});

// events recieved from server

socket.on("positions", (data) => {
    //get the data from the server to continually update the positions
    positions = data;
});

// recieve from the server a new bullet that someone fired and add that to the newLaser list
socket.on("recievebullet", (data) => {
    //console.log("we bullet")
    newLaser = data;
    id = data[0];

    let player = new Player();
    if(id != clientPlayer.id) {
	player.updateFromMsg(positions[id]);
	// console.log(player.turrets)
	// for loop iterates through all the turrets that a player has
	for(let i = 0; i < player.turrets.length; i++){
	    // if(i>0){
	    // 	newLaser[1] = newLaser[1] * -1
	    // }
	    let laser = new Laser(player.x, player.y, player.currentAngle+player.turrets[i], player.laserSpeed, 500, player, id, player.laserDamage, player.inertia, newLaser[1], player.width / 2);
	    lasers.push(laser)
	    // console.log("working")
	    newLaser[1]++
	}
    }

})

// event for deleting bullets that hit things or go out of range
socket.on("recieveDeleteBullet", (data) => {
    //console.log(data)
    laserCollection = data;
})

// set the localFoodList to be the same as the foodList on the server
socket.on("foodUpdate", (data) => {
    localFoodList = data;
})

// event for recieving kills
// if the player who killed the player that died is the client, it awards players points and money
// based on an exponential decay function in moneyscale
// players before the function is applied will get 100 + the killed players points
// same thing for money
socket.on("recievekill", (data) => {
    if (clientid == data.id) {
        let moneyScale = (100 * Math.pow(0.99912111, clientPlayer.points)) / 10;
        newPoints = Math.floor(positions[data.id2].points / 2);
        newMoney = moneyScale + positions[data.id2].money * moneyScale;
        clientPlayer.reward(newPoints)
        clientPlayer.money = clientPlayer.money + newMoney

    }
})

// event for giving player points
// was created after the above event
// has a static 20 points given, while money is decided by the
// correspodning even in the server
socket.on("awardPoints", (data) => {
    if (clientPlayer.id == data[0]) {
       // let moneyScale = data[1] * (100 * Math.pow(0.997, clientPlayer.points)) / 30;
        clientPlayer.money += data[1];
        clientPlayer.reward(20)

    }
})

// events sent to server

// all player data gets sent each frame
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

// sends to server the id of the player who sent that bullet
// seteven and ethan
async function sendBullet(c) {
    socket.emit("bullet", {
	c: c
	
    })
}

// sends the id of player who was killed and the id of the player who did the killing
// steven
async function sendKill(id, id2){
  socket.emit("kill", {
    id: id,
    id2: id2
  })
}
// tells the server who attacked which food for how much.
async function sendDamageFood(damage, foodID, id){
    socket.emit("damageFood", {
	damage: damage,
	foodID: foodID,
	clientid: id
    })
}

// tells server to tell everyone to delete the "4th" bullet or any other count bullet
// that was shot by what player
//delete laser
async function sendDeleteBullet(id){
  socket.emit("deleteBullet", {
    id: id[0],
    count: id[1]
  })
}

