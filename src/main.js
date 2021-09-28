'use strict';

const COMPUTER_SIZE = 150;
let COMPUTER_COUNT = 6;
let BUG_COUNT = 6;
let GAME_DURATION_SEC = 4;

const computers = document.querySelectorAll('.computer');
const bugs = document.querySelectorAll('.bug');

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameLevel = document.querySelector('.game__level');
const gameScore = document.querySelector('.game__score');

const playBtn = document.querySelector('.game__playBtn');
const stopBtn = document.querySelector('.game__stopBtn');

const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up__message');
const popUpNext = document.querySelector('.pop-up__next');
const nextLevelBtn = document.querySelector('.pop-up__nextLevel');
const popUpRefresh = document.querySelector('.pop-up__refresh');

const bugSound = new Audio('./sound/bug_pull.mp3');
const computerSound = new Audio('./sound/computer_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const winSound = new Audio('./sound/game_win.mp3');

let started = false;
let level = gameLevel.innerText;
let score = 0;
let timer = undefined;

field.addEventListener('click', onFieldClick);

playBtn.addEventListener('click', () => {
  const startPopUp = document.querySelector('.game__pop-up');
  startGame();
  startPopUp.style.display = 'none';
});

stopBtn.addEventListener('click', () => {
  stopGame();
});

nextLevelBtn.addEventListener('click', () => {
  level++;
  gameLevel.innerText = level;

  COMPUTER_COUNT += GAME_DURATION_SEC;
  BUG_COUNT += BUG_COUNT;
  GAME_DURATION_SEC += GAME_DURATION_SEC;
  startGame();
  hidePopUp();
  showStopButton();
});

popUpRefresh.addEventListener('click', () => {
  startGame();
  hidePopUp();
  showStopButton();
});

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  playSound(bgSound);
}

function stopGame() {
  popUpNext.style.display = 'none';
  popUpRefresh.style.display = 'block';

  started = false;
  stopGameTimer();
  hideGameButton();
  showPopUpWithText('Repaly?');
  playSound(alertSound);
  stopSound(bgSound);
}

function finishGame(win) {
  started = false;
  hideGameButton();
  if (win) {
    playSound(winSound);
  } else {
    playSound(computerSound);
  }
  stopGameTimer();
  stopSound(bgSound);
  showPopUpWithText(win ? 'Yay! You Won🎊' : 'You lost🙄..Replay?');
}

function showStopButton() {
  gameBtn.style.visibility = 'visible';
  stopBtn.style.display = 'block';
}

function hideGameButton() {
  gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);

  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(BUG_COUNT === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function showPopUpWithText(text) {
  popUpText.innerText = text;
  popUp.classList.remove('pop-up__hide');
}

function hidePopUp() {
  popUp.classList.add('pop-up__hide');
}

function initGame() {
  score = 0;
  field.innerHTML = '';
  gameScore.innerHTML = `<i class="fas fa-bug"></i>${BUG_COUNT}`;

  addItem('computer', COMPUTER_COUNT, 'img/computer.png');
  addItem('bug', BUG_COUNT, 'img/bug.png');
}

function onFieldClick(e) {
  if (!started) {
    return;
  }

  const target = e.target;
  if (target.matches('.bug')) {
    target.remove();
    score++;
    playSound(bugSound);
    updateScoreBoard();

    if (score === BUG_COUNT) {
      finishGame(true);
    }
  } else if (target.matches('.computer')) {
    stopGameTimer();
    finishGame(false);
  }
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

function updateScoreBoard() {
  gameScore.innerHTML = `<i class="fas fa-bug"></i>${BUG_COUNT - score}`;
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - COMPUTER_SIZE;
  const y2 = fieldRect.height - COMPUTER_SIZE;

  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    const x = randomNum(x1, x2);
    const y = randomNum(y1, y2);

    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);

    item.style.position = 'absolute';
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNum(min, max) {
  return Math.random() * (max - min) + min;
}
