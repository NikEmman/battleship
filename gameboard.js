import { Ship } from "./ship.js";

export class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => new Array(10).fill(0));
    this.ships = [];
  }
  createShip(shipType) {
    const ship = new Ship();
    ship.initialize(shipType);
    this.ships.push(ship);
  }
  addShips() {
    const shipTypes = [
      "Cruiser",
      "Battleship",
      "Destroyer",
      "Carrier",
      "Submarine",
    ];
    shipTypes.forEach((shipType) => {
      this.createShip(shipType);
    });
  }
  placeShip(ship, x, y, position) {
    if (position === "vertical") {
      if (x + ship.size > 10) {
        throw new Error("Ship out of bounds!");
      }
      for (let i = 0; i < ship.size; i++) {
        this.board[x + i][y] = ship.type;
      }
    } else {
      if (y + ship.size > 10) {
        throw new Error("Ship out of bounds!");
      }

      for (let i = 0; i < ship.size; i++) {
        this.board[x][y + i] = ship.type;
      }
    }
  }
}
