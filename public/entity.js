//ethan
class entity {
    // basic stats everything inherits from
    constructor(x, y, hp, width){
        this.x = x;
        this.y = y;
        this.hp = hp;
        this.width = width;
    }

    // checks if the distance between the centerpoint of two entities is less than both their widths combined
    collisionCheck(entity){
	    if(this.findDistance(entity) < (this.width + entity.width) / 1.5 ) {
	        return true
	    } 
        return false
    }

    // steven
    // finds the distance between any two given centerpoints of the entity running it and another entity with the pythagorean theorem
    findDistance(entity){
        // find hypotenuse of the line connecting each circle
	    return this.distance = Math.sqrt( Math.abs(Math.pow((this.x - entity.x), 2) + Math.pow((this.y - entity.y), 2)) );
    }

    // ethan code that returns all properties that can be changed on an entity
    // this is for sending it to the server
    emitUpdateMsg(includeList) {
        let data = {};
        if(includeList == "all") {
            for (var property in this) {
                if (Object.prototype.hasOwnProperty.call(this, property)) {
                    data[property] = this[property];
                }
            }
        } else {
            for (var property in this) {
                if (Object.prototype.hasOwnProperty.call(this, property) && includeList.includes(property)) {
                    data[property] = this[property];
                }
            }
        }
        return data;
    }

    update() {

    }

    render() {

    }
    // ethan code to update an entity based on the previous code's return
    updateFromMsg(data) {
        for (var property in data) {
            if (Object.prototype.hasOwnProperty.call(data, property) && Object.prototype.hasOwnProperty.call(this, property)) {
                this[property] = data[property]
            }
        }
    }
}

