class entity {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width;
        this.distance;
        this.slopedist;
    }

    collisionCheck(entity){
	    // find hypotenuse of the line connecting each circle
	    this.distance = Math.sqrt( Math.abs(Math.pow((this.x - entity.x), 2) + Math.pow((this.y - entity.y), 2)) );
        
        this.slope = (this.y - entity.y)/(this.x - entity.x);
	    if(this.distance < this.width + entity.width) {
	        return true
	    } 
        return false
    }
}
