//ayush
class Enemy {
  constructor(x,y,speed,Player) {
	this.x=x;
	this.y=y;
	this.speed=speed;
	this.Player=Player;
	this.width=50;
	this.length=50;
  }
  update() {
    const dx = this.clientplayer.x - this.x;
    const dy = this.clientplayer.y - this.y;
    const distance = Math.sqrt(dx*dx+dy*dy);
  }

  moveTowardsPlayer(){
  if(distance = 400) {
    const angle = math.atan2(dy,dx);
    this.x += this.speed * Math.cos(angle);
    this.y += this.speed * Math.sin(angle);
  }
}

  draw() {
	stroke('red');
	rect(x,y,50,50);
	fill(51);
  } 
}

