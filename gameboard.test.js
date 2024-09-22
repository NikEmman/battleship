const { Gameboard } = require("./gameboard");
const { Ship } = require("./ship");
let gameboard;
beforeEach(() => {
  gameboard = new Gameboard();
  gameboard.addShips();
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
  ).toThrow("Occupied space!");
});
