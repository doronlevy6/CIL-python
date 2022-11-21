'use strict';
/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = '🎉 Correct Number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
 */
const Maxnumber = 20; // לשינוי טווח הניחוש
let secretNumber = Math.trunc(Math.random() * Maxnumber) + 1;
console.log(secretNumber);
let score = 20;
let highScore = 0;
document.querySelector('.number').textContent = '?';
const putMessage = function (content) {
  document.querySelector('.message').textContent = content;
};

// Clicking Check
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (guess === secretNumber) {
    putMessage('🎉 המספר נכון כל הכבוד');
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    if (highScore < score) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (score > 1) {
    if (guess < 1 || guess > Maxnumber) {
      putMessage('מספר לא חוקי⛔❗❗');
    } else {
      putMessage(guess > secretNumber ? 'גבוה מדי' : 'נמוך מדי');
      score--;
      document.querySelector('.score').textContent = score;
    }
  } else {
    displayMessage('💥 You lost the game!');
    document.querySelector('.score').textContent = 0;
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * Maxnumber) + 1;
  console.log(secretNumber);

  document.querySelector('.number').textContent = '?';
  document.querySelector('.score').textContent = score;
  putMessage('התחל לנחש...');
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.guess').value = '';
});
