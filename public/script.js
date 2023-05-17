
//the p5js setup function
// steven and ethan
function setup() {

  //to fill up the full container, get the width an height
  // create the canvas as large as the screen width and height
  createCanvas(window.innerWidth, window.innerHeight);

  store = new Store();
  store.start(clientPlayer);

  frameRate(60); //set framerate to 60, same as server

  // initSocket();
};



//the p5js draw function, runs every frame rate
//(30-60 times / sec)
function draw() {

  //draw background color and grid ethan
  background(0);
  push()

  //apply camera transformation ethan
  translate(width / 2, height / 2);
  translate(-clientPlayer.x, -clientPlayer.y);

  drawGrid();

  //boundary
  checkBoundary();

  // leaderboard
  leaderboard()


  textSize(10);

  //update player position
  clientPlayer.move();
  mouseAngle = atan2(mouseY - height / 2, mouseX - width / 2)
  clientPlayer.rotate(mouseAngle);
  clientPlayer.render();

  for (let id in localFoodList) {
    let food = new Food(localFoodList[id].x, localFoodList[id].y, localFoodList[id].hp, localFoodList[id].width)
    food.update(lasers, id);
    food.render()
    // stroke(255, 0, 0)
    // fill(255,0,0)
    // strokeWeight(3)
    // circle(localFoodList[id].x, localFoodList[id].y,50);
    //console.log(id)
  }

  // for each client id got from the server except your client, render them
  // steven
  for (const id in positions) {
    if (id != clientid && positions[id].hp > 0) {
      // create a player for that id in positions
      //const player = new Player(positions[id].name, positions[id].x, positions[id].y, positions[id].lastShotTime, positions[id].hp, positions[id].shield, id, positions[id].points, positions[id].money, positions[id].inertia, positions[id].laserDamage, positions[id].laserSpeed);
      let player = localPlayerData[id];

      if (player == null) {
        player = new Player();
        player.updateFromMsg(positions[id]);

        localPlayerData[id] = player;
        console.log("new")
      } else {

        let tempx = player.x;
        let tempy = player.y;
        let tempangle = player.currentAngle;


        player.updateFromMsg(positions[id]);
        // //linear interpolation
        player.x = tempx + (positions[id].x - tempx) * 0.3
        player.y = tempy + (positions[id].y - tempy) * 0.3

        player.currentAngle = tempangle + (positions[id].currentAngle - tempangle) * 0.3;

      }


      //player.rotate(positions[id].a)
      player.render();

      renderLocationCircle(player)
      // ethan
      // if(newLaser[0] == id) {
      //   console.log(newLaser)

      // }

    }
  }


  //laser stuff ayush + alon
  for (var j = lasers.length - 1; j >= 0; j--) {
    lasers[j].move();
    lasers[j].draw();


    //laser hit player
    if (lasers[j].collisionCheck(clientPlayer) && lasers[j].hit == false && clientPlayer.id != lasers[j].id) {
      sendDeleteBullet([lasers[j].id, lasers[j].bulletid]);
      //shield steven
      if (clientPlayer.shield > 0) {
        //clientPlayer.shield=clientPlayer.shield - lasers[j].damage;
        clientPlayer.shield = clientPlayer.shield - lasers[j].damage;
        if (clientPlayer.shield < 0) {
          clientPlayer.hp = clientPlayer.hp + clientPlayer.shield - 1
          clientPlayer.shield = 0;
        }
      } else {
        clientPlayer.hp = clientPlayer.hp - lasers[j].damage;
      }

      laserThatLastHitThePlayer = lasers[j].id;

      lastHitTime = performance.now()

      lasers[j].hit = true;
    }

    // delete lasers that are marked by laser collection
    if ((lasers[j].id == laserCollection.id && lasers[j].bulletid == laserCollection.count) || (lasers[j].id == clientPlayer.id && lasers[j].id == laserCollection.id && lasers[j].bulletid == laserCollection.count + 1)) {
      lasers[j].speed = 0;
    }

    // remove lasers that are not moving
    // steven
    if (lasers[j].speed < 1 || lasers[j].hit) {
      lasers.splice(j, 1)
      j--;
    }


  }



  pop()

  //points bar
  textSize(50);
  stroke(255, 0, 0);
  strokeWeight(4)
  let poionts = "Points: " + clientPlayer.points;
  text(poionts, window.innerWidth / 2 - (poionts.length * 50 / 10), 40)

  //points bar
  textSize(20);
  stroke(255, 0, 0);
  strokeWeight(3)
  let moneytext = "Money: " + clientPlayer.money;
  text(moneytext, 0, 200, 40)



  //shield come back
  // steven
  if (performance.now() - lastHitTime > 5000) {
    if (clientPlayer.shield < clientPlayer.maxShield) {
      clientPlayer.shield = clientPlayer.shield + clientPlayer.shieldRegen;
    }
    if (clientPlayer.isHpRegen) {
      if (clientPlayer.hp < clientPlayer.maxHp) {
        clientPlayer.hp = clientPlayer.hp + clientPlayer.hpRegen;
      }
    }
  }

  // shoot bullet
  if (mouseIsPressed) {
    if (performance.now() - clientPlayer.lastShotTime >= clientPlayer.reloadTime) {
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
  if (clientPlayer.hp <= 0) {
    deathScreen();
  }
};

//boundary alon + ayush
function checkBoundary() {
  stroke(255, 255, 255);
  strokeWeight(10);
  noFill();
  rect(-2010, -2010, 4010, 4010);
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
  fill(0, 0, 0);
}


