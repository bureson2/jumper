let speedImage = document.createElement("img");
speedImage.src = './img/speedBonus.png';

export default class Bonus {
    constructor(x, y) {
        this.position = {
            x:x, y:y
        }
        this.image = speedImage;
        this.width = 60;
        this. height = 60;
    }
    draw(c) {
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }
}