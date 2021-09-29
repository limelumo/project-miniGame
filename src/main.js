'use strict';

import { GameBuilder, Reason } from './game.js';
import PopUp from './popup.js';
import * as sound from './sound.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .gameDuration(5)
  .bugCount(3)
  .computerCount(3)
  .build();

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
      gameFinishBanner.popUpNext.style.display = 'block';
      gameFinishBanner.popUpRefresh.style.display = 'none';
      break;
    case Reason.lose:
      message = 'You lost🙄..Replay?';
      sound.playComputer();
      gameFinishBanner.popUpNext.style.display = 'none';
      gameFinishBanner.popUpRefresh.style.display = 'block';
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
