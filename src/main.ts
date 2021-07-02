import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

// create export button
const exportButton: HTMLButtonElement = document.createElement("button");

// set the button text
exportButton.innerText = "Export Canvas State";

// set button styles
exportButton.style.border = "solid transparent";
exportButton.style.borderRadius = "4px";
exportButton.style.color = "white";
exportButton.style.backgroundColor = "#6a1b9a";
exportButton.style.padding = "1em 2em";

// functionality to export the canvas contents to a PNG image
exportButton.addEventListener("click", () => {
  let canvasStateImage: HTMLImageElement = document.createElement("img");
  canvasStateImage.src = canvas.toDataURL();
  canvasStateImage.alt = "guessingGameState";
  app.appendChild(canvasStateImage);
});

// create canvas element
const canvas: HTMLCanvasElement = document.createElement("canvas");

// set canvas width and height
canvas.style.width = "700px";
canvas.style.height = "400px";

function renderGame(): void {
  // get canvas context -> 2D
  let context: CanvasRenderingContext2D = canvas.getContext("2d");

  // draw game background
  context.fillStyle = "#0000ff";
  context.fillRect(0, 0, 390, 390);

  // draw a stroke for the box
  context.strokeStyle = "#ff0000";
  context.strokeRect(4, 4, 292, 142);

  // write the date to the screen
  let date: string = new Date().toDateString(); // get the current date
  context.fillStyle = "#000000";
  context.font = "10px monospace"; //set the font style
  context.fillText(date, 100, 20)

  // wite the instruction
  context.fillStyle = "#000000";
  context.font = "10px sans-serif";
  context.fillText("Guess the letter between a and z", 75, 30);

  // dynamic variable :
  let playerGuessesCount: number = 0; // keep track of the number of correct guesses
  let playerGuesses: Array<string> = []; // keep track of all the correct guesses by the player
  let hasThePlayerWon: boolean = false;

  const letters: Array<string> = "abcdefghijklmnopqrstuvwxyz".split("");

  gamePlay();
  
  // what makes the game fun
  function gamePlay() {
    let computerLetterIndex: number = Math.floor(Math.random() * letters.length);
    let computerLetter: string = letters[computerLetterIndex];

    window.addEventListener("keypress", (event) => {
      let userGuess = event.key;

      // add the player's guess
      playerGuesses.push(userGuess);
      playerGuessesCount += 1;

      // cover the previous guess count
      context.clearRect(74, 30, 60, 20);
      context.fillStyle = "#0000ff";
      context.fillRect(74, 30, 60, 20);

      // draw the guesses text
      context.fillStyle = "#00ff00";
      context.font = "10px sans-serif";
      context.fillText(`Guesses : ${playerGuessesCount}`, 75, 40);

      // draw the array of user guesses
      context.fillStyle = "#ff0080";
      context.font = "10px sans-serif";
      context.fillText(`Letters Guessed = ${playerGuesses.join(" ")}`, 10, 130);

      // Make the game harder ;)
      // computer makes a new guess
      computerLetterIndex = Math.floor(Math.random() * letters.length);
      computerLetter = letters[computerLetterIndex];

      let indexOfUserGuess: number = letters.indexOf(userGuess);
      let guessLevel: string;

      /* console.log(indexOfUserGuess)
      console.log(computerLetterIndex); */

      if (userGuess === computerLetter) {
        hasThePlayerWon = true;
      }

      if (hasThePlayerWon) {
        alert("You won");

        // draw cool message to tell the player he won
        context.fillStyle = "#21ff00";
        context.font = "10px cursive"
        context.fillText("You Won 🥳🎉👯‍♂️", 60, 75);
      }

      if (indexOfUserGuess > computerLetterIndex) {
        // clear area before redrawing
        context.clearRect(10, 90, 95, 12);
        context.fillStyle = "#0000ff";
        context.fillRect(10, 90, 95, 12);

        guessLevel = "Higher";
        context.fillStyle = "#000000";
        context.font = "10px sans-serif";
        context.fillText(`You guessed ${guessLevel}`, 10, 100);
      } else {
        // clear area before redrawing
        context.clearRect(10, 90, 95, 12);
        context.fillStyle = "#0000ff";
        context.fillRect(10, 90, 95, 12);
        
        guessLevel = "Lower";
        context.fillStyle = "#000000";
        context.font = "10px sans-serif";
        context.fillText(`You guessed ${guessLevel}`, 10, 100);
      }

    });
  }
}


// render the game
renderGame();

// display the message in case the browser does not support the canvas

canvas.innerHTML = "Your browser does not support canvas element";

// add the game to the document
app.appendChild(canvas);
app.appendChild(exportButton);