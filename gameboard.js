import { Ship } from "./ship.js";

export class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => new Array(10).fill(0));
    this.ships = [];
    this.missedAttacks = [];
    this.successfulAttacks = [];
    this.addShips();
    this.sunkenShips = [];
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
    if (!this.isValidPlacement(ship, x, y, position)) {
      throw new Error("Invalid ship placement!");
    }

    const isVertical = position === "vertical";
    for (let i = 0; i < ship.size; i++) {
      const newX = isVertical ? x + i : x;
      const newY = isVertical ? y : y + i;
      this.board[newX][newY] = ship.type;
    }
  }
  isValidPlacement(ship, x, y, position) {
    const isVertical = position === "vertical";
    for (let i = 0; i < ship.size; i++) {
      const newX = isVertical ? x + i : x;
      const newY = isVertical ? y : y + i;

      // Check if coordinates are out of bounds
      if (newX >= 10 || newY >= 10 || newX < 0 || newY < 0) {
        return false;
      }

      // Check if the position is occupied
      if (this.board[newX][newY] !== 0) {
        return false;
      }
    }
    return true;
  }

  receiveAttack(x, y) {
    if (this.board[x][y] === 0) {
      this.missedAttacks.push([x, y]);
    } else {
      this.successfulAttacks.push([x, y]);
      for (const ship of this.ships) {
        if (ship.type === this.board[x][y]) {
          ship.hit();
          if (ship.isSunk()) {
            this.sunkenShips.push(ship);
          }
        }
      }
    }
  }
  isAllShipsSunk() {
    const sunk = (ship) => ship.isSunk();
    return this.ships.every(sunk);
  }
  getShip(shipType) {
    for (let ship of this.ships) {
      if (ship.type === shipType) {
        return ship;
      }
    }
  }
  isAllShipsPlaced() {
    const flattenedBoard = new Set(this.board.flat(1));
    const shipTypes = [
      "Cruiser",
      "Battleship",
      "Destroyer",
      "Carrier",
      "Submarine",
    ];
    return shipTypes.every((type) => flattenedBoard.has(type));
  }
  isAttackAlreadyMade(row, column) {
    const pair = [row, column];
    const attackExists = (array) =>
      array.some((element) => element[0] === pair[0] && element[1] === pair[1]);

    return (
      attackExists(this.successfulAttacks) || attackExists(this.missedAttacks)
    );
  }
  randomShipPlacement() {
    const directions = ["horizontal", "vertical"];

    for (let i = 0; i < 5; i++) {
      let placed = false;
      while (!placed) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const position =
          directions[Math.floor(Math.random() * directions.length)];

        if (this.isValidPlacement(this.ships[i], x, y, position)) {
          this.placeShip(this.ships[i], x, y, position);
          placed = true;
        }
      }
    }
  }
}
