class Player {
    // let targetAngle;
    // let currentAngle;
    // let x;
    // let y;  
    // let speed;
    // let smoothSpeed = 1;
    // let scl;
    // const count = 3;
    // let iToTheta;
    
    constructor(playername, p, x, y) {
    //fix width and height
      //var x = width/2;
      //var y = height/2;

      //for all things where a p5js function is called, use p
      // we have to pass in p in the constructor  for some reason
      this.p = p
      this.x = x;
      this.y = y;
      this.cameraOffsetX = 0;
      this.cameraOffsetY = 0;
      this.playername = playername;
      this.smoothSpeed = 1;
      this.targetAngle = 0;
      this.currentAngle = 0;
      this.count = 3;
      this.scl = 25;
      this.movementSpeed = 5;
      
    }
    
    move(){
      if(this.p.keyIsPressed) {
        if(this.p.keyIsDown(this.p.LEFT_ARROW)||this.p.keyIsDown(65)) {
          this.x-=this.movementSpeed;
          this.cameraOffsetX+=this.movementSpeed
        } 
        if(this.p.keyIsDown(this.p.RIGHT_ARROW)||this.p.keyIsDown(68)) {
          this.x+=this.movementSpeed;
          this.cameraOffsetX-=this.movementSpeed
        }
        if(this.p.keyIsDown(this.p.UP_ARROW)||this.p.keyIsDown(87)) {
          this.y-=this.movementSpeed;
          this.cameraOffsetY+=this.movementSpeed
        } 
        if(this.p.keyIsDown(this.p.DOWN_ARROW)||this.p.keyIsDown(83)) {
          this.y+=this.movementSpeed;
          this.cameraOffsetY-=this.movementSpeed
        }
      }
    }
      
    lerpAngle(a, b, step) {
      // Prefer shortest distance,
      const delta = b - a;
      if (delta == 0.0) {
          return a;
      } else if (delta < -this.p.PI) {
          b += this.p.TWO_PI;
      } else if (delta > this.p.PI) {
          a += this.p.TWO_PI;
      }
      return (1.0 - step) * a + step * b;
    }
      
    rotate(targetAngle){
        this.currentAngle = this.lerpAngle(this.currentAngle, targetAngle, this.smoothSpeed);
    }

    render(cameraOffsetX, cameraOffsetY){
      this.p.beginShape();
        for (let i = 0; i < this.count; ++i) {
            const theta = this.currentAngle + i * this.p.TWO_PI / this.count;
            this.p.vertex( (this.x + cameraOffsetX) + this.p.cos(theta) * this.scl, (this.y + cameraOffsetY) + this.p.sin(theta) * this.scl);
        }
        this.p.fill(51,153,255)
        this.p.stroke(0,77,153)
        this.p.strokeWeight(3)
      this.p.endShape(this.p.CLOSE);
      this.p.text(this.playername, this.x + cameraOffsetX, this.y + cameraOffsetY);
        //console.log(targetAngle)
    }

    

}

