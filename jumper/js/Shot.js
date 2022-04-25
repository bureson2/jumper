let shotImage = document.createElement("img");
shotImage.src = "./img/shot.png/";
let shotImageRed = document.createElement("img");
shotImageRed.src = "./img/shot4.png/";
let shotImageBlue = document.createElement("img");
shotImageBlue.src = "./img/shot3.png/";
let shotImageGreen = document.createElement("img");
shotImageGreen.src = "./img/shot2.png/";

// setted by local storage picked value
function setShotImage(){
    switch (localStorage.getItem("shot")) {
        case "red":
            shotImage = shotImageRed;
            break;
        case 'blue':
            shotImage = shotImageBlue;
            break;
        case 'green':
            shotImage = shotImageGreen;
            break;
        default:
            shotImage = shotImage;
            break;
    }
}

export default class Shot {
    constructor(x, y, direction) {
        this.position = {
            x: x, y: y
        };
        this.speed = 10;
        setShotImage();
        this.image = shotImage;
        this.height = 20;
        this.width = 20;
        this.timeToLive = 50;
        // {-1 = left, 1 = right}
        this.direction = direction;
    }

    draw(c) {
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height);
    }
}