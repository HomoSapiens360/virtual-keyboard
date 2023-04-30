class Key {
  constructor(enLit, ruLit, btn) {
    this.btn = btn;
    this.enLit = enLit;
    this.ruLit = ruLit;
  }

  setTextToButton() {
    this.btn.textContent = this.enLit.toUpperCase();
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
export default Key;
