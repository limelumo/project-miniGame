'use strict';

const COMPUTER_SIZE = 200;
const COMPUTER_COUNT = 20;
const BUG_COUNT = 20;
const GAME_DURATION_SEC = 20;

const computers = document.querySelectorAll('.computer');
const bugs = document.querySelectorAll('.bug');

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const playBtn = document.querySelector('.game__playBtn');
const stopBtn = document.querySelector('.game__stopBtn');

const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener('click', onFieldClick);
gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

popUpRefresh.addEventListener('click', () => {
  startGame();
  hidePopUp();
});

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  showPopUpWithText('Repaly?');
}

function finishGame(win) {
  started = false;
  hideGameButton();
  stopGameTimer();
  showPopUpWithText(win ? 'YOU WON🎊' : 'YOU LOST🎃');
}

function showStopButton() {
  playBtn.style.display = 'none';
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
      showPopUpWithText('GAME OVER🙄');
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
    updateScoreBoard();

    if (score === BUG_COUNT) {
      finishGame(true);
    }
  } else if (target.matches('.computer')) {
    finishGame(false);
  }
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
