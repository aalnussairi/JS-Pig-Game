'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player0H2 = document.querySelector('.player--0 h2');
const player1El = document.querySelector('.player--1');
const player1H2 = document.querySelector('.player--1 h2');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting Conditions
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let gameState = true;
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// Dice roll functionality
btnRoll.addEventListener('click', rollDice);
// Hold score functionality
btnHold.addEventListener('click', holdScore);
// Game Reset
btnNew.addEventListener('click', newGame);

function rollDice() {
  if (gameState) {
    // 1. Generate a random number between 1-6
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display corresponding image
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check if 1 is rolled (if true, switch player)
    if (dice > 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayers();
    }
  }
}

function holdScore() {
  if (gameState) {
    // 1. Add current score to active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >= 100
    //      True: Finish Game
    //      False: Switch Players
    if (scores[activePlayer] >= 10) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      endGame();
    } else {
      switchPlayers();
    }
  }
}

function switchPlayers() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

function newGame() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0H2.innerHTML = 'Player 1';
  player1H2.innerHTML = 'Player 2';
  score0El.textContent = 0;
  score1El.textContent = 0; // do i still need this
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  btnHold.classList.remove('hidden');
  btnRoll.classList.remove('hidden');
  gameState = true;
}

function endGame() {
  btnHold.classList.add('hidden');
  btnRoll.classList.add('hidden');
  diceEl.classList.add('hidden');
  document.querySelector(`.player--${activePlayer} h2`).innerHTML = `Player ${
    activePlayer + 1
  }<br>Winner!`;
  gameState = false;
}
