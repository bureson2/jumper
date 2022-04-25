import Shot from './Shot.js';
import Bonus from "./Bonus.js";
import Coin from "./Coin.js";
import Enemy from "./Enemy.js";
import Player from "./Player.js";
import Platform from "./Platform.js"
import GenericObject from "./GenericObject.js";

// image definition
const backgroundImage = document.createElement("img");
backgroundImage.src = "./img/back.png/";
const hillImage = document.createElement("img");
hillImage.src = "./img/hills.png/";
const standImage = document.createElement("img");
standImage.src = "./img/stand.png/";
let shotImage = document.createElement("img");
shotImage.src = "./img/shot.png/";
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const goalImage = document.createElement("img");
goalImage.src = "./img/goal.png/";

canvas.width = innerWidth;
canvas.height = innerHeight;

// gravity for speed of falling our player
const gravity = .5;

let player = new Player();
let platforms = [];
let genericObjects = [];
let shots = [];
let enemies = [];
let coins = [];
let bonus;
let shotForRemove;

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

// for correct rerendering others (not player) elements
let scrollOffset = 0;

// hardcoded definition game of game elements and their coordinates
function init() {
    player = new Player();

    let finishPlatform = new Platform({x: 12000, y: 450});
    finishPlatform.image = goalImage;
    platforms = [
        new Platform({x: 0, y: 550}),
        new Platform({x: 400, y: 250}),
        new Platform({x: 600, y: 250}),
        new Platform({x: 800, y: 250}),
        new Platform({x: 1800, y: 550}),
        new Platform({x: 2700, y: 650}),
        new Platform({x: 2700, y: 250}),
        new Platform({x: 3500, y: 550}),
        new Platform({x: 4400, y: 350}),
        new Platform({x: 5150, y: 250}),
        new Platform({x: 6000, y: 550}),
        new Platform({x: 6900, y: 450}),
        new Platform({x: 8300, y: 550}),
        new Platform({x: 8500, y: 350}),
        new Platform({x: 10150, y: 550}),
        new Platform({x: 10500, y: 350}),
        new Platform({x: 10800, y: 150}),
        finishPlatform
    ];

    enemies = [
        new Enemy(300, 450),
        new Enemy(1000, 150),
        new Enemy(1900, 450),
        new Enemy(2750, 150),
        new Enemy(3950, 450),
        new Enemy(6200, 450),
        new Enemy(6375, 450),
        new Enemy(7000, 350),
        new Enemy(8750, 450),
        new Enemy(8850, 250),
        new Enemy(11250, 50)
    ];

    genericObjects = [
        new GenericObject({x: 0, y: 0}, backgroundImage, 732, 11643),
        new GenericObject({x: 0, y: 140}, hillImage, 592, 7545),
    ];

    coins = [
        new Coin(500, 150),
        new Coin(600, 150),
        new Coin(700, 150),
        new Coin(800, 150),
        new Coin(2800, 535),
        new Coin(2900, 535),
        new Coin(3000, 535),
        new Coin(5200, 165),
        new Coin(5400, 165),
        new Coin(7400, 315),
        new Coin(10300, 450),
        new Coin(10600, 250),
        new Coin(10900,80),
        new Coin(12100, 380),
        new Coin(12200, 380),
        new Coin(12300, 380),
        new Coin(12400, 380),
        new Coin(12500, 380)
    ];

    bonus = new Bonus(4550, 250);
    scrollOffset = 0;
}

// redrawing game map
function drawObjects() {
    //preventive for unload background
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);

    genericObjects.forEach(genericObject => {
        genericObject.draw(c);
    })

    platforms.forEach(platform => {
        platform.draw(c);
    })

    enemies.forEach(enemy => {
        enemy.draw(c);
    })

    coins.forEach(coin => {
        coin.draw(c);
    })

    bonus.draw(c);

    player.update(c, gravity);
}

// recalculate map for redrawing
function renderMapAfterMovement() {
    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed;
    } else if ((keys.left.pressed && player.position.x > 100)
        || keys.left.pressed && scrollOffset === 0 && player.position.x > 0) {
        player.velocity.x = -player.speed;
    } else {
        player.velocity.x = 0;

        if (keys.right.pressed) {
            scrollOffset += player.speed;
            platforms.forEach((platform) => {
                platform.position.x -= player.speed;
            })
            genericObjects.forEach(genericObject => {
                genericObject.position.x -= player.speed * 0.66;
            })
            enemies.forEach(enemy => {
                enemy.position.x -= player.speed;
            })
            coins.forEach(coin => {
                coin.position.x -= player.speed;
            })
            bonus.position.x -= player.speed;
        } else if (keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= player.speed;
            platforms.forEach((platform) => {
                platform.position.x += player.speed;
            })
            genericObjects.forEach(genericObject => {
                genericObject.position.x += player.speed * 0.66;
            })
            enemies.forEach(enemy => {
                enemy.position.x += player.speed;
            })
            coins.forEach(coin => {
                coin.position.x += player.speed;
            })
            bonus.position.x += player.speed;
        }
    }
}

function controlPlayerMove() {
    controlPlayerColisionWithPlatform();
    controlPlayerColisionWithEnemy();
    controlPlayerColisionWithCoin();
    controlColissionWithBonus();
}

function controlColissionWithBonus(){
    if(!bonusControl(bonus)){
        bonus.img = "";
    }
}

// Colision control
function bonusControl(bonus){
    if (player.position.y < bonus.position.y + bonus.height &&
        player.position.y + player.height > bonus.position.y) {
        if (player.position.x + player.width > bonus.position.x &&
            player.position.x + player.width < bonus.position.x + bonus.width) {
            player.speed = 12;
            return false;
        }
        if (player.position.x > bonus.position.x &&
            player.position.x < bonus.position.x + bonus.width) {
            player.speed = 12;
            return false;
        }
    }
    return true;
}

// Colision control
function singleCoinControl(coin){
    if (player.position.y < coin.position.y + coin.height &&
        player.position.y + player.height > coin.position.y) {
        if (player.position.x + player.width > coin.position.x &&
            player.position.x + player.width < coin.position.x + coin.width) {
            player.score += 50;
            return false;
        }
        if (player.position.x > coin.position.x &&
            player.position.x < coin.position.x + coin.width) {
            player.score += 50;
            return false;
        }
    }
    return true;
}

function controlPlayerColisionWithCoin() {
    coins = coins.filter((coin) => singleCoinControl(coin));
}

// Colision control ( colision with enemy => game over )
// -60 dirence correction between character and enemy real and picture size
function controlPlayerColisionWithEnemy() {
    enemies.forEach((enemy) => {
        if (player.position.y < enemy.position.y + enemy.height &&
            player.position.y + player.height > enemy.position.y) {
            if (player.position.x + player.width - 60 > enemy.position.x &&
                player.position.x + player.width < enemy.position.x + enemy.width) {
                window.location.href = "./gameOver.html";
            }
            if (player.position.x > enemy.position.x &&
                player.position.x < enemy.position.x + enemy.width - 60) {
                window.location.href = "./gameOver.html";
            }
        }
    })
}

// Colision control (only for top side)
function controlPlayerColisionWithPlatform() {
    platforms.forEach((platform) => {
        if (player.position.y + player.height <= platform.position.y
            && player.position.y + player.height + player.velocity.y >= platform.position.y
            && player.position.x + player.width - 30 >= platform.position.x
            && player.position.x + 30 <= platform.position.x + platform.width) {
            player.velocity.y = 0;
            // double jump helpers
            player.firstJump = false;
            player.canJump = true;
        }
    })
}

function shotsControl() {
    shots = shots.filter((shot) => shotDrawControl(shot));
}

// Colision control enemy and shot
function enemyKillControl(enemy, shot) {
    if (enemy.position.y < shot.position.y && enemy.position.y + enemy.height > shot.position.y) {
        if(shot.position.x + shot.width / 2 > enemy.position.x && shot.position.x + shot.width / 2 < enemy.position.x + enemy.width){
            enemy.life -= 1;
            shotForRemove = shot // needed for correct deleting of shot
            if(enemy.life === 0){
                player.score += 100;
                return false;
            }
            // change image on hurted after hit
            enemy.image = enemy.standImagePain;
        }
    }
    return true;
}

// control living time od shot and not hitting enemy
function shotDrawControl(shot) {
    shot.position.x += (shot.speed * shot.direction);
    shot.draw(c);
    shot.timeToLive--;

    enemies = enemies.filter((enemy) => enemyKillControl(enemy, shot))

    if (!shot.timeToLive) return false;
    else if (shot === shotForRemove) return false;
    return true;
}

function animate() {
    requestAnimationFrame(animate);
    drawObjects();
    renderMapAfterMovement();
    controlPlayerMove();
    shotsControl();
    redirect();
}

// game over winning redirect / falling rediect
function redirect() {
    if (scrollOffset > 12000) {
        localStorage.setItem("score", player.score);
        window.location.href = "./gameWon.html";
    }

    if (player.position.y > canvas.height) {
        init();
    }
}

init();
animate();

// Listener for keys
addEventListener('keydown', ({keyCode}) => {
    switch (keyCode) {
        case 65:
            keys.left.pressed = true;
            player.currentSprite = player.sprites.run.left;
            player.width = player.sprites.run.width
            player.currentCropWidth = player.sprites.run.cropWidth;
            break;
        case 68:
            keys.right.pressed = true;
            player.currentSprite = player.sprites.run.right;
            player.width = player.sprites.run.width
            player.currentCropWidth = player.sprites.run.cropWidth;
            break;
        case 87:
            if (!player.firstJump) {
                player.velocity.y -= 15;
                player.firstJump = true
            } else if (player.firstJump && player.canJump) {
                player.velocity.y -= 5;
                player.canJump = false
            }
            break;
        case 74:
            shots.push(new Shot(player.position.x, player.position.y + player.height / 2, -1));
            player.score -= 1;
            break;
        case 76:
            shots.push(new Shot(player.position.x + player.width, player.position.y + player.height / 2, 1));
            player.score -= 1;
            break;
    }
});

// listener for stop moving
addEventListener('keyup', ({keyCode}) => {
    switch (keyCode) {
        case 65:
            keys.left.pressed = false;
            player.currentSprite = player.sprites.stand.left;
            player.width = player.sprites.stand.width
            player.currentCropWidth = player.sprites.stand.cropWidth;
            break;
        case 68:
            player.currentSprite = player.sprites.stand.right;
            player.width = player.sprites.stand.width
            player.currentCropWidth = player.sprites.stand.cropWidth;
            keys.right.pressed = false;
            break;
    }
});
