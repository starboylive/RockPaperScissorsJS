const choices = ["Rock", "Paper", "Scissors"];
let playerScore = 0;
let botScore = 0;

const playerScoreEl = document.getElementById("player-score");
const botScoreEl = document.getElementById("bot-score");
const headingEl = document.querySelector(".heading");
const buttonEls = document.querySelectorAll(".action-btn");

const resultEl = document.createElement("p");
resultEl.style.margin = "0.75rem auto 0";
resultEl.style.textAlign = "center";
resultEl.style.color = "aliceblue";
resultEl.style.fontSize = "1rem";
resultEl.style.maxWidth = "90%";
resultEl.style.lineHeight = "1.4";
headingEl.insertAdjacentElement("afterend", resultEl);

function getBotChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function updateScores() {
  playerScoreEl.textContent = playerScore;
  botScoreEl.textContent = botScore;
}

function getRoundResult(playerChoice, botChoice) {
  if (playerChoice === botChoice) {
    return "tie";
  }

  const wins = {
    Rock: "Scissors",
    Paper: "Rock",
    Scissors: "Paper",
  };

  return wins[playerChoice] === botChoice ? "player" : "bot";
}

function showResult(playerChoice, botChoice, winner) {
  if (winner === "tie") {
    resultEl.textContent = `Tie! You both chose ${playerChoice}.`;
    return;
  }

  const actionMap = {
    Rock: "crushes",
    Paper: "covers",
    Scissors: "cuts",
  };

  const action = actionMap[playerChoice] === botChoice ? actionMap[playerChoice] : actionMap[botChoice];
  const verb = winner === "player" ? action : action;
  const winnerName = winner === "player" ? "You win" : "Bot wins";

  resultEl.textContent = `${winnerName}! ${playerChoice} ${verb} ${botChoice}.`;
}

function handleChoice(event) {
  const playerChoice = event.target.value;
  if (!choices.includes(playerChoice)) {
    return;
  }

  const botChoice = getBotChoice();
  const winner = getRoundResult(playerChoice, botChoice);

  if (winner === "player") {
    playerScore += 1;
  } else if (winner === "bot") {
    botScore += 1;
  }

  updateScores();
  showResult(playerChoice, botChoice, winner);
}

buttonEls.forEach((button) => {
  button.addEventListener("click", handleChoice);
});

updateScores();
resultEl.textContent = "Pick Rock, Paper, or Scissors to start the game."; 