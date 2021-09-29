'use strict';

import Game from './game.js';
import PopUp from './popup.js';

let GAME_DURATION_SEC = 3;

const computers = document.querySelectorAll('.computer');
const bugs = document.querySelectorAll('.bug');

const gameLevel = document.querySelector('.game__level');

const startPopUp = document.querySelector('.game__pop-up');
const popUpNext = document.querySelector('.pop-up__next');
const nextLevelBtn = document.querySelector('.pop-up__nextLevel');

let level = gameLevel.innerText;

const gameFinishBanner = new popUp();
gameFinishBanner.setClickListener(() => {
  startGame();
});

field.addEventListener('click', onFieldClick);
// playBtn.addEventListener('click', () => {
//   startGame();
//   startPopUp.style.display = 'none';
// });

// stopBtn.addEventListener('click', () => {
//   stopGame();
// });

nextLevelBtn.addEventListener('click', () => {
  level++;
  gameLevel.innerText = level;

  COMPUTER_COUNT += 6;
  BUG_COUNT += 3;
  GAME_DURATION_SEC += 3;
  startGame();
  hidePopUp();
  showStopButton();
});

// popUpRefresh.addEventListener('click', () => {
//   startGame();
//   hidePopUp();
//   showStopButton();
// });

// function startGame() {
//   started = true;
//   initGame();
//   showStopButton();
//   showTimerAndScore();
//   startGameTimer();
//   playSound(bgSound);
// }

// function stopGame() {
//   popUpNext.style.display = 'none';
//   popUpRefresh.style.display = 'block';

//   started = false;
//   stopGameTimer();
//   hideGameButton();
//   gameFinishBanner.showWithText('Repaly?');
//   playSound(alertSound);
//   stopSound(bgSound);
// }

// function finishGame(win) {
//   started = false;
//   hideGameButton();

//   if (win) {
//     playSound(winSound);
//     popUpNext.style.display = 'block';
//     popUpRefresh.style.display = 'none';
//   } else {
//     playSound(computerSound);
//     popUpNext.style.display = 'none';
//     popUpRefresh.style.display = 'block';
//   }
//   stopGameTimer();
//   stopSound(bgSound);
//   gameFinishBanner.showWithText(win ? 'Yay! You Won🎊' : 'You lost🙄..Replay?');
// }

// function showStopButton() {
//   gameBtn.style.visibility = 'visible';
//   stopBtn.style.display = 'block';
// }

// function hideGameButton() {
//   gameBtn.style.visibility = 'hidden';
// }

// function showTimerAndScore() {
//   gameTimer.style.visibility = 'visible';
//   gameScore.style.visibility = 'visible';
// }

// function startGameTimer() {
//   let remainingTimeSec = GAME_DURATION_SEC;
//   updateTimerText(remainingTimeSec);

//   timer = setInterval(() => {
//     if (remainingTimeSec <= 0) {
//       clearInterval(timer);
//       finishGame(BUG_COUNT === score);
//       return;
//     }
//     updateTimerText(--remainingTimeSec);
//   }, 1000);
// }

// function stopGameTimer() {
//   clearInterval(timer);
// }

// function updateTimerText(time) {
//   const minutes = Math.floor(time / 60);
//   const seconds = time % 60;
//   gameTimer.innerText = `${minutes}:${seconds}`;
// }

// function initGame() {
//   score = 0;
//   field.innerHTML = '';
//   gameScore.innerHTML = `<i class="fas fa-bug"></i>${BUG_COUNT}`;

//   addItem('computer', COMPUTER_COUNT, 'img/computer.png');
//   addItem('bug', BUG_COUNT, 'img/bug.png');
// }

// function onFieldClick(e) {
//   if (!started) {
//     return;
//   }

//   const target = e.target;
//   if (target.matches('.bug')) {
//     target.remove();
//     score++;
//     playSound(bugSound);
//     updateScoreBoard();

//     if (score === BUG_COUNT) {
//       finishGame(true);
//     }
//   } else if (target.matches('.computer')) {
//     stopGameTimer();
//     finishGame(false);
//   }
// }

// function updateScoreBoard() {
//   gameScore.innerHTML = `<i class="fas fa-bug"></i>${BUG_COUNT - score}`;
// }

// function addItem(className, count, imgPath) {
//   const x1 = 0;
//   const y1 = 0;
//   const x2 = fieldRect.width - COMPUTER_SIZE;
//   const y2 = fieldRect.height - COMPUTER_SIZE;

//   for (let i = 0; i < count; i++) {
//     const item = document.createElement('img');
//     const x = randomNum(x1, x2);
//     const y = randomNum(y1, y2);

//     item.setAttribute('class', className);
//     item.setAttribute('src', imgPath);

//     item.style.position = 'absolute';
//     item.style.left = `${x}px`;
//     item.style.top = `${y}px`;
//     field.appendChild(item);
//   }
// }

// function randomNum(min, max) {
//   return Math.random() * (max - min) + min;
// }
