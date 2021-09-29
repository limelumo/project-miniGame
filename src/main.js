'use strict';

import Game from './game.js';
import PopUp from './popup.js';

const gameLevel = document.querySelector('.game__level');
const startPopUp = document.querySelector('.game__pop-up');
const popUpNext = document.querySelector('.pop-up__next');
const nextLevelBtn = document.querySelector('.pop-up__nextLevel');
let level = gameLevel.innerText;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  game.start();
});

const game = new Game(3, 3, 3);
game.setGameStopListener((reason) => {
  let message;

  switch (reason) {
    case 'cancel':
      message = 'REPLAY🙄❓';
      break;
    case 'win':
      message = 'Yay! You won🎉';
      break;
    case 'lose':
      message = 'You lost🙄..Replay?';
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});

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
