class Laser extends entity{
  constructor(x, y, mouseAngle, speed, maxRange, clientPlayer) {
    super(x, y, width);
    this.speed = speed;
    this.width = 15;
    this.height = 5;
    this.angle = mouseAngle;
    this.maxRange = maxRange;
    this.lastShotTime = -Infinity;
    this.clientPlayer = clientPlayer;
  }

  move(player) {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    if(this.collisionCheck(player) == true) {
	console.log("collision inbound")
    }
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

     //rect(-this.width/2, -this.height/2, this.width, this.height);
     circle(0, 0, this.width);
     
     //undo translation operations
     rotate(-this.angle);

     translate(-dx, -dy)
     //translate(-this.x, -this.y);
     //translate(width / 2, height / 2);
     translate(-this.clientPlayer.x, -this.clientPlayer.y);
    }

}

// STEVEN IS A FURRY DOG
