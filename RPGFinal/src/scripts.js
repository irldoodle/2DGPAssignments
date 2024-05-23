//rendering framework

let mapcanvas = document.querySelector('#mapcanvas');
let mapctx = mapcanvas.getContext('2d');
let spritecanvas = document.querySelector('#spritecanvas');
let spritectx = spritecanvas.getContext('2d');
let animcanvas = document.querySelector('#animcanvas');
let animctx = animcanvas.getContext('2d');
let menucanvas = document.querySelector('#menucanvas');
let menuctx = menucanvas.getContext('2d');
let options = document.querySelector('#options');
let optctx = options.getContext("2d");
optctx.font = "Mana";
menuctx.font = "Mana";


const orient = {
    LEFT: 0,
    RIGHT: 1,
    BACK: 2,
    FORWARD: 3
}

let sprites = [];
let playerCharacter = {
    sprite: "images/BlackMageSpriteSheet.png",
    maxHP: 300,
    currentHP: 300,
    maxMP: 30,
    currentMP: 30,
    Spells: ["Attack", "Fire"],
    posX: spritecanvas.width / 4,
    posY: spritecanvas.height / 2,
    velX: 0,
    velY: 0,
    orient: orient.RIGHT,
    size: 1,
    corspe: false
}

let enemy = {
    maxHP: 120,
    currentHP: 120,
    maxMP: 20,
    currentMP: 20,
    Spells: ["Attack", "Goblin Punch"],
    sprite: "images/goblin16.png",
    posX: spritecanvas.width * 0.75,
    posY: spritecanvas.height / 2,
    LastAttack: 0,
    corpse: false
}

sprites.push(playerCharacter);
sprites.push(enemy);


let playerImage = new Image();
playerImage.src = playerCharacter.sprite;
let enemyImage = new Image();
enemyImage.src = enemy.sprite;
let mapImage = new Image();
mapImage.src = "images/forestbattlescene.png";
let font = new FontFace('Mana', 'url(images/manaspc.ttf)');


playerImage.style.imageRendering = "pixelated crisp-edges";
enemyImage.style.imageRendering = "pixelated crisp-edges";
mapImage.style.imageRendering = "pixelated crisp-edges";

window.addEventListener("load", startScreen, false);

function init() {
    //document.fonts.add(font);
    drawMap();
    render();
    DrawMenu();
    DrawOptions();
    //setInterval(tick, 1000 / 15);
}

function tick() {
    //update positions of game objects and check for interactions
    //playerCharacter.posX += playerCharacter.velX;
    //playerCharacter.posY += playerCharacter.velY;
    //render();
    //console.log("Tick");
}//unused

function render() {
    clearSurface(spritectx);
    drawPlayerCharacter();
    drawEnemy();
    //sprites.forEach(drawSprite);
}

function drawMap() {
    mapctx.drawImage(
        mapImage,
        0, 0, mapcanvas.width, mapcanvas.height
    );
}

function drawPlayerCharacter() {
    spritectx.drawImage(
        playerImage,
        playerCharacter.orient * 32, 0, 32, 32,
        //32, 0, 32, 32,
        playerCharacter.posX - 16, playerCharacter.posY - 10, 32, 32
    );
}

function drawEnemy() {
    if (enemy.corpse == true) {
        spritectx.drawImage(
            enemyImage,
            21, 0, 24, 20,
            enemy.posX - 10, enemy.posY, 24, 20
        );
    }
    else {
        spritectx.drawImage(
            enemyImage,
            0, 0, 21, 20,
            enemy.posX - 10, enemy.posY, 21, 20
        );
    }
}

function clearSurface(canvas) {
    canvas.save();
    canvas.setTransform(1, 0, 0, 1, 0, 0);
    canvas.clearRect(0, 0, canvas.width, canvas.height);
    canvas.restore();
}

//Battle System Framework

let firespell = {
    image: "images/exp2.png",
    size: 62.5,
    numFrames: 15,
    currentFrame: 0,
    sourceX: 0,
    sourceY: 0,
    updateAnimation: function () {
        if (this.currentFrame < this.numFrames) {
            this.currentFrame++;
        }
        else {
            this.currentFrame = 0;
            this.sourceX = 0;
            this.sourceY = 0;
        }

        this.sourceX = (this.currentFrame) % 4;
        if ((this.currentFrame) % 4 == 0 && this.currentFrame > 0) {
            this.sourceY++;
        }
    }
}

let spellImage = new Image();
spellImage.src = firespell.image;
let hitImage = new Image();
hitImage.src = "images/hit.png";

function fireSpell() {

    playExplosion();
}

function playExplosion() {
    setTimeout(updateExplosion, 50);
}

function updateExplosion() {
    firespell.updateAnimation();
    renderExp();
}

function renderExp() {
    animctx.clearRect(enemy.posX - 16, enemy.posY, 32, 32);
    animctx.drawImage(
        spellImage,
        firespell.sourceX * firespell.size, firespell.sourceY * firespell.size, firespell.size, firespell.size,
        enemy.posX - 16, enemy.posY, 32, 32
    );

    if (firespell.currentFrame < firespell.numFrames) {
        playExplosion();
    }
}

//Battle Menu


let menu = ["Attack", "Spell", "Item"];

function DrawMenu() {
    //draw border
    menuctx.fillStyle = 'white';
    menuctx.beginPath();
    menuctx.fillRect(0, menucanvas.height - 60, menucanvas.width, 60);
    menuctx.closePath();

    //draw box body
    menuctx.fillStyle = "black";
    menuctx.beginPath();
    menuctx.fillRect(1, menucanvas.height - 59, menucanvas.width - 2, 58);
    menuctx.closePath();

    //names
    menuctx.font = "0.8em Mana";
    menuctx.fillStyle = "white";
    menuctx.fillText("Player", playerCharacter.posX - 52, playerCharacter.posY + 55);
    menuctx.fillText("Enemy", enemy.posX + 13, enemy.posY + 55);

    //Player HP and MP
    menuctx.beginPath();
    menuctx.fillStyle = "red";
    menuctx.fillRect(playerCharacter.posX - 53, playerCharacter.posY + 60, 60, 2);
    menuctx.fillStyle = "green";
    menuctx.fillRect(playerCharacter.posX - 53, playerCharacter.posY + 60, 60 * (playerCharacter.currentHP / playerCharacter.maxHP), 2);
    menuctx.fillStyle = "gray";
    menuctx.fillRect(playerCharacter.posX - 53, playerCharacter.posY + 62, 40, 2);
    menuctx.fillStyle = "blue";
    menuctx.fillRect(playerCharacter.posX - 53, playerCharacter.posY + 62, 40 * (playerCharacter.currentMP / playerCharacter.maxMP), 2);
    menuctx.closePath();

    //Enemy HP and MP
    menuctx.beginPath();
    menuctx.fillStyle = "red";
    menuctx.fillRect(enemy.posX - 10, enemy.posY + 60, 60, 2);
    menuctx.fillStyle = "green";
    menuctx.fillRect(enemy.posX - 10 + (60 - (60 * enemy.currentHP / enemy.maxHP)), enemy.posY + 60, 60 * (enemy.currentHP / enemy.maxHP), 2);
    menuctx.fillStyle = "gray";
    menuctx.fillRect(enemy.posX + 10, enemy.posY + 62, 40, 2);
    menuctx.fillStyle = "blue";
    menuctx.fillRect(enemy.posX + 10 + (40 - (40 * enemy.currentMP / enemy.maxMP)), enemy.posY + 62, 40 * (enemy.currentMP / enemy.maxMP), 2);
    menuctx.closePath();
}

function DrawOptions() {
    //Menu Box
    optctx.fillStyle = "white";
    optctx.beginPath();
    optctx.fillRect(110, options.height - 70, 50, 70);
    optctx.fillStyle = "black";
    optctx.fillRect(111, options.height - 69, 48, 68);
    optctx.closePath();

    //Menu Text
    optctx.font = "0.8em Mana";
    optctx.fillStyle = "white";
    optctx.fillText("Attack", 115, options.height - 56);
    optctx.fillText("Fireball", 115, options.height - 42);
    optctx.fillText("Items", 115, options.height - 28);
    DrawCursor();
}

let cursor = document.querySelector('#cursor');
let cursorctx = cursor.getContext('2d');
let cursorImage = new Image();
cursorImage.src = "images/cursor.png";
let cursorpos = 0;

function DrawCursor(dir) {
    if (dir == "up")
        cursorctx.clearRect(90, cursor.height - 64 + (14 * (cursorpos + 1)), cursorImage.width, cursorImage.height);
    if (dir == "down")
        cursorctx.clearRect(90, cursor.height - 64 + (14 * (cursorpos - 1)), cursorImage.width, cursorImage.height);
    cursorctx.drawImage(cursorImage, 90, cursor.height - 64 + (14 * cursorpos));

    window.addEventListener("keydown", keydownHandler, false);
}

let UP = 38;
let DOWN = 40;
let RIGHT = 39;
let LEFT = 37;

function keydownHandler(event) {
    console.log(event.keyCode);
    switch (event.keyCode) {
        case 87: //W
        case (UP):
            if (cursorpos > 0) {
                cursorpos -= 1;
                DrawCursor("up");
            }
            break;
        case 83: //S
        case (DOWN):
            if (cursorpos < 2) {
                cursorpos += 1;
                DrawCursor("down");
            }
            break;
        case 13:
            ExecuteTurnCycle(cursorpos);
            break;
        default:
            break;
    }
}

// combat animation

function ExecuteTurnCycle(choice) {
    window.removeEventListener("keydown", keydownHandler);
    optctx.clearRect(0, 0, options.width, options.height);
    cursorctx.clearRect(0, 0, cursor.width, cursor.height);

    //attack narration window
    optctx.beginPath();
    optctx.fillStyle = "white";
    optctx.fillRect(81, 12, 106, 18);
    optctx.fillStyle = "black";
    optctx.fillRect(82, 13, 104, 16);
    optctx.closePath();

    optctx.fillStyle = "white";

    //yeah this part is terribly designed, I am not up to snuff on usage of requestAnimationFrame animation yet
    //or async/await/promise functions 
    //so you get this slop instead

    switch (choice) {
        case 0:
            optctx.fillText("Attack", (options.width / 2) - 16, 25);
            setTimeout(() => {
                optctx.clearRect(0, 0, options.width, options.height);
                animctx.drawImage(hitImage, enemy.posX - 16, enemy.posY - 5);
                setTimeout(() => {
                    animctx.drawImage(hitImage, enemy.posX, enemy.posY);
                }, 100);

                setTimeout(() => {
                    animctx.clearRect(enemy.posX - 16, enemy.posY - 5, hitImage.width, hitImage.height);
                    setTimeout(() => {
                        animctx.clearRect(enemy.posX, enemy.posY, hitImage.width, hitImage.height);
                    }, 75);
                }, 150);

                setTimeout(() => {
                    optctx.fillText("20", enemy.posX - 9, enemy.posY + 36);
                    setTimeout(() => {
                        optctx.clearRect(enemy.posX - 9, enemy.posY + 24, 16, 12);
                        enemy.currentHP -= 20;
                        if (enemy.currentHP <= 0) {
                            enemy.currentHP = 0;
                            HandleDeath(enemy);
                        }
                        menuctx.clearRect(0, 0, menucanvas.width, menucanvas.height);
                        //setTimeout(EnemyAttack, 400);
                        DrawMenu();
                        if (enemy.currentHP != 0)
                            setTimeout(DrawOptions, 250);
                    }, 750);
                }, 400
                );
            }, 1000);

            break;
        case 1:
            optctx.fillText("Fireball", (options.width / 2) - 16, 25);
            setTimeout(() => {
                optctx.clearRect(0, 0, options.width, options.height);
                fireSpell();
                setTimeout(() => {
                    optctx.fillText("45", enemy.posX - 9, enemy.posY + 36);
                    setTimeout(() => {
                        optctx.clearRect(enemy.posX - 9, enemy.posY + 24, 16, 12);
                        enemy.currentHP -= 45;
                        playerCharacter.currentMP -= 10;
                        if (enemy.currentHP <= 0) {
                            enemy.currentHP = 0;
                            HandleDeath(enemy);
                        }
                        //setTimeout(EnemyAttack, 400);
                        menuctx.clearRect(0, 0, menucanvas.width, menucanvas.height);
                        DrawMenu();
                        if (enemy.currentHP != 0)
                            setTimeout(DrawOptions, 250);
                    }, 750);
                }, 400);

            }, 1000);
            break;
        case 2:
            optctx.fillText("Placebo", (options.width / 2) - 16, 25);
            setTimeout(() => {
                optctx.clearRect(0, 0, options.width, options.height);
                setTimeout(() => {
                    optctx.fillText("?", playerCharacter.posX - 3, playerCharacter.posY - 3);
                    setTimeout(() => {
                        optctx.clearRect(0, 0, options.width, options.height);
                        if (enemy.currentHP != 0)
                            setTimeout(DrawOptions, 250);
                    }, 1000);
                }, 250);
            }, 1000);
    }

    //setTimeout(DrawOptions, 3000);
}

async function EnemyAttack() {
    optctx.beginPath();
    optctx.fillStyle = "white";
    optctx.fillRect(81, 12, 106, 18);
    optctx.fillStyle = "black";
    optctx.fillRect(82, 13, 104, 16);
    optctx.fillStyle = "white";
    optctx.closePath();

    switch (enemy.LastAttack) {
        case 0:
            optctx.fillText("Attack", (options.width / 2) - 16, 25);
            setTimeout(() => {
                optctx.clearRect(0, 0, options.width, options.height);
                SlashAnimation(playerCharacter.posX, playerCharacter.posY);

            }, 1000);
            enemy.LastAttack = 1;
            break;
        case 1:
            optctx.fillText("Goblin Punch", (options.width / 2) - 16, 25);
            enemy.LastAttack = 0;
    }
}

function SlashAnimation(posX, posY) {
    //animation structure will be similar to fireball
    console.log("Enemy Attack");
}

function HandleDeath(deadthing) {
    deadthing.corpse = true;
    if (deadthing === enemy) {
        spritectx.clearRect(enemy.posX - 10, enemy.posY, 21, 20);
        optctx.clearRect(0, 0, options.width, options.height);
        drawEnemy();
        optctx.beginPath();
        optctx.fillStyle = "white";
        optctx.fillRect(81, 12, 106, 18);
        optctx.fillStyle = "black";
        optctx.fillRect(82, 13, 104, 16);
        optctx.closePath();
        optctx.fillStyle = "white";
        optctx.fillText("...", options.width / 2, 25);

        setTimeout(() => {
            optctx.clearRect(0, 0, options.width, options.height);

            setTimeout(() => {
                optctx.beginPath();
                optctx.fillStyle = "white";
                optctx.fillRect(81, 12, 106, 18);
                optctx.fillStyle = "black";
                optctx.fillRect(82, 13, 104, 16);
                optctx.closePath();
                optctx.fillStyle = "white";
                optctx.fillText("Oh he's dead", options.width / 2 - 30, 25);

                setTimeout(() => {
                    optctx.clearRect(0, 0, options.width, options.height);

                    setTimeout(() => {
                        optctx.beginPath();
                        optctx.fillStyle = "white";
                        optctx.fillRect(65, 12, 136, 18);
                        optctx.fillStyle = "black";
                        optctx.fillRect(66, 13, 134, 16);
                        optctx.closePath();
                        optctx.fillStyle = "white";
                        optctx.fillText("Dude that's messed up.", options.width / 2 - 56, 25);
                    }, 2000);
                }, 3000)
            }, 2000);
        }, 3000);
    }
    else if (deadthing === playerCharacter) {

    }
}

//The assets for enemy animations are in, I think I can't get away with
//doing the enemy attacks without making the combat loop function Asynchronously
//Turning it in as is, see if I can get it rebuilt in the time crunch

//Start Screen

let R = 255, G = 255, B = 255;
let FadeAnimation;

function startScreen() {

    optctx.fillStyle = "white";
    optctx.fillRect(0, 0, options.width, options.height);
    //optctx.fillStyle = "#" + R + G + B;
    FadeAnimation = setInterval(FadeScreen, 10);
}

function FadeScreen() {
    optctx.fillStyle = "#" + R.toString(16) + G.toString(16) + B.toString(16);
    optctx.fillRect(2, 2, options.width - 4, options.height - 4);
    R--; G--; B--;
    if (R == 16 || G == 16 || B == 16) {
        clearInterval(FadeAnimation);
        setTimeout(StartText, 1000);
    }
}

function StartText() {
    optctx.font = "1.5em Mana";
    setTimeout(() => {
        optctx.fillStyle = "white";
        optctx.fillText("Some", options.width / 2 - 60, 55);
        setTimeout(() => {
            optctx.fillText("16-bit", options.width / 2, 55);
            setTimeout(() => {
                optctx.fillText("Battle", options.width / 2 - 80, 80);
                setTimeout(() => {
                    optctx.fillText("Simulator", options.width / 2 - 15, 80);
                    optctx.font = "0.5em Mana";
                    setTimeout(() => {
                        optctx.fillText("Or something", options.width / 2 - 25, 100);
                        setTimeout(() => {
                            optctx.font = "1em Mana";
                            optctx.fillText("Press ENTER to Start", 60, 150);
                            window.addEventListener("keydown", (e) => {
                                if (e.keyCode === 13) {
                                    optctx.clearRect(0, 0, options.width, options.height);
                                    init();
                                }
                            }, false);
                        }, 2000);
                    }, 2000);
                }, 250);
            }, 750);
        }, 500);
    }, 250);
}