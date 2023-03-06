class Laser {
  constructor(x, y, mouseX, mouseY, cameraOffsetX, cameraOffsetY, speed = 20, maxRange = 500, p, angle) {
    this.x = x;
    this.y = y;
    this.mouseX = mouseX;
    this.mouseY = mouseY;
    this.speed = speed;
    this.width = 15;
    this.height = 5;
    this.angle = this.calculateAngle();
    //this.angle = angle
    this.maxRange = maxRange;
    this.lastShotTime = -Infinity;
    this.p = p;
    this.cameraOffsetX = cameraOffsetX;
    this.cameraOffsetY = cameraOffsetY;
  }

  calculateAngle() {
   const dx = this.mouseX - window.innerWidth/2;
   const dy = this.mouseY - window.innerHeight/2;
   return Math.atan2(dy, dx);
  }

  canShoot() {
    return this.p.millis() - this.lastShotTime >= 1000;
  }

  shoot() {
    if (this.canShoot()) {
      const laser = new Laser(this.x, this.y, this.mouseX, this.mouseY, this.cameraOffsetX, this.cameraOffsetY, this.speed, this.maxRange, this.p, this.angle);
      laser.lastShotTime = this.p.millis();
      return laser;
    } else {
      return null;
    }
  }

  move() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
  }

  draw() {
    this.p.push();
    this.p.translate(this.x , this.y);
    this.p.rotate(this.angle);
    this.p.rect(-this.width/2, -this.height/2, this.width, this.height);
    this.p.pop();
  }

  isOffscreen(screenWidth, screenHeight) {
    return this.x + this.cameraOffsetX < 0 || this.x + this.cameraOffsetX > screenWidth || this.y + this.cameraOffsetY  < 0 || this.y + this.cameraOffsetY > screenHeight;
  }
}