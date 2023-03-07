class Laser {
  constructor(x, y, mouseAngle, speed, maxRange, clientPlayer) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 15;
    this.height = 5;
    this.angle = mouseAngle;
    //this.angle = angle
    this.maxRange = maxRange;
    this.lastShotTime = -Infinity;
    this.clientPlayer = clientPlayer;
    // this.cameraOffsetX = cameraOffsetX;
    // this.cameraOffsetY = cameraOffsetY;
  }

  // canShoot() {
  //   return this.p.millis() - this.lastShotTime >= 1000;
  // }

  // shoot() {
  //   if (this.canShoot()) {
  //     const laser = new Laser(this.x, this.y, this.mouseX, this.mouseY, this.cameraOffsetX, this.cameraOffsetY, this.speed, this.maxRange, this.p, this.angle);
  //     laser.lastShotTime = this.p.millis();
  //     return laser;
  //   } else {
  //     return null;
  //   }
  // }

  move() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
  }

  draw() {
    //undo camera translations to center bullet
     translate(this.clientPlayer.x , this.clientPlayer.y);
    // translate(-width / 2, -height / 2);
    // translate(this.x, this.y);

    //rotate and render bullet

    const dx = this.x - this.clientPlayer.x;
    const dy = this.y - this.clientPlayer.y;
     translate(dx, dy)
     rotate(this.angle);

     rect(-this.width/2, -this.height/2, this.width, this.height);
     
     //undo translation operations
     rotate(-this.angle);

     translate(-dx, -dy)
     //translate(-this.x, -this.y);
     //translate(width / 2, height / 2);
     translate(-clientPlayer.x, -clientPlayer.y);
    }

}