//ethan
class entity {
    constructor(x, y, hp, width){
        this.x = x;
        this.y = y;
        this.hp = hp;
        this.width = width;
    }

    collisionCheck(entity){
	    if(this.findDistance(entity) < this.width + entity.width - 5) {
	        return true
	    } 
        return false
    }

    // steven
    findDistance(entity){
        // find hypotenuse of the line connecting each circle
	    return this.distance = Math.sqrt( Math.abs(Math.pow((this.x - entity.x), 2) + Math.pow((this.y - entity.y), 2)) );
    }

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
    updateFromMsg(data) {
        for (var property in data) {
            if (Object.prototype.hasOwnProperty.call(data, property) && Object.prototype.hasOwnProperty.call(this, property)) {
                this[property] = data[property]
            }
        }
    }
}

