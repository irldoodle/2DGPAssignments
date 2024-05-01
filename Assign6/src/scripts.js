//Game objects
let battleship = {
  HULL: ("images/ShipBattleshipHull.png"),
  HEALTH: 4,
  SIZE: 4,
  posX: 0,
  posY: 0,
  isDestroyed: false,

  stationSelf: function () {
    let canBePlaced = false;
    while (canBePlaced == false) {
      shipX = getRandomInt(1, 10);
      shipY = getRandomInt(1, 7);
      if (gameObjects[shipY][shipX] == 0 && gameObjects[shipY + 1][shipX] == 0 && gameObjects[shipY + 2][shipX] == 0 && gameObjects[shipY + 3][shipX] == 0) {
        battleship.posX = shipX;
        battleship.posY = shipY;
        gameObjects[shipY][shipX] = 3;
        gameObjects[shipY + 1][shipX] = 3;
        gameObjects[shipY + 2][shipX] = 3;
        gameObjects[shipY + 3][shipX] = 3;
        canBePlaced = true;
      }
    }
  }
};

let destroyer = {
  HULL: ("images/ShipDestroyerHull.png"),
  HEALTH: 3,
  SIZE: 3,
  posX: 0,
  posY: 0,
  isDestroyed: false,

  stationSelf: function () {
    let canBePlaced = false;
    while (canBePlaced == false) {
      shipX = getRandomInt(1, 10);
      shipY = getRandomInt(1, 8);
      if (gameObjects[shipY][shipX] == 0 && gameObjects[shipY + 1][shipX] == 0 && gameObjects[shipY + 2][shipX] == 0) {
        destroyer.posX = shipX;
        destroyer.posY = shipY;
        gameObjects[shipY][shipX] = 2;
        gameObjects[shipY + 1][shipX] = 2;
        gameObjects[shipY + 2][shipX] = 2;
        canBePlaced = true;
      }
    }
  }
};

let patrol = {
  HULL: ("images/ShipPatrolHull.png"),
  HEALTH: 2,
  SIZE: 2,
  posX: 0,
  posY: 0,
  isDestroyed: false,

  stationSelf: function () {
    patrol.posX = getRandomInt(1, 10);
    patrol.posY = getRandomInt(1, 9);
    gameObjects[patrol.posY][patrol.posX] = 1;
    gameObjects[patrol.posY + 1][patrol.posX] = 1;
  }
};

var explosion = {
  image: "images/exp2.png",
  size: 62.5,
  numFrames: 16,
  currentFrame: 0,
  sourceX: 0,
  sourceY: 0,
  updateAnimation: function () {
    if (this.currentFrame < this.numFrames) {
      this.currentFrame++;
    }
    else {
      this.currentFrame = 0;
    }

    this.sourceX = this.currentFrame * this.size;
    this.sourceY = Math.floor(this.currentFrame / 3);
  }
};

let stage = document.querySelector('#stage');
let shipcanvas = document.querySelector('#shipcanvas');
let expcanvas = document.querySelector("#expcanvas");
let drawingSurface = shipcanvas.getContext("2d");
let expPart = expcanvas.getContext('2d');
let mapImage = new Image();
let missileImage = new Image();
let expImage = new Image();
let patrolImage = new Image();
let destroyerImage = new Image();
let battleshipImage = new Image();
patrolImage.src = patrol.HULL;
destroyerImage.src = destroyer.HULL;
battleshipImage.src = battleship.HULL;
expImage.src = explosion.image;
mapImage.src = "images/oceangrid_final.png";
missileImage.src = "images/missile.png";
missileImage.width = "35px";
missileImage.height = "25px";
let missilePosX = 1;
let missilePosY = 1;

mapImage.addEventListener("load", init, false);

function loadMap() {
  drawingSurface.drawImage(
    mapImage,
    0, 0, 400, 300,
    0, 0, 400, 300
  );
}

//let destroyer = document.querySelector("#destroyer");
//let patrol = document.querySelector('#patrol');
//let battleship = document.querySelector('#battleship');
//let missile = document.querySelector("#missile");
let stateOut = document.querySelector("#gamestate");
var gameObjects =
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

//Game Variables

let guessX = 0;
let guessY = 0;
let shotsRemaining = 8;
let shotsMade = 0;
let gameState = "";
let gameWon = false;

//The input and output fields

//let inputX = document.querySelector("#inputX");
//let inputY = document.querySelector("#inputY");
let output = document.querySelector("#output");

//The button

let button = document.querySelector("#fire");
button.style.cursor = "pointer";
button.addEventListener("click", fireClickHandler, false);

let sizeX = 36.5;
let sizeY = 27;

function render() {
  clearStage();

  if (patrol.isDestroyed == true) {
    drawingSurface.drawImage(
      patrolImage,
      0, 0, patrolImage.width, patrolImage.height,
      (patrol.posX * sizeX) + (sizeX * 1.3), (patrol.posY * sizeY) + sizeY, patrolImage.width, patrolImage.height
    );
  }

  if (destroyer.isDestroyed == true) {
    drawingSurface.drawImage(
      destroyerImage,
      0, 0, destroyerImage.width, destroyerImage.height,
      destroyer.posX * sizeX + (sizeX * 1.2), destroyer.posY * sizeY + sizeY, destroyerImage.width, sizeY * 3
    );
  }
  if (battleship.isDestroyed == true) {
    drawingSurface.drawImage(
      battleshipImage,
      0, 0, battleshipImage.width, battleshipImage.height,
      battleship.posX * sizeX + (sizeX * 1.05), battleship.posY * sizeY + sizeY, battleshipImage.width, sizeY * 4
    );
  }
  drawingSurface.drawImage(
    missileImage,
    0, 0,
    sizeX, sizeY,
    missilePosX * sizeX + 13, missilePosY * sizeY + 8,
    sizeX, sizeY
  );
}

function clearStage() {
  drawingSurface.save();
  drawingSurface.setTransform(1, 0, 0, 1, 0, 0);
  drawingSurface.clearRect(0, 0, shipcanvas.width, shipcanvas.height);
  drawingSurface.restore();
}

function init() {
  patrol.stationSelf();
  destroyer.stationSelf();
  battleship.stationSelf();
  render();
  let arrayTracker = document.getElementById("array");
  let generatedString = "";
  for (let i = 0; i < gameObjects.length; i++) {
    for (let j = 0; j < gameObjects[i].length; j++) {
      generatedString += (gameObjects[i][j] + ", ");
    }
    generatedString += "<br>";
  }
  arrayTracker.innerHTML = generatedString;

}

function playExplosion() {
  setTimeout(updateExplosion, 120);
}

function updateExplosion() {
  renderExp();
  explosion.updateAnimation();
}

function renderExp(){
  drawingSurface.clearRect(0, 0, explosion.size, explosion.size);
  drawingSurface.drawImage(
    expImage,
    explosion.sourceX, explosion.sourceY, explosion.size, explosion.size,
    missilePosX * sizeX, missilePosY * sizeY, sizeX, sizeY
  );
  if (explosion.currentFrame < explosion.numFrames){
    playExplosion();
  }
}


//Game Logic

gameState = " <br>Patrol HP: " + patrol.HEALTH + "<br>Destroyer HP: " + destroyer.HEALTH + "<br>Battleship HP: " + battleship.HEALTH;
stateOut.innerHTML = gameState;

function fireClickHandler() {
  shotsMade++;
  playGame();
}

function playGame() {
  guessX = missilePosX;
  guessY = missilePosY;

  console.log("Guess X: ", guessX, 'Guess Y: ', guessY);

  //Find out whether the player's x and y guesses are inside
  //The ship's area

  if (gameObjects[guessY - 1][guessX - 1] != 0) {
    switch (gameObjects[guessY - 1][guessX - 1]) {
      case 1:
        playExplosion();
        patrol.HEALTH--;
        if (patrol.HEALTH == 0) {
          patrol.isDestroyed = true;
        }
        break;
      case 2:
        playExplosion();
        destroyer.HEALTH--;
        if (destroyer.HEALTH == 0) {
          destroyer.isDestroyed = true;
        }
        break;
      case 3:
        playExplosion();
        battleship.HEALTH--;
        if (battleship.HEALTH == 0) {
          battleship.isDestroyed = true;
        }
        break;
      default:
        break;
    }
    gameObjects[guessY - 1][guessX - 1] = 0;
    console.log("Hit!");
    gameState = "<br>Patrol HP: " + patrol.HEALTH + "<br>Destroyer HP: " + destroyer.HEALTH + "<br>Battleship HP: " + battleship.HEALTH;
    stateOut.innerHTML = "Hit!" + gameState;
  }

  else {
    console.log("Miss!")
    stateOut.innerHTML = "Miss!" + gameState;
  }

  //Render the new game state
  render();

  if (patrol.HEALTH == 0 && destroyer.HEALTH == 0 && battleship.HEALTH == 0) {
    gameWon = true;
    endGame();
  }
}

function endGame() {
  if (gameWon) {
    stateOut.innerHTML
      = "Hit! You sunk all of the ships!" + "<br>"
      + "It only took you " + shotsMade + " shots.";
    //patrol.style.visibility = "visible";
    //missile.style.background = "url(images/hit.png)";
    render();
  }
  else {
    stateOut.innerHTML
      = "You lost!" + "<br>"
      + "You're defenseless against the enemy fleet!";
  }
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

//Movement Code

let UP = 38;
let DOWN = 40;
let RIGHT = 39;
let LEFT = 37;

window.addEventListener("keydown", keydownHandler, false);

function keydownHandler(event) {
  event.preventDefault();
  switch (event.keyCode) {
    case 87:
    case (UP):
      if (missilePosY > 1) {
        missilePosY--;
        render();
      }
      break;
    case 83:
    case (DOWN):
      if (missilePosY < 10) {
        missilePosY++;
        render();
      }
      break;
    case 65:
    case (LEFT):
      if (missilePosX > 1) {
        missilePosX--;
        render();
      }
      break;
    case 68:
    case (RIGHT):
      if (missilePosX < 10) {
        missilePosX++;
        render();
      }
      break;
    default:
      console.log("Event Heard: ", event.keyCode);
      break;
  }
}
