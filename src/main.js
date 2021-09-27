'use strict';

const gameBtn = document.querySelector('.game__button');
const field = document.querySelector('.game__field');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const popUp = document.querySelector('.pop-up');
const fieldRect = field.getBoundingClientRect();

const COMPUTER_SIZE = 200;
const COMPUTER_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
});

function startGame() {
  initGame();
  showStopButton();
  showTimerAndScore();
}

function stopGame() {}

function showStopButton() {
  const playBtn = document.querySelector('.game__playBtn');
  const stopBtn = document.querySelector('.game__stopBtn');
  playBtn.style.display = 'none';
  stopBtn.style.display = 'block';
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
      popUp.classList.remove('pop-up__hide');
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function initGame() {
  field.innerHTML = '';
  gameScore.innerHTML = `<i class="fas fa-bug"></i>${BUG_COUNT}`;

  addItem('computer', COMPUTER_COUNT, 'img/computer.png');
  addItem('bug', BUG_COUNT, 'img/bug.png');

  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
  startGameTimer();
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
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
