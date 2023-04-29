class Key {
  constructor(enLit, ruLit) {
    this.enLit = enLit;
    this.ruLit = ruLit;
  }

  toUpperCase() {
    this.enLit = this.enLit.toUpperCase();
    this.ruLit = this.ruLit.toUpperCase();
  }

  toLowerCase() {
    this.enLit = this.enLit.toLowerCase();
    this.ruLit = this.ruLit.toLowerCase();
  }
}