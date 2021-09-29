'use strict';

import * as sound from './sound.js';
import PopUp from './popup.js';
import { Field, ItemType } from './field.js';

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  cancel: 'cancel',
});

export class GameBuilder {
  gameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  bugCount(num) {
    this.bugCount = num;
    return this;
  }

  computerCount(num) {
    this.computerCount = num;
    return this;
  }

  build() {
    return new Game(
      this.gameDuration, //
      this.bugCount,
      this.computerCount
    );
  }
}

class Game {
  constructor(gameDuration, bugCount, computerCount) {
    this.gameDuration = gameDuration;
    this.bugCount = bugCount;
    this.computerCount = computerCount;

    this.gameLevel = document.querySelector('.game__level');
    this.nextLevelBtn = document.querySelector('.pop-up__nextLevel');

    this.started = false;
    this.score = 0;
    this.timer = undefined;
    this.level = this.gameLevel.innerText;

    this.popUp = new PopUp();
    this.gameField = new Field(bugCount, computerCount);
    this.gameField.setClickListener(this.onItemClick);

    this.startPopUp = document.querySelector('.game__pop-up');
    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');
    this.gameBtn = document.querySelector('.game__button');
    this.playBtn = document.querySelector('.game__playBtn');
    this.stopBtn = document.querySelector('.game__stopBtn');

    this.playBtn.addEventListener('click', () => {
      this.start();
      this.startPopUp.style.display = 'none';
    });
    this.stopBtn.addEventListener('click', () => {
      this.stop(Reason.cancel);
    });

    this.nextLevelBtn.addEventListener('click', () => {
      this.nextLevel();
    });
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBackground();
  }

  nextLevel() {
    this.level++;
    this.gameLevel.innerText = this.level;
    this.popUp.hide();

    this.computerCount += 5;
    this.bugCount += 3;
    this.gameDuration += 2;

    this.gameField = new Field(this.computerCount, this.bugCount);
    this.start();
  }

  stop(reason) {
    this.popUp.popUpNext.style.display = 'none';
    this.popUp.popUpRefresh.style.display = 'block';

    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    sound.stopBackground();
    this.onGameStop && this.onGameStop(reason);
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === ItemType.bug) {
      this.score++;
      this.updateScoreBoard();

      if (this.score === this.bugCount) {
        this.stop(Reason.win);
      }
    } else if (item === ItemType.computer) {
      this.stop(Reason.lose);
    }
  };

  showStopButton() {
    this.gameBtn.style.visibility = 'visible';
    this.stopBtn.style.display = 'block';
  }

  hideGameButton() {
    this.gameBtn.style.visibility = 'hidden';
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = 'visible';
    this.gameScore.style.visibility = 'visible';
  }

  startGameTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);

    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.stop(this.bugCount === this.score ? Reason.win : Reason.lose);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }

  initGame() {
    this.score = 0;
    this.gameScore.innerHTML = `<i class="fas fa-bug"></i>${this.bugCount}`;
    this.gameField.init();
  }

  updateScoreBoard() {
    this.gameScore.innerHTML = `<i class="fas fa-bug"></i>${
      this.bugCount - this.score
    }`;
  }
}
