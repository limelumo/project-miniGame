'use strict';

import * as sound from './sound.js';
import Field from './field.js';

export default class GameBuilder {
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

    this.started = false;
    this.score = 0;
    this.timer = undefined;

    this.gameField = new Field(bugCount, computerCount);
    this.gameField.setClickListener(this.onItemClick);

    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');
    this.gameBtn = document.querySelector('.game__button');
    this.playBtn = document.querySelector('.game__playBtn');
    this.stopBtn = document.querySelector('.game__stopBtn');

    this.playBtn.addEventListener('click', () => {
      start();
      // startPopUp.style.display = 'none';
    });
    this.stopBtn.addEventListener('click', stop());
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

  stop() {
    //   popUpNext.style.display = 'none';
    // popUpRefresh.style.display = 'block';

    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    sound.playAlert();
    sound.stopBackground();
    this.onGameStop && this.onGameStop('cancel');
  }

  finish(win) {
    this.started = false;
    this.hideGameButton();

    if (win) {
      sound.playWin();
      //   popUpNext.style.display = 'block';
      // popUpRefresh.style.display = 'none';
    } else {
      sound.playComputer();
      //   popUpNext.style.display = 'none';
      // popUpRefresh.style.display = 'block';
    }
    this.stopGameTimer();
    sound.stopBackground();
    this.onGameStop && this.onGameStop(win ? 'win' : 'lose');
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === 'bug') {
      this.score++;
      this.updateScoreBoard();

      if (this.score === this.bugCount) {
        this.finish(true);
      }
    } else if (item === 'computer') {
      this.finish(false);
    }
  };

  showStopButton() {
    gameBtn.style.visibility = 'visible';
    stopBtn.style.display = 'block';
  }

  hideGameButton() {
    gameBtn.style.visibility = 'hidden';
  }

  showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
  }

  startGameTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);

    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.finish(this.bugCount === this.score);
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
    this.gameScore.innerText = this.bugCount;
    this.gameField.init();
  }

  updateScoreBoard() {
    this.gameScore.innerHTML = `<i class="fas fa-bug"></i>${
      this.bugCount - this.score
    }`;
  }
}
