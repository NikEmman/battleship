export class Ship {
  constructor() {
    this.type = "";
    this.size = 0;
    this.hits = 0;
  }
  #setSize() {
    switch (this.type) {
      case "Carrier":
        this.size = 5;
        break;
      case "Battleship":
        this.size = 4;
        break;
      case "Destroyer":
        this.size = 2;
        break;
      default:
        this.size = 3;
    }
  }
  initialize(type) {
    this.type = type;
    this.#setSize();
  }
  hit() {
    this.hits += 1;
  }
  isSunk() {
    return this.hits >= this.size;
  }
}
