//Game variables
let shipX = 200;
let shipY = 150;
let guessX = 0;
let guessY = 0;
let shotsRemaining = 8;
let shotsMade = 0;
let gameState = "";
let gameWon = false;

//The game objects
let cannon = document.querySelector("#cannon");
let ship = document.querySelector("#ship");
let missile = document.querySelector("#missile");

//The input and output fields
let inputX = document.querySelector("#inputX");
let inputY = document.querySelector("#inputY");
let output = document.querySelector("#output");

//The button
let button = document.querySelector("#button");
button.style.cursor = "pointer";
button.addEventListener("click", clickHandler, false);

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

function clickHandler()
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
    output.innerHTML = "Miss!" + gameState;
    
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
    output.innerHTML
      = "Hit! You saved the earth!" + "<br>" 
      + "It only took you " + shotsMade + " shots.";
  }
  else
  {
    output.innerHTML
      = "You lost!" + "<br>" 
      + "The earth has been invaded!";
  }
}
