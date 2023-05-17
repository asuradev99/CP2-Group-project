//alon + ayush mostly
class Player extends entity{
    
    constructor(playername, x, y, lastShotTime, hp, shield, clientid, points, money, inertia, laserDamage, laserSpeed, isBiden) {

      // steven
      super(x, y, hp);
      this.width = 30
      this.playername = playername;
      this.points = points;
      this.maxShield = 25;
      this.shieldRegen = 0.1;
      this.laserDamage = laserDamage;
      this.laserSpeed = laserSpeed;
      this.isHpRegen = false;
      this.hpRegen = 0;
      this.maxHp = 100;
      this.inertia = inertia;
      this.bulletcounter = 0;
      this.isBiden = false;

      // player stats ayush
      //this.hp = hp;
      this.shield = shield;
      this.movementSpeed = 5;
      this.reloadTime = 600;

      this.sizePenalty = 0;
      
      // alon
      this.money = 8;

      // player variables ayush + alon
      this.smoothSpeed = 1;
      this.targetAngle = 0;
      this.currentAngle = 0;
      this.count = 3;
      this.scl = 25;
      this.lastShotTime = lastShotTime;
      this.isShooting = false;
      this.millisBuffer = 0;
      this.id = clientid;

      //interpolation stuff (ethan)
      this.ix = this.x; 
      this.iy = this.y;
    }

    removeMoney(i){
      this.money-=i;
    }

    //ayush
    update(){
      this.inertia = [0,0];
      let effectiveSpeed = this.movementSpeed - (this.count - 3);
      if(keyIsPressed) {
        if(keyIsDown(LEFT_ARROW)||keyIsDown(65)) {
          this.x-=effectiveSpeed;
          this.inertia = [-effectiveSpeed, this.inertia[1]]
        } 
        if(keyIsDown(RIGHT_ARROW)||keyIsDown(68)) {
          this.x+=effectiveSpeed;
          this.inertia = [+effectiveSpeed, this.inertia[1]]
        }
        if(keyIsDown(UP_ARROW)||keyIsDown(87)) {
          this.y-=effectiveSpeed;
          this.inertia = [this.inertia[0], -effectiveSpeed]
        } 
        if(keyIsDown(DOWN_ARROW)||keyIsDown(83)) {
          this.y+=effectiveSpeed;
          this.inertia = [this.inertia[0], +effectiveSpeed]
        }
      }

      // shoot bullet
      if (mouseIsPressed) {
        if (performance.now() - this.lastShotTime >= this.reloadTime) {
          sendBullet(bulletCounter);
          bulletCounter++;    
          this.shoot(lasers, performance.now());
        }
        this.isShooting = true;
      } else {
        this.isShooting = false;
      }
    }
    //alon
    shoot(lasers, millis) {
      if (millis - this.lastShotTime >= this.reloadTime) {
        let laser = new Laser(this.x, this.y, this.currentAngle, this.laserSpeed - (this.count - 3), 500, this, this.id, this.laserDamage, this.inertia, bulletCounter, this.width / 2);
        lasers.push(laser);
        this.lastShotTime = millis;
        this.bulletcounter++;
      }

    }
    //alon + ayush
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
    reward(pts) {
      this.points += pts
      this.count = 3 + Math.floor(this.points / 300)
      this.width = 30 + (this.count - 3) * 10;
      //size penalty
    }
    render(laser){
      beginShape();
        for (let i = 0; i < this.count; ++i) {
            const theta = this.currentAngle + i * TWO_PI / this.count;
            vertex( (this.x) + cos(theta) * this.width, (this.y) + sin(theta) * this.width);
        }
        fill(0,0,0)
        stroke(255, 0, 0)
        strokeWeight(3)
        endShape(CLOSE);

        // steven
        text(this.playername, this.x - this.playername.length * 2, this.y - 20);

        // steven
        if(!(this == this)) {

        let pointtext = this.points
        text(pointtext, this.x - 10 , this.y+60);
        }

      // hitbox
      circle(this.x, this.y, this.width);
	
        //text(this.hp, this.x, this.y+20);

        let xoffset = -50
        //health bar ayush
        stroke(51,0,0);
        strokeWeight(4);
        fill(0,0,0);
        rect(this.x+xoffset,this.y+10+this.width,100,20);
        noStroke();
        fill(255,0,0);
        rect(this.x+xoffset,this.y+10+this.width,this.hp,16);

        //shield bar ayush
        stroke(51,0,0);
        strokeWeight(4);
        noFill()
        rect(this.x+xoffset,this.y+10+this.width,100,20);
        noStroke();
        fill(31,190,214);
        rect(this.x+xoffset,this.y+10+this.width,this.shield*(100/this.maxShield),16);

  //       //money bar ayush
  //       stroke(51,0,0);
  //       strokeWeight(4);
  //       noFill()
  //       rect(this.x-this.width*2-10,this.y+60,100,20);
  //       noStroke();

	// // steven
  //       if(this.money<101){
  //         fill(255,215,0);
  //         rect(this.x-this.width*2-10,this.y+60,this.money,16);
  //       } else{
  //         fill(255-(this.money-100)/2,215,0);
  //         rect(this.x-this.width*2-10,this.y+60,100,16);
  //         fill(255-this.money/2,100,0);
  //         rect(this.x-this.width*2-10,this.y+60,this.money%100,16);
  //       }

	// fill(0,0,0)
  //       stroke(255,0,0)
  //       strokeWeight(3)
	
	

        // reset colors
        fill(0,0,0)
        stroke(255,0,0)
        strokeWeight(3)
        //text(this.id, this.x, this.y+40);
        //console.log(targetAngle)
    }

    updateShield() {
      //shield come back
      // steven
      if (performance.now() - lastHitTime > 5000) {
        if (this.shield < this.maxShield) {
          this.shield = this.shield + this.shieldRegen;
        }
        if (this.isHpRegen) {
          if (this.hp < this.maxHp) {
            this.hp = this.hp + this.hpRegen;
          }
        }
      }
    }
}



class ClientController extends Player{

}
