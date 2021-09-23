"use strict";

const playBtn = document.querySelector(".game__button");
const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const COMPUTER_SIZE = 200;

console.log(fieldRect);
playBtn.addEventListener("click", start);

function start() {
  // Add items to Field
  addItem("computer", 5, "img/computer.png");
  addItem("bug", 5, "img/bug.png");
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - COMPUTER_SIZE;
  const y2 = fieldRect.height - COMPUTER_SIZE;

  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    const x = randomNum(x1, x2);
    const y = randomNum(y1, y2);

    item.setAttribute("class", className);
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;

    field.appendChild(item);
  }
}

function randomNum(min, max) {
  return Math.random() * (max - min) + min;
}
