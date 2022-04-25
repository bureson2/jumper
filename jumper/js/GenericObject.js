export default class GenericObject {
    // constructor gets image picture of correct background generec object
    constructor({x, y}, image, height, width) {
        this.position = {
            x, y
        };
        this.image = image;
        this.height = height;
        this.width = width;
    }

    draw(c) {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}