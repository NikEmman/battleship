import { Gameboard } from "./gameboard.js";

export class Player {
  constructor(name = "Computer") {
    this.board = new Gameboard();
    this.name = name;
  }
}
