const { Gameboard } = require("./gameboard");
const { Ship } = require("./ship");
let gameboard;
beforeEach(() => {
  gameboard = new Gameboard();
});
it("It has a board", () => {
  expect(gameboard.board).toBeTruthy;
});
it("It has a board that is an array", () => {
  expect(gameboard.board).toBeInstanceOf(Array);
});
it("Should have 5 ships", () => {
  expect(gameboard.ships.length).toBe(5);
});
it("Each item in ships should be a Ship instance", () => {
  expect(gameboard.ships[0]).toBeInstanceOf(Ship);
  expect(gameboard.ships[1]).toBeInstanceOf(Ship);
  expect(gameboard.ships[2]).toBeInstanceOf(Ship);
  expect(gameboard.ships[3]).toBeInstanceOf(Ship);
  expect(gameboard.ships[4]).toBeInstanceOf(Ship);
});

it("Can place a ship on the board", () => {
  gameboard.placeShip(gameboard.ships[0], 0, 1, "vertical");
  expect(gameboard.board[0][1]).toEqual("Cruiser");
});
it("A ship should take up board spots according to it's length", () => {
  gameboard.placeShip(gameboard.ships[0], 0, 1, "vertical");
  expect(gameboard.board[0][1]).toEqual("Cruiser");
  expect(gameboard.board[1][1]).toEqual("Cruiser");
  expect(gameboard.board[2][1]).toEqual("Cruiser");
});
it("Should be able to place a ship horizontally", () => {
  gameboard.placeShip(gameboard.ships[0], 0, 1, "horizontal");
  expect(gameboard.board[0][1]).toEqual("Cruiser");
  expect(gameboard.board[0][2]).toEqual("Cruiser");
  expect(gameboard.board[0][3]).toEqual("Cruiser");
});
it("Should throw an error if ship is out of bounds", () => {
  expect(() =>
    gameboard.placeShip(gameboard.ships[0], 0, 8, "horizontal")
  ).toThrow();
  expect(() =>
    gameboard.placeShip(gameboard.ships[0], 9, 1, "vertical")
  ).toThrow();
});
it("Should throw an error if placement squares are occupied by another ship", () => {
  gameboard.placeShip(gameboard.ships[0], 0, 1, "horizontal");
  expect(() =>
    gameboard.placeShip(gameboard.ships[1], 0, 1, "horizontal")
  ).toThrow("Invalid ship placement!");
});
it("Should be able to receive an attack, and keep track if it missed", () => {
  gameboard.receiveAttack(0, 1);
  expect(gameboard.missedAttacks.includes([0, 1])).toBeTruthy;
});
it("Should be able to receive an attack, and keep track if successful", () => {
  gameboard.placeShip(gameboard.ships[0], 0, 1, "horizontal");
  gameboard.receiveAttack(0, 1);
  expect(gameboard.successfulAttacks.includes([0, 1])).toBeTruthy;
});
it("On successful attack, the ship in question should take a hit", () => {
  gameboard.placeShip(gameboard.ships[0], 0, 1, "horizontal");
  gameboard.receiveAttack(0, 1);
  expect(gameboard.ships[0].hits).toEqual(1);
});
it("When all ships are sunk it should be able to report it", () => {
  gameboard.ships[0].hits = 5;
  gameboard.ships[1].hits = 5;
  gameboard.ships[2].hits = 5;
  gameboard.ships[3].hits = 5;
  gameboard.ships[4].hits = 5;
  expect(gameboard.isAllShipsSunk()).toBeTruthy();
});
it("When not all ships are sunk it should be able to report false", () => {
  gameboard.ships[0].hits = 1;
  gameboard.ships[1].hits = 1;
  gameboard.ships[2].hits = 2;
  gameboard.ships[3].hits = 1;
  gameboard.ships[4].hits = 3;
  expect(gameboard.isAllShipsSunk()).toBeFalsy();
});
it("On hit, if ship is sunk it is tracked", () => {
  gameboard.placeShip(gameboard.ships[0], 0, 1, "horizontal");
  gameboard.receiveAttack(0, 1);
  gameboard.receiveAttack(0, 2);
  gameboard.receiveAttack(0, 3);
  expect(gameboard.sunkenShips).toContain(gameboard.ships[0]);
});
it("On hit, if ship is not sunk, it is not added to sunken ships", () => {
  gameboard.placeShip(gameboard.ships[0], 0, 1, "horizontal");
  gameboard.receiveAttack(0, 1);
  gameboard.receiveAttack(0, 2);
  expect(gameboard.sunkenShips).not.toContain(gameboard.ships[0]);
});
it("Should return true when all ships are placed", () => {
  gameboard.placeShip(gameboard.ships[0], 0, 0, "horizontal"); // Cruiser
  gameboard.placeShip(gameboard.ships[1], 1, 0, "horizontal"); // Battleship
  gameboard.placeShip(gameboard.ships[2], 2, 0, "horizontal"); // Destroyer
  gameboard.placeShip(gameboard.ships[3], 3, 0, "horizontal"); // Carrier
  gameboard.placeShip(gameboard.ships[4], 4, 0, "horizontal"); // Submarine

  expect(gameboard.isAllShipsPlaced()).toBe(true);
});

it("Should return false when not all ships are placed", () => {
  gameboard.placeShip(gameboard.ships[0], 0, 0, "horizontal"); // Cruiser
  gameboard.placeShip(gameboard.ships[1], 1, 0, "horizontal"); // Battleship

  expect(gameboard.isAllShipsPlaced()).toBe(false);
});

it("Should return false when no ships are placed", () => {
  expect(gameboard.isAllShipsPlaced()).toBe(false);
});
it("Should return true if attack was already made (missed attack)", () => {
  gameboard.receiveAttack(0, 1);
  expect(gameboard.isAttackAlreadyMade(0, 1)).toBeTruthy();
});

it("Should return true if attack was already made (successful attack)", () => {
  gameboard.placeShip(gameboard.ships[0], 0, 1, "horizontal");
  gameboard.receiveAttack(0, 1);
  expect(gameboard.isAttackAlreadyMade(0, 1)).toBeTruthy();
});

it("Should return false if attack was not made", () => {
  expect(gameboard.isAttackAlreadyMade(0, 1)).toBeFalsy();
});

it("Should return true for multiple missed attacks", () => {
  gameboard.receiveAttack(0, 1);
  gameboard.receiveAttack(2, 3);
  expect(gameboard.isAttackAlreadyMade(0, 1)).toBeTruthy();
  expect(gameboard.isAttackAlreadyMade(2, 3)).toBeTruthy();
});

it("Should return true for multiple successful attacks", () => {
  gameboard.placeShip(gameboard.ships[0], 0, 1, "horizontal");
  gameboard.receiveAttack(0, 1);
  gameboard.receiveAttack(0, 2);
  expect(gameboard.isAttackAlreadyMade(0, 1)).toBeTruthy();
  expect(gameboard.isAttackAlreadyMade(0, 2)).toBeTruthy();
});

it("Can randomly place ships", () => {
  gameboard.randomShipPlacement();
  expect(gameboard.isAllShipsPlaced()).toBeTruthy();
});
