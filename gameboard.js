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
    if (this.isOutOfBounds(ship, x, y, position)) {
      throw new Error("Ship out of bounds!");
    }
    if (this.isOccupied(ship, x, y, position)) {
      throw new Error("Occupied space!");
    }

    const isVertical = position === "vertical";
    for (let i = 0; i < ship.size; i++) {
      const newX = isVertical ? x + i : x;
      const newY = isVertical ? y : y + i;
      this.board[newX][newY] = ship.type;
    }
  }
  isOccupied(ship, x, y, position) {
    const isVertical = position === "vertical";
    for (let i = 0; i < ship.size; i++) {
      const newX = isVertical ? x + i : x;
      const newY = isVertical ? y : y + i;
      if (this.board[newX][newY] !== 0) {
        return true;
      }
    }
    return false;
  }
  isOutOfBounds(ship, x, y, position) {
    return (
      (position === "vertical" && x + ship.size > 10) ||
      (position === "horizontal" && y + ship.size > 10)
    );
  }
  // if ship placed move from this.ships to this.placedShips?
}
