const body = document.querySelector('body');
const header = document.createElement('header');
const mainWrap = document.createElement('div');
const headerTitle = document.createElement('h1');
const main = document.createElement('main');
const textArea = document.createElement('textarea');
const footer = document.createElement('footer');
const footerPar = document.createElement('p');
const keyboardWrap = document.createElement('div');
const keyboard = {};

const EN_FIRST_ROW = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'];
const RU_FIRST_ROW = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'];
const EN_SECOND_ROW = ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'Del'];
const EN_THIRD_ROW = ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'];
const EN_FOURTH_ROW = ['ShiftLeft', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'ArrowUp', 'ShiftRight'];
const EN_FIFTH_ROW = ['ControlLeft', 'Win', 'AltLeft', 'Whitespace', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'];
const enKeyRows = {
  firstRow: EN_FIRST_ROW,
  secondRow: EN_SECOND_ROW,
  thirdRow: EN_THIRD_ROW,
  fourthRow: EN_FOURTH_ROW,
  fifthRow: EN_FIFTH_ROW,
};

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

body.appendChild(header);
body.appendChild(main);

class Key {
  constructor(enLit, ruLit, btn) {
    this.btn = btn;
    this.enLit = enLit;
    this.ruLit = ruLit;
  }

  setTextToButton() {
    this.btn.textContent = this.enLit;
    if (this.enLit === 'ArrowUp') {
      this.btn.textContent = '↑';
    }
    if (this.enLit === 'ArrowLeft') {
      this.btn.textContent = '←';
    }
    if (this.enLit === 'ArrowDown') {
      this.btn.textContent = '↓';
    }
    if (this.enLit === 'ArrowRight') {
      this.btn.textContent = '→';
    }
    if (this.enLit === 'ShiftLeft') {
      this.btn.textContent = 'Shift';
    }
    if (this.enLit === 'ShiftRight') {
      this.btn.textContent = 'Shift';
    }
    if (this.enLit === 'ControlLeft') {
      this.btn.textContent = 'Ctrl';
    }
    if (this.enLit === 'ControlRight') {
      this.btn.textContent = 'Ctrl';
    }
    if (this.enLit === 'AltLeft') {
      this.btn.textContent = 'Alt';
    }
    if (this.enLit === 'AltRight') {
      this.btn.textContent = 'Alt';
    }
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
    if (this.enLit === 'Backspace' || this.enLit === 'Tab' || this.enLit === 'CapsLock' || this.enLit === 'Del'
      || this.enLit === 'Enter' || this.enLit === 'ShiftLeft' || this.enLit === 'ShiftRight' || this.enLit === 'Whitespace') {
      this.btn.classList.add('btn_long');
    }
  }

  addClassToButton(newClass) {
    this.btn.classList.add(newClass);
  }

  togglePressedClassToBtn() {
    if (this.btn.classList.contains('btn_pressed')) {
      this.btn.classList.remove('btn_pressed');
    } else {
      this.btn.classList.add('btn_pressed');
    }
  }
}

const enKeyRowKeys = Object.keys(enKeyRows);

for (let j = 0; j < enKeyRowKeys.length; j += 1) {
  const rowWrap = document.createElement('div');
  rowWrap.className = 'main__row-wrap';
  for (let i = 0; i < enKeyRows[enKeyRowKeys[j]].length; i += 1) {
    const currentKey = enKeyRows[enKeyRowKeys[j]][i];
    const btn = document.createElement('div');

    btn.addEventListener('mousedown', () => {
      btn.classList.add('btn_pressed');
    });

    btn.addEventListener('mouseup', () => {
      btn.classList.remove('btn_pressed');
    });

    const keyObj = new Key(currentKey, '', btn);
    keyObj.setTextToButton();
    keyObj.setClassToButton();
    if (i === enKeyRows[enKeyRowKeys[j]].length - 1 && (currentKey === 'Enter' || currentKey === 'Shift' || currentKey === 'Del')) {
      keyObj.addClassToButton('btn_right-long');
    }

    rowWrap.appendChild(keyObj.btn);

    keyboard[keyObj.enLit] = keyObj;
  }
  keyboardWrap.appendChild(rowWrap);
}

document.addEventListener('keydown', (e) => {
  const keys = Object.keys(keyboard);
  for (let i = 0; i < keys.length; i += 1) {
    if (keyboard[keys[i]].enLit === e.key) {
      keyboard[keys[i]].togglePressedClassToBtn();
    }
    if (e.key === ' ' && keyboard[keys[i]].enLit === 'Whitespace') {
      keyboard.Whitespace.togglePressedClassToBtn();
    }
    if (e.key === 'Delete' && keyboard[keys[i]].enLit === 'Del') {
      keyboard.Del.togglePressedClassToBtn();
    }
    if (e.code === 'ShiftLeft' && keyboard[keys[i]].enLit === 'ShiftLeft') {
      keyboard[keys[i]].togglePressedClassToBtn();
    }
    if (e.code === 'ShiftRight' && keyboard[keys[i]].enLit === 'ShiftRight') {
      keyboard[keys[i]].togglePressedClassToBtn();
    }
    if (e.code === 'ControlRight' && keyboard[keys[i]].enLit === 'ControlRight') {
      keyboard[keys[i]].togglePressedClassToBtn();
    }
    if (e.code === 'ControlLeft' && keyboard[keys[i]].enLit === 'ControlLeft') {
      keyboard[keys[i]].togglePressedClassToBtn();
    }
    if (e.code === 'AltLeft' && keyboard[keys[i]].enLit === 'AltLeft') {
      keyboard[keys[i]].togglePressedClassToBtn();
    }
    if (e.code === 'AltRight' && keyboard[keys[i]].enLit === 'AltRight') {
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
    if (e.key === ' ' && keyboard[keys[i]].enLit === 'Whitespace') {
      keyboard.Whitespace.togglePressedClassToBtn();
    }
    if (e.key === 'Delete' && keyboard[keys[i]].enLit === 'Del') {
      keyboard.Del.togglePressedClassToBtn();
    }
    if (e.code === 'ShiftLeft' && keyboard[keys[i]].enLit === 'ShiftLeft') {
      keyboard[keys[i]].togglePressedClassToBtn();
    }
    if (e.code === 'ShiftRight' && keyboard[keys[i]].enLit === 'ShiftRight') {
      keyboard[keys[i]].togglePressedClassToBtn();
    }
    if (e.code === 'ControlRight' && keyboard[keys[i]].enLit === 'ControlRight') {
      keyboard[keys[i]].togglePressedClassToBtn();
    }
    if (e.code === 'ControlLeft' && keyboard[keys[i]].enLit === 'ControlLeft') {
      keyboard[keys[i]].togglePressedClassToBtn();
    }
    if (e.code === 'AltLeft' && keyboard[keys[i]].enLit === 'AltLeft') {
      keyboard[keys[i]].togglePressedClassToBtn();
    }
    if (e.code === 'AltRight' && keyboard[keys[i]].enLit === 'AltRight') {
      keyboard[keys[i]].togglePressedClassToBtn();
    }
  }
});
