'use strict';

import * as sound from './sound.js';
const COMPUTER_SIZE = 150;

export const ItemType = Object.freeze({
  carrot: 'carrot',
  bug: 'bug',
});

export class Field {
  constructor(computerCount, bugCount) {
    this.computerCount = computerCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener('click', this.onClick);
  }

  init() {
    this.field.innerHTML = '';
    this._addItem('computer', this.computerCount, 'img/computer.png');
    this._addItem('bug', this.bugCount, 'img/bug.png');
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - COMPUTER_SIZE;
    const y2 = this.fieldRect.height - COMPUTER_SIZE;

    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      const x = randomNum(x1, x2);
      const y = randomNum(y1, y2);

      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);

      item.style.position = 'absolute';
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }

  onClick = (e) => {
    const target = e.target;
    if (target.matches('.bug')) {
      target.remove();
      sound.playBug();
      this.onItemClick && this.onItemClick(ItemType.bug);
    } else if (target.matches('.computer')) {
      this.onItemClick && this.onItemClick(ItemType.computer);
    }
  };
}

function randomNum(min, max) {
  return Math.random() * (max - min) + min;
}
