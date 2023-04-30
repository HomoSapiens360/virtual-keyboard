const body = document.querySelector('body');
const header = document.createElement('header');
const mainWrap = document.createElement('div');
const headerTitle = document.createElement('h1');
const main = document.createElement('main');
const textArea = document.createElement('textarea');
const footer = document.createElement('footer');
const footerPar = document.createElement('p');
const keyboardWrap = document.createElement('div');
const rowWrap = document.createElement('div');
const keyboard = {};

const EN_FIRST_ROW = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'];
const RU_FIRST_ROW = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'];
const EN_SECOND_ROW = ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'Del'];
const EN_THIRD_ROW = ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'];
const EN_FOURTH_ROW = ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Arrow Up', 'Shift'];
const EN_FIFTH_ROW = ['Ctrl', 'Win', 'Alt', 'Tab', 'Alt', 'Arrow Left', 'Arrow Down', 'Arrow right', 'Ctrl'];

const keysEnFirstRow = [];

class Key {
  constructor(enLit, ruLit, btn) {
    this.btn = btn;
    this.enLit = enLit;
    this.ruLit = ruLit;
    btn.textContent = this.enLit;
  }

  toUpperCase() {
    this.enLit = this.enLit.toUpperCase();
    this.ruLit = this.ruLit.toUpperCase();
  }

  toLowerCase() {
    this.enLit = this.enLit.toLowerCase();
    this.ruLit = this.ruLit.toLowerCase();
  }

  setClassToButton() {
    this.btn.className = 'btn';
    if (this.enLit === 'Backspace') {
      this.btn.classList.add('btn_long');
    }
  }

  togglePressedClassToBtn() {
    if (this.btn.classList.contains('btn_pressed')) {
      this.btn.classList.remove('btn_pressed');
    } else {
      this.btn.classList.add('btn_pressed');
    }
  }
}

for (let i = 0; i < EN_FIRST_ROW.length; i += 1) {
  const btn = document.createElement('div');
  btn.addEventListener('mousedown', () => {
    btn.classList.add('btn_pressed');
  });

  btn.addEventListener('mouseup', () => {
    btn.classList.remove('btn_pressed');
  });

  const keyObj = new Key(EN_FIRST_ROW[i], '', btn);
  keyObj.setClassToButton();
  rowWrap.appendChild(keyObj.btn);

  keyboard[keyObj.enLit] = keyObj;
}

header.className = 'header';
headerTitle.className = 'header__title';
headerTitle.textContent = 'Virtyal keyboard';
header.appendChild(headerTitle);

main.className = 'main';
main.appendChild(mainWrap);

mainWrap.className = 'main__wrap';
mainWrap.appendChild(textArea);
mainWrap.appendChild(keyboardWrap);

textArea.className = 'text-area';
textArea.cols = 20;
textArea.rows = 20;

keyboardWrap.className = 'main__keyboard-wrap';
keyboardWrap.appendChild(rowWrap);

rowWrap.className = 'main__row-wrap';

body.appendChild(header);
body.appendChild(main);

document.addEventListener('keydown', (e) => {
  const keys = Object.keys(keyboard);
  for (let i = 0; i < keys.length; i += 1) {
    if (keyboard[keys[i]].enLit === e.key) {
      keyboard[keys[i]].togglePressedClassToBtn();
    }
  }
});

document.addEventListener('keyup', (e) => {
  const keys = Object.keys(keyboard);
  for (let i = 0; i < keys.length; i += 1) {
    if (keyboard[keys[i]].enLit === e.key) {
      keyboard[keys[i]].togglePressedClassToBtn();
    }
  }
});
