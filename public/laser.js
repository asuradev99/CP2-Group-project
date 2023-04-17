//alon + ayush
class Laser extends entity{
  constructor(x, y, mouseAngle, speed, maxRange, clientPlayer, ide) {
    super(x, y);
    this.speed = speed;
    this.width = 15;
    this.height = 5;
    this.angle = mouseAngle;
    this.maxRange = 50;
    this.lastShotTime = -Infinity;
    this.clientPlayer = clientPlayer;
    this.hit = false;
    this.id = ide;
  }

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

     //rect(-this.width/2, -this.height/2, this.width, this.height);
     circle(0, 0, this.width);
     //text(this.id, 0, 0);
     
     //undo translation operations
     rotate(-this.angle);

     translate(-dx, -dy)
     //translate(-this.x, -this.y);
     //translate(width / 2, height / 2);
     translate(-this.clientPlayer.x, -this.clientPlayer.y);

     // first move for laser
     if(this.collisionCheck(this.clientPlayer)){
        this.x += Math.cos(this.angle) * 35;
        this.y += Math.sin(this.angle) * 35;
     }

     this.maxRange -= 1; 
     if(this.maxRange <= 0) {
        this.speed = 0;
     }
    }

}
