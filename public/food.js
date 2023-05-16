//ayush
class Food extends entity {
  constructor(x, y, hp, width){
    super(x, y, hp, width)
  }

    render() {
        //stroke(0,0,255);
        //fill(0,0,255);
        fill(0,0,0)
        stroke(0, 255, 0)
        strokeWeight(3)
        circle(this.x,this.y, this.width);
        text(this.hp, this.x, this.y)
        stroke(255, 0, 0)

    }

    update(lasers) {
      for (var j = lasers.length - 1; j>= 0; j--){
        if(lasers[j].collisionCheck(this) && lasers[j].hit == false){
          console.log("hit")
            this.hp = this.hp - lasers[j].damage;
            
            lasers[j].hit = true;
        } 
      }
    }

    killfood(clientPlayer) {
        if(this.hp<=0){
          
            clientPlayer.money += 1;
        }
    }
}
