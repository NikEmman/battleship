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
it("Should be able to place a shipShould have 5 ships", () => {
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
// test for extra square placement, according to ship length
// test for vertical - horizontal
