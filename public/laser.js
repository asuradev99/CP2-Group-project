//alon + ayush
class Laser extends entity{
  constructor(x, y, mouseAngle, speed, maxRange, clientPlayer, ide, adamage, inertia, ida) {
    super(x, y, 10);
    this.speed = speed;
    this.width = 15;
    this.height = 5;
    this.angle = mouseAngle;
    this.maxRange = 50;
    this.lastShotTime = -Infinity;
    this.clientPlayer = clientPlayer;
    this.hit = false;
    this.id = ide;
    this.bulletid = ida
    this.damage = adamage;
    this.inertia = inertia;
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;


    //laser hit player
    if (this.collisionCheck(clientPlayer) && this.hit == false && clientPlayer.id != this.id) {
      sendDeleteBullet([this.id, this.bulletid]);
      //shield steven
      if (clientPlayer.shield > 0) {
        //clientPlayer.shield=clientPlayer.shield - this.damage;
        clientPlayer.shield = clientPlayer.shield - this.damage;
        if (clientPlayer.shield < 0) {
          clientPlayer.hp = clientPlayer.hp + clientPlayer.shield - 1
          clientPlayer.shield = 0;
        }
      } else {
        clientPlayer.hp = clientPlayer.hp - this.damage;
      }

      laserThatLastHitThePlayer = this.id;

      lastHitTime = performance.now()

      this.hit = true;
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
    // this.x += this.inertia[0]
    // this.y += this.inertia[1]
     translate(dx, dy)
     rotate(this.angle);

     //rect(-this.width/2, -this.height/2, this.width, this.height);
     circle(0, 0, this.width);
     //text(this.id, 0, 0);
     
     //undo translation operations
     rotate(-this.angle);

     translate(-dx, -dy)
     //translate(-this.x, -this.y);
     //translate(width / 2, height / 2);
     translate(-this.clientPlayer.x, -this.clientPlayer.y);

     // first move for laser (move laser out of player so it doesn't hit the player)
     // steven
     // if(this.collisionCheck(this.clientPlayer)){
     //    this.x += Math.cos(this.angle) * 60;
     //    this.y += Math.sin(this.angle) * 60;
     //   console.log("MOOOOVE");
     // }
     //
     // // ethan
     this.maxRange -= 1; 
     if(this.maxRange <= 0) {
	      this.speed = 0;
     }
    }

}
