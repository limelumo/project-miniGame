'use strict';

import { GameBuilder, Reason } from './game.js';
import PopUp from './popup.js';
import * as sound from './sound.js';

const gameLevel = document.querySelector('.game__level');
const startPopUp = document.querySelector('.game__pop-up');
const popUpNext = document.querySelector('.pop-up__next');
const nextLevelBtn = document.querySelector('.pop-up__nextLevel');
let level = gameLevel.innerText;

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .gameDuration(5)
  .bugCount(3)
  .computerCount(3)
  .build(5);

game.setGameStopListener((reason) => {
  let message;

  switch (reason) {
    case Reason.cancel:
      message = 'REPLAY🙄❓';
      sound.playAlert();
      break;
    case Reason.win:
      message = 'Yay! You won🎉';
      sound.playWin();
      break;
    case Reason.lose:
      message = 'You lost🙄..Replay?';
      sound.playBug();
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
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
