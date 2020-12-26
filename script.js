"use strict";
// Elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const winner0El = document.querySelector(".winner0");
const winner1El = document.querySelector(".winner1");

// Check winner function to check either players win condition.
const checkWinner = function () {
  if (activePlayer === 0) {
    if (totalScores[0] >= 50 || currentScore + totalScores[0] >= 50) {
      score0El.textContent = Number(score0El.textContent) + currentScore;
      currentScore = 0;
      current0El.textContent = currentScore;
      gameWinner = 0;
      winner0El.classList.remove("hidden");
      player0El.classList.add("player--winner");
    }
  } else if (activePlayer === 1) {
    if (totalScores[1] >= 50 || currentScore + totalScores[1] >= 50) {
      score1El.textContent = Number(score1El.textContent) + currentScore;
      currentScore = 0;
      current1El.textContent = currentScore;
      gameWinner = 1;
      winner1El.classList.remove("hidden");
      player1El.classList.add("player--winner");
    }
  }
};

// Switches the player when hold button or roll button clicked.
const switchPlayer = function () {
  if (activePlayer === 1) {
    activePlayer = 0;
    player1El.classList.remove("player--active");
    player0El.classList.add("player--active");
  } else if (activePlayer === 0) {
    activePlayer = 1;
    player0El.classList.remove("player--active");
    player1El.classList.add("player--active");
  }
};

let totalScores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let gameWinner = null;

// Rolling.
btnRoll.addEventListener("click", () => {
  if (gameWinner === null) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    diceEl.classList.remove("hidden");
    diceEl.src = `pic/dice-${dice}.png`;
    if (activePlayer === 0) {
      if (dice == 1) {
        currentScore = 0;
        current0El.textContent = currentScore;
        switchPlayer();
      } else {
        currentScore += dice;
        current0El.textContent = currentScore;
      }
    } else if (activePlayer === 1) {
      if (dice === 1) {
        currentScore = 0;
        current1El.textContent = currentScore;
        switchPlayer();
      } else {
        currentScore += dice;
        current1El.textContent = currentScore;
      }
    }
    checkWinner();
  }
});

// Holding
btnHold.addEventListener("click", () => {
  if (gameWinner === null) {
    if (activePlayer === 0) {
      totalScores[0] += currentScore;
      currentScore = 0;
      current0El.textContent = currentScore;
      score0El.textContent = totalScores[0];
      switchPlayer();
    } else if (activePlayer === 1) {
      totalScores[1] += currentScore;
      currentScore = 0;
      current1El.textContent = currentScore;
      score1El.textContent = totalScores[1];
      switchPlayer();
    }
    checkWinner();
  }
});

// Restarting the game.
btnNew.addEventListener("click", () => {
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  diceEl.classList.add("hidden");
  activePlayer = 0;
  currentScore = 0;
  totalScores[0] = 0;
  totalScores[1] = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  winner0El.classList.add("hidden");
  winner1El.classList.add("hidden");
  gameWinner = null;
});
