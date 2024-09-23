import { Gameboard } from "./gameboard";

export class Player {
  constructor(name = "Computer") {
    this.board = new Gameboard();
    this.name = name;
  }
}
