import { Player } from "./player.js";

export class Game {
  constructor() {
    this.playerOne;
    this.playerTwo;
  }
  addPlayerOne(name) {
    this.playerOne = new Player(name);
  }
  addPlayerTwo(name) {
    this.playerTwo = new Player(name);
  }
  //   start() {
  //     let nameOne = prompt("Player One name: ");
  //     this.addPlayerOne(nameOne);
  //     let nameTwo = prompt("Player Two name: ");
  //     this.addPlayerTwo(nameTwo);

  //   }
}
