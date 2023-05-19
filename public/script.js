
//the p5js setup function
// steven and ethan
function setup() {

  //to fill up the full container, get the width an height
  // create the canvas as large as the screen width and height
  createCanvas(window.innerWidth, window.innerHeight);

  store = new Store();
  store.start(clientPlayer);

  frameRate(60); //set framerate to 60, same as server

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
  clientPlayer.update();
  mouseAngle = atan2(mouseY - height / 2, mouseX - width / 2)
  clientPlayer.rotate(mouseAngle);
  clientPlayer.render();

  //render food
  for (let id in localFoodList) {
    let food = new Food(localFoodList[id].x, localFoodList[id].y, localFoodList[id].hp, localFoodList[id].width)
    food.render()

    food.update(lasers, id);
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

    }
  }


  //laser stuff ayush + alon
  for (var j = lasers.length - 1; j >= 0; j--) {
    lasers[j].draw();
    lasers[j].update();

    // delete lasers that are marked by laser collection
    if (lasers[j].speed == 0 || lasers[j].hit || (lasers[j].id == laserCollection.id && lasers[j].bulletid == laserCollection.count) || (lasers[j].id == clientPlayer.id && lasers[j].id == laserCollection.id && lasers[j].bulletid == laserCollection.count+2)) {
      lasers.splice(j, 1)
      j--;
    }
  }

  pop()

  renderUI()

  clientPlayer.updateShield();


  //send updated packet to server
  sendPacket();

  // steven and ethan
  newLaser = [-1, -1, -1];

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


