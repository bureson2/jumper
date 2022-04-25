// Basic standing picture
let standImage = document.createElement("img");
standImage.src = "./img/stand.png/";
let standBlueImage = document.createElement("img");
standBlueImage.src = "./img/standBlue.png/";
let standRedImage = document.createElement("img");
standRedImage.src = "./img/standRed.png/";
let standGreenImage = document.createElement("img");
standGreenImage.src = "./img/standGreen.png/";
// After hit pictures
let standImagePain = document.createElement("img");
standImagePain.src = "./img/standPain1.png/";
let standBlueImagePain = document.createElement("img");
standBlueImagePain.src = "./img/standPain3.png/";
let standRedImagePain = document.createElement("img");
standRedImagePain.src = "./img/standPain2.png/";
let standGreenImagePain = document.createElement("img");
standGreenImagePain.src = "./img/standPain4.png/";

export default class Enemy {
    constructor(x, y) {
        this.position = {
            x: x, y: y
        };
        this.width = 120;
        this.height = 100;
        this.life = Math.floor(Math.random() * 2) + 1;

        // Random setting in init
        switch (Math.floor(Math.random() * 4) + 1) {
            case 1:
                this.image = standImage;
                this.standImagePain = standImagePain;
                break;
            case 2:
                this.image = standBlueImage;
                this.standImagePain = standBlueImagePain;
                break;
            case 3:
                this.image = standRedImage;
                this.standImagePain = standRedImagePain;
                break;
            case 4:
                this.image = standGreenImage;
                this.standImagePain = standGreenImagePain;
                break;
        }
    }

    draw(c) {
        // 1s moving direction interval
        if (new Date().getSeconds() % 2 === 0) {
            this.position.x += 2;
        } else {
            this.position.x -= 2;
        }
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}