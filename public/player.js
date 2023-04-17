//everybody
class Player extends entity{
    
    constructor(playername, x, y, lastShotTime, hp, shield, clientid, points) {
      super(x, y);
      this.width = 20
      this.playername = playername;
      // player stats
      this.hp = hp;
      this.shield = shield;
      this.movementSpeed = 5;
      this.reloadTime = 300;
      this.points = points;
      this.money = 0;

      // player variables
      this.smoothSpeed = 1;
      this.targetAngle = 0;
      this.currentAngle = 0;
      this.count = 3;
      this.scl = 25;
      this.lastShotTime = lastShotTime;
      this.isShooting = false;
      this.millisBuffer = 0;
      this.id = clientid;
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
        let laser = new Laser(this.x, this.y, this.currentAngle, 10, 500, this, this.id);
        lasers.push(laser);
        this.lastShotTime = millis;
      }

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

    render(laser){
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
        let pointtext = "points: "+this.points
        text(pointtext, this.x, this.y+20);
        //text(this.hp, this.x, this.y+20);

        //health bar
        stroke(51,0,0);
        strokeWeight(4);
        fill(0,0,0);
        rect(this.x-this.width*2-10,this.y+30,100,20);
        noStroke();
        fill(255,0,0);
        rect(this.x-this.width*2-10,this.y+30,this.hp,16);

        //shield bar
        stroke(51,0,0);
        strokeWeight(4);
        noFill()
        rect(this.x-this.width*2-10,this.y+30,100,20);
        noStroke();
        fill(31,190,214);
        rect(this.x-this.width*2-10,this.y+30,this.shield*4,16);

        
        // reset colors
        fill(0,0,0)
        stroke(255,0,0)
        strokeWeight(3)
        //text(this.id, this.x, this.y+40);
        //console.log(targetAngle)
    }
    
}

