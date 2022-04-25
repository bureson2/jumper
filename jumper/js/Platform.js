const platformImage = document.createElement("img");
platformImage.src = "./img/platform.png/";
const goalImage = document.createElement("img");
goalImage.src = "./img/goal.png/";

export default class Platform {
    constructor({x, y}) {
        this.position = {
            x, y
        };
        this.height = 150;
        this.width = 600
        ;
        this.image = platformImage;
    }

    draw(c) {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}