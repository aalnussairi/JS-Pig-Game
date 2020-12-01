'use strict';

// Selecting Elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting Conditions
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// Dice roll functionality
btnRoll.addEventListener('click', rollDice);

function rollDice() {
  // 1. Generate a random number between 1-6
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display corresponding image
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  console.log(dice);
  // 3. Check if 1 is rolled (if true, switch player)
  if (dice > 1) {
    currentScore += dice;
    // *** Change to set score for current player in the future *** //
    current0El.textContent = currentScore;
    // ****************** //
  } else {
    currentScore = 0;
    switchPlayer();
  }
}

function switchPlayer() {}
