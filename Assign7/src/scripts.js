let ball = {
    sprite: "images/ball.png",
    size: 40,
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
let ballImage = new Image();
ballImage.src = ball.sprite;
let posX = getRandomInt(0, canvas.width - 40);
let posY = getRandomInt(0, canvas.height - 40);
let velX = getRandomInt(0, 100);
let velY = getRandomInt(0, 100);

window.addEventListener('load', init, false);

slowButton.addEventListener('click', slowBall => { velX--; velY--; }, false);
fastButton.addEventListener('click', hasteBall => { velX++; velY++; }, false);

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function init() {
    setInterval(render, 1000 / 15);
}

function render() {
    clearStage();
    if (ball.posX < canvas.width - 40 && ball.posX > 0 && ball.posY < canvas.width - 40 && ball.posY > 0) {
        ball.posX = ball.posX + velX;
        ball.posY = ball.posY + velY;
        console.log("Frame rendered");
        ctx.drawImage(
            ballImage, ball.posX, ball.posY
        );
    }
    else {
        bounce(ball.velX, ball.velY);
        ball.posX = ball.posX + velX;
        ball.posY = ball.posY + velY;
        console.log("Frame rendered");
        ctx.drawImage(
            ballImage, ball.posX, ball.posY
        );
    }
}

function bounce(invelX, invelY) {
    if (ball.posX >= canvas.width - 40 || ball.posX <= 0) {
        ball.velX = -invelX;
    }
    if (ball.posY >= canvas.height - 40 || ball.posY <= 0) {
        ball.velY = - invelY;
    }
}

function clearStage() {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}