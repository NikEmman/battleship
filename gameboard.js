import { Ship } from "./ship";

export class Gameboard {
  constructor() {
    this.board = new Array(10).fill(new Array(10).fill(0));
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
    this.board[x][y] = ship.type;
  }
}
