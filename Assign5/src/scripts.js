//Game objects
let stage = document.querySelector('#stage');
let destroyer = document.querySelector("#destroyer");
let patrol = document.querySelector('#patrol');
let battleship = document.querySelector('#battleship');
let missile = document.querySelector("#missile");
let stateOut = document.querySelector("#gamestate");
let gameObjects =
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

let inputX = document.querySelector("#inputX");
let inputY = document.querySelector("#inputY");
let output = document.querySelector("#output");

//The button

let button = document.querySelector("#fire");
button.style.cursor = "pointer";
button.addEventListener("click", fireClickHandler, false);

//Visualize the GameObjects Array

let sizeX = 36.5;
let sizeY = 27;

/*for (let i = 0; i < gameObjects.length; i++) {
  for (let j = 0; j < gameObjects[i].length; j++) {
    let cell = document.createElement("img");
    cell.setAttribute("class", "cell");
    stage.appendChild(cell);
    cell.style.left = ((j + 1) * sizeX) + "px";
    cell.style.top = ((i + 1) * sizeY) + "px";


    //stylize cell
    switch (gameObjects[i][j]) {
      case destroyer:
        cell.src = "images/ShipDestroyerHull.png";
      case patrol:
        cell.src = "images/ShipPatrolHull.png";
      case battleship:
        cell.src = "images/ShipBattleshipHull.png";
    }
  }
}

//Kinda realized the cells aren't strictly necessary once you
//get the math behind the cell size and grid coordinates figured out
//I guess you can uncomment and print them if you want to

*/

//Place the ships

let shipX = getRandomInt(1, 10);
let shipY = getRandomInt(1, 9);
let canBePlaced = false;

//place patrol - all three ships can definitely be done with a for/foreach loop but it's already so many moving pieces

gameObjects[shipY][shipX] = 1;
gameObjects[shipY + 1][shipX] = 1;
patrol.style.top = ((shipY + 1) * sizeY) + "px";
patrol.style.left = ((shipX + 1.3) * sizeX) + "px";

//find suitable spot for destroyer
while (canBePlaced == false) {
  shipX = getRandomInt(1, 10);
  shipY = getRandomInt(1, 8);
  if (gameObjects[shipY][shipX] == 0 && gameObjects[shipY + 1][shipX] == 0 && gameObjects[shipY + 2][shipX] == 0) {
    gameObjects[shipY][shipX] = 2;
    gameObjects[shipY + 1][shipX] = 2;
    gameObjects[shipY + 2][shipX] = 2;
    destroyer.style.top = ((shipY + 1) * sizeY) + "px";
    destroyer.style.left = ((shipX + 1.3) * sizeX) + "px";
    canBePlaced = true;
  }
}

canBePlaced = false;

while (canBePlaced == false) {
  shipX = getRandomInt(1, 10);
  shipY = getRandomInt(1, 7);
  if (gameObjects[shipY][shipX] == 0 && gameObjects[shipY + 1][shipX] == 0 && gameObjects[shipY + 2][shipX] == 0 && gameObjects[shipY + 3][shipX] == 0) {
    gameObjects[shipY][shipX] = 3;
    gameObjects[shipY + 1][shipX] = 3;
    gameObjects[shipY + 2][shipX] = 3;
    gameObjects[shipY + 3][shipX] = 3
    battleship.style.top = ((shipY + 1) * sizeY) + "px";
    battleship.style.left = ((shipX + 1.3) * sizeX) + "px";
    canBePlaced = true;
  }
}

//to compare ship placement to actual object array

/*let arrayTracker = document.getElementById("array");
let generatedString = "";
for (let i = 0; i < gameObjects.length; i++) {
  for (let j = 0; j < gameObjects[i].length; j++) {
    generatedString += (gameObjects[i][j] + ", ");
  }
  generatedString += "<br>";
}
arrayTracker.innerHTML = generatedString;*/

function render() {
  missile.style.left = (missilePosX * sizeX) + "px";
  missile.style.top = (missilePosY * sizeY) + "px";
  console.log("Missile Coordinates: ", String.fromCharCode(missilePosX + 64), missilePosY);
}

//Game Logic

let patrolHP = 2;
let destroyerHP = 3;
let battleshipHP = 4;

gameState = " <br>Patrol HP: " + patrolHP + "<br>Destroyer HP: " + destroyerHP + "<br>Battleship HP: " + battleshipHP;
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
  //The alien's area

  if (gameObjects[guessY - 1][guessX - 1] != 0) {
    switch (gameObjects[guessY - 1][guessX - 1]) {
      case 1:
        patrolHP--;
        if (patrolHP == 0){
          patrol.style.visibility = "visible";
        }
        break;
      case 2:
        destroyerHP--;
        if(destroyerHP == 0){
          destroyer.style.visibility = "visible";
        }
        break;
      case 3:
        battleshipHP--;
        if (battleshipHP == 0){
          battleship.style.visibility = "visible";
        }
        break;
    }
    gameObjects[guessY - 1][guessX - 1] = 0;
    console.log("Hit!");
    gameState = "<br>Patrol HP: " + patrolHP + "<br>Destroyer HP: " + destroyerHP + "<br>Battleship HP: " + battleshipHP;
    stateOut.innerHTML = "Hit!" + gameState;
  }

  else {
    console.log("Miss!")
    stateOut.innerHTML = "Miss!" + gameState;
  }

  //Render the new game state
  render();
  console.log("X: " + String.fromCharCode(shipX + 64));
  console.log("Y: " + shipY);
  if (patrolHP == 0 && destroyerHP == 0 && battleshipHP == 0) {
    gameWon = true;
    endGame();
  }
}

function endGame() {
  if (gameWon) {
    stateOut.innerHTML
      = "Hit! You sunk all of the ships!" + "<br>"
      + "It only took you " + shotsMade + " shots.";
    patrol.style.visibility = "visible";
    missile.style.background = "url(images/hit.png)";
    render();
  }
  else {
    stateOut.innerHTML
      = "You lost!" + "<br>"
      + "The earth has been invaded!";
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
let missilePosX = 1;
let missilePosY = 1;

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