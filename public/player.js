<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.3.1/p5.min.js"></script>

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
    
    constructor(playername) {
        //fix width and height
         //var x = width/2;
         //var y = height/2;
         this.x = 100;
         this.y = 100;
         this.playername = playername;
         this.smoothSpeed = 1;
         this.targetAngle = 0;
         this.currentAngle = 0;
         this.scl = 25;
         this.movementSpeed = 5;
    }
    
    move(){
      if(sketch.keyIsPressed) {
        if(keyIsDown(LEFT_ARROW)||keyIsDown(65)) {
          x-=this.movementSpeed;
        } 
        if(keyIsDown(RIGHT_ARROW)||keyIsDown(68)) {
          x+=this.movementSpeed;
        }
        if(keyIsDown(UP_ARROW)||keyIsDown(87)) {
          y-=this.movementSpeed;
        } 
        if(keyIsDown(DOWN_ARROW)||keyIsDown(83)) {
          y+=this.movementSpeed;
        }
      }
    }
      
    lerpAngle(a, b, step) {
      // Prefer shortest distance,
      const delta = b - a;
      if (delta == 0.0) {
          return a;
      } else if (delta < -sketch.PI) {
          b += TWO_PI;
      } else if (delta > sketch.PI) {
          a += TWO_PI;
      }
      return (1.0 - step) * a + step * b;
    }
      
    rotate(targetAngle){
        this.currentAngle = this.lerpAngle(this.currentAngle, targetAngle, this.smoothSpeed);
    }

    render(){
          sketch.beginShape();
            for (let i = 0; i < count; ++i) {
                const theta = this.currentAngle + i * TWO_PI / count;
                vertex(this.x + cos(theta) * this.scl, this.y + sin(theta) * scl);
            }
          fill('white');
          stroke('red');
          endShape(CLOSE);
          text(this.playername, this.x, this.y);
        //console.log(targetAngle)
    }


}

