//Game variables
let shipX = getRandomInt(14, 286);
let shipY = getRandomInt(55, 245);
let guessX = 0;
let guessY = 0;
let shotsRemaining = 8;
let shotsMade = 0;
let gameState = "";
let gameWon = false;

//The game objects
//let cannon = document.querySelector("#cannon");
let ship = document.querySelector("#ship");
let missile = document.querySelector("#missile");
let stateOut = document.querySelector("#gamestate")

//The input and output fields
let inputX = document.querySelector("#inputX");
let inputY = document.querySelector("#inputY");
let output = document.querySelector("#output");

//The button
let button = document.querySelector("#fire");
button.style.cursor = "pointer";
button.addEventListener("click", fireClickHandler, false);

function render()
{
  //Position the alien
  ship.style.left = shipX + "px";
  ship.style.top = shipY + "px";
  
  //Position the cannon
  cannon.style.left = guessX + "px";
  
  //Position the missile
  missile.style.left = guessX + "px";
  missile.style.top = guessY + "px";
}

function fireClickHandler()
{
  playGame();
}

function playGame()
{
  shotsRemaining = shotsRemaining - 1;
  shotsMade = shotsMade + 1;
  gameState 
    = " Shots: " + shotsMade + ", Remaining: " + shotsRemaining;
  
  guessX = parseInt(inputX.value);
  guessY = parseInt(inputY.value);
  
  //Find out whether the player's x and y guesses are inside
  //The alien's area
  
  if(guessX >= shipX && guessX <= shipX + 20)
  {
     //Yes, it's within the X range, so now let's
     //check the Y range
     
     if(guessY >= shipY  && guessY <= shipY + 20)
     {
       //It's in both the X and Y range, so it's a hit!
       gameWon = true;
       endGame();
     }
  }

  else
  {
    stateOut.innerHTML = "Miss!" + gameState;
    
    //Check for the end of the game
    if (shotsRemaining < 1)
    {
      endGame();
    }
  }

  //Render the new game state
  render();
  console.log("X: " + shipX);
  console.log("Y: " + shipY);
}

function endGame()
{
  if(gameWon)
  {
    stateOut.innerHTML
      = "Hit! You sunk the ship!" + "<br>" 
      + "It only took you " + shotsMade + " shots.";
      ship.style.visibility = "visible";
      missile.style.width = "15px";
      missile.style.height = "15px";
      missile.style.background = "url(images/hit.png)";
      render();
  }
  else
  {
    stateOut.innerHTML
      = "You lost!" + "<br>" 
      + "The earth has been invaded!";
  }
}

function getRandomInt(min, max){
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}