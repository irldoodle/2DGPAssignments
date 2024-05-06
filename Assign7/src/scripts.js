let ball = {
    //sprite: "images/DVD_logo.svg.png",
    sprite: "images/turtle.png",
    posX: 100.0,
    posY: 100.0,
    velX: 5.0,
    velY: 5.0
}

let stage = document.querySelector('#stage');
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let slowButton = document.querySelector('#slowdown');
let fastButton = document.querySelector('#speedup');
//let rotatecounter = document.querySelector('#rotatecounter');
//let rotateclock = document.querySelector('#rotateclock');
let ballImage = new Image();
ballImage.src = ball.sprite;
let posX = getRandomInt(0, canvas.width - 40);
let posY = getRandomInt(0, canvas.height - 40);
let velX = getRandomInt(0, 100);
let velY = getRandomInt(0, 100);

window.addEventListener('load', init, false);

/*rotateclock.addEventListener('click', (e)=>{
    ball.velY--;
});

rotatecounter.addEventListener('click', (e)=>{
    ball.velY++;
});*/

fastButton.addEventListener("click", (e) => {
    if (ball.velX >= 0 && ball.velY >= 0) {
        ball.velX++;
        ball.velY++;
    }
    if (ball.velX < 0 && ball.velY < 0) {
        ball.velX--;
        ball.velY--;
    }
    if (ball.velX < 0 && ball.velY >= 0) {
        ball.velX--;
        ball.velY++;
    }
    if (ball.velX >= 0 && ball.velY < 0) {
        ball.velX++;
        ball.velY--;
    }
});

slowButton.addEventListener("click", (e) => {
    if (ball.velX >= 0 && ball.velY >= 0) {
        ball.velX--;
        ball.velY--;
    }
    if (ball.velX < 0 && ball.velY < 0) {
        ball.velX++;
        ball.velY++;
    }
    if (ball.velX < 0 && ball.velY >= 0) {
        ball.velX++;
        ball.velY--;
    }
    if (ball.velX >= 0 && ball.velY < 0) {
        ball.velX--;
        ball.velY++;
    }
});

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function init() {
    setInterval(render, 100 / 3);
}

function render() {
    clearStage();
    console.log(ball.velX + ", " + ball.velY);
    ball.posX += ball.velX;
    ball.posY += ball.velY;
    console.log("Frame rendered");
    ctx.drawImage(
        ballImage, ball.posX, ball.posY
    );
    bounce(ball.velX, ball.velY);
}

function bounce(invelX, invelY) {
    if (ball.posX >= canvas.width - ballImage.width || ball.posX <= 0) {
        ball.velX = - invelX;
        console.log("Side Bounce");
    }
    if (ball.posY >= canvas.height - ballImage.height || ball.posY <= 0) {
        ball.velY = - invelY;
        console.log("Top/Bottom Bounce");
    }
}

function clearStage() {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}