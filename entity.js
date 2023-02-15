export class Entity {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.animationState; 
    };

    render() {
        //run on every frame, this is where you do all the animations and drawings
    }

    update() {
        //run on every frame
    }
}