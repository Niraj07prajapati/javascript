let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * options.length);
  return options[randIdx];
};

const updateScore = (element, score) => {
  element.innerText = score;
  element.classList.add("score-update");
  setTimeout(() => element.classList.remove("score-update"), 500);
};

const drawGame = () => {
  msg.innerText = "It's a draw. Play again!";
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    updateScore(userScorePara, userScore);
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}.`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    updateScore(compScorePara, compScore);
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}.`;
    msg.style.backgroundColor = "red";
  }
};

const playGame = (userChoice) => {
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "scissors";
    } else if (userChoice === "paper") {
      userWin = compChoice === "rock";
    } else {
      userWin = compChoice === "paper";
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

// Existing JavaScript code...

// Function to reset the game
const resetGame = () => {
    userScore = 0;
    compScore = 0;
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    msg.innerText = "Play your move";
    msg.style.backgroundColor = "#081b31";
  };
  
  // Add event listener to the Reset Game button
  const resetButton = document.getElementById("reset-btn");
  resetButton.addEventListener("click", resetGame);
  