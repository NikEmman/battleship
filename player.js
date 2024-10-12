import { Gameboard } from "./gameboard.js";

export class Player {
  constructor(name) {
    this.board = new Gameboard();
    this.name = name;
  }
}
