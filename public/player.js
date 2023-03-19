class Player extends entity{
    
    constructor(playername, x, y, width, lastShotTime) {
      super(x, y, width);
      this.playername = playername;
      this.smoothSpeed = 1;
      this.targetAngle = 0;
      this.currentAngle = 0;
      this.count = 3;
      this.scl = 25;
      this.movementSpeed = 5;
      this.lastShotTime = lastShotTime;
      this.reloadTime = 300;
      this.isShooting = false;
      this.millisBuffer = 0;
    }
    
    move(){
      if(keyIsPressed) {
        if(keyIsDown(LEFT_ARROW)||keyIsDown(65)) {
          this.x-=this.movementSpeed;
        } 
        if(keyIsDown(RIGHT_ARROW)||keyIsDown(68)) {
          this.x+=this.movementSpeed;
        }
        if(keyIsDown(UP_ARROW)||keyIsDown(87)) {
          this.y-=this.movementSpeed;
        } 
        if(keyIsDown(DOWN_ARROW)||keyIsDown(83)) {
          this.y+=this.movementSpeed;
        }
      }
    }
    
    shoot(lasers, millis) {
      if (millis - this.lastShotTime >= this.reloadTime) {
        const laser = new Laser(this.x, this.y, this.currentAngle, 10, 500, this);
        lasers.push(laser);
        this.lastShotTime = millis;
      }
      text(millis, this.x+100, this.y+100)
      text(this.lastShotTime, this.x+100, this.y+150)

    }

    lerpAngle(a, b, step) {
      // Prefer shortest distance,
      const delta = b - a;
      if (delta == 0.0) {
          return a;
      } else if (delta < -PI) {
          b += TWO_PI;
      } else if (delta > PI) {
          a += TWO_PI;
      }
      return (1.0 - step) * a + step * b;
    }
      
    rotate(targetAngle){
        this.currentAngle = this.lerpAngle(this.currentAngle, targetAngle, this.smoothSpeed);
    }

    render(){
      beginShape();
        for (let i = 0; i < this.count; ++i) {
            const theta = this.currentAngle + i * TWO_PI / this.count;
            vertex( (this.x) + cos(theta) * this.scl, (this.y) + sin(theta) * this.scl);
        }
        fill(0,0,0)
        stroke(255,0,0)
        strokeWeight(3)
        endShape(CLOSE);
        text(this.playername, this.x, this.y);
        //console.log(targetAngle)
    }

    collisionCheck(){

    }

}

