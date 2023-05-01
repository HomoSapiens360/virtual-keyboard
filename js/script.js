import Key from './key.js';

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
let acc;
let isFocused = false;

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

body.className = 'body';

header.className = 'header';
headerTitle.className = 'header__title';
headerTitle.textContent = 'Virtual keyboard';
header.appendChild(headerTitle);

main.className = 'main';
main.appendChild(mainWrap);

mainWrap.className = 'main__wrap';
mainWrap.appendChild(textArea);
mainWrap.appendChild(keyboardWrap);

textArea.className = 'text-area';

keyboardWrap.className = 'main__keyboard-wrap';

footerPar.className = 'footer__par';
footerPar.textContent = 'The keyboard is made in the Windows operating system';
footer.appendChild(footerPar);

body.appendChild(header);
body.appendChild(main);
body.appendChild(footer);

function changeTextArea(key = '') {
  textArea.focus();
  const valLength = textArea.value.length;
  if (key === 'Backspace' && valLength > 0) {
    const oldVal = textArea.value;
    textArea.value = oldVal.slice(0, valLength - 1);
    textArea.setSelectionRange(textArea.value.length, textArea.value.length);
    return;
  }
  if (key === 'ArrowLeft') {
    if (acc === undefined) {
      acc = 1;
    }
    const position = valLength - acc;
    textArea.setSelectionRange(position, position);
    acc += 1;
    if (acc === valLength) {
      acc = valLength - 1;
    }
    return;
  }
  if (key === 'ArrowRight') {
    if (acc === undefined) {
      acc = 1;
    }
    const position = valLength - acc;
    textArea.setSelectionRange(position + 1, position + 1);
    acc -= 1;
    if (acc === 0) {
      acc = 1;
    }
    return;
  }
  textArea.value += key;
  textArea.setSelectionRange(textArea.value.length, textArea.value.length);
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
      changeTextArea(currentKey);
    });

    const keyObj = new Key(currentKey, '', btn);
    keyObj.setTextToButton();
    keyObj.setClassToButton();
    if (i === enKeyRows[enKeyRowKeys[j]].length - 1 && (currentKey === 'Enter' || currentKey === 'ShiftRight' || currentKey === 'Del')) {
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
      e.preventDefault();
      keyboard[keys[i]].togglePressedClassToBtn();
    }
    if (e.code === 'ControlLeft' && keyboard[keys[i]].enLit === 'ControlLeft') {
      e.preventDefault();
      keyboard[keys[i]].togglePressedClassToBtn();
    }
    if (e.code === 'AltLeft' && keyboard[keys[i]].enLit === 'AltLeft') {
      e.preventDefault();
      keyboard[keys[i]].togglePressedClassToBtn();
    }
    if (e.code === 'AltRight' && keyboard[keys[i]].enLit === 'AltRight') {
      e.preventDefault();
      keyboard[keys[i]].togglePressedClassToBtn();
    }
    if (e.code === 'Tab' && keyboard[keys[i]].enLit === 'Tab') {
      e.preventDefault();
    }
  }
  changeTextArea();
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
