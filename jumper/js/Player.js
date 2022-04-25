// Black character
let runRightImage = document.createElement("img");
runRightImage.src = "./img/spriteRunRight.png/";
let runLefttImage = document.createElement("img");
runLefttImage.src = "./img/spriteRunLeft.png/";
let standImage = document.createElement("img");
standImage.src = "./img/stand.png/";
// Blue character
let runRightBlueImage = document.createElement("img");
runRightBlueImage.src = "./img/spriteRunRightBlue.png/";
let runLeftBlueImage = document.createElement("img");
runLeftBlueImage.src = "./img/spriteRunLeftBlue.png/";
let standBlueImage = document.createElement("img");
standBlueImage.src = "./img/standBlue.png/";
// Red character
let runRightRedImage = document.createElement("img");
runRightRedImage.src = "./img/spriteRunRightRed.png/";
let runLeftRedImage = document.createElement("img");
runLeftRedImage.src = "./img/spriteRunLeftRed.png/";
let standRedImage = document.createElement("img");
standRedImage.src = "./img/standRed.png/";
// Green character
let runRightGreenImage = document.createElement("img");
runRightGreenImage.src = "./img/spriteRunRightGreen.png/";
let runLefttGreenImage = document.createElement("img");
runLefttGreenImage.src = "./img/spriteRunLeftGreen.png/";
let standGreenImage = document.createElement("img");
standGreenImage.src = "./img/standGreen.png/";



export default class Player {
    constructor() {
        this.position = {
            x: 100, y: 400
        };
        this.velocity = {
            x: 0, y: 1
        };
        this.speed = 5;
        this.width = 120;
        this.height = 100;
        this.firstJump = true;
        this.canJump = true;
        this.score = 0;

        this.setImages();

        this.frames = 0;
        this.sprites = {
            stand: {
                right: this.image, left: this.image,
                cropWidth: 341, width: 120
            },
            run: {
                right: this.runRightImage, left: this.runLefttImage,
                cropWidth: 341, width: 127.875
            }
        }
        this.currentSprite = this.sprites.stand.right;
        this.currentCropWidth = this.sprites.stand.cropWidth;
    }

    draw(c) {
        c.drawImage(
            this.currentSprite,
            this.currentCropWidth * this.frames,
            0,
            this.currentCropWidth,
            400,
            this.position.x,
            this.position.y,
            this.width,
            this.height);
    }

    // continual increase frames
    update(c, gravity) {
        this.frames++;
        if (this.currentSprite === this.sprites.stand.right ||
            this.currentSprite === this.sprites.stand.left) {
            this.frames = 0;
        } else if (this.frames > 29 &&
            (this.currentSprite === this.sprites.run.right ||
                this.currentSprite === this.sprites.run.left)) {
            this.frames = 0;
        }
        this.draw(c);
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if (this.position.y + this.height + this.velocity.y <= innerHeight) {
            this.velocity.y += gravity;
        }
    }

    // setting images by picked color
    setImages(){
        switch (localStorage.getItem("character")) {
            case 'red':
                this.image = standRedImage;
                this.runRightImage = runRightRedImage;
                this.runLefttImage = runLeftRedImage;
                break;
            case 'blue':
                this.image = standBlueImage;
                this.runRightImage = runRightBlueImage;
                this.runLefttImage = runLeftBlueImage;
                break;
            case 'green':
                this.image = standGreenImage;
                this.runRightImage = runRightGreenImage;
                this.runLefttImage = runLefttGreenImage;
                break;
            default:
                this.image = standImage;
                this.runRightImage = runRightImage;
                this.runLefttImage = runLefttImage;
                break;
        }
    }
}
