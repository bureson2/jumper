let coinImage = document.createElement("img");
coinImage.src = "./img/coin.png";

export default class Coin {
    constructor(x, y) {
        this.position = {
            x: x, y: y
        };
        this.image = coinImage;
        this.width = 60;
        this.height = 60;
    }

    draw(c) {
        // 1s moving direction interval
        if (new Date().getSeconds() % 2 === 0) {
            this.position.y -= 1;
        } else {
            this.position.y += 1;
        }
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height);
    }
}