const { Ship } = require("./ship");
let ship;
beforeEach(() => {
  ship = new Ship();
  ship.initialize("Cruiser");
});

it("It creates a ship", () => {
  expect(ship).toBeInstanceOf(Ship);
});

it("It has a type", () => {
  expect(ship.type).toEqual("Cruiser");
});

it("It has a size", () => {
  expect(ship.size).toBeTruthy();
});
it("Battleships have a size of 4", () => {
  ship.initialize("Battleship");
  expect(ship.size).toBe(4);
});
it("Destroyers have a size of 2", () => {
  ship.initialize("Destroyer");
  expect(ship.size).toBe(2);
});
it("Carriers have a size of 5", () => {
  ship.initialize("Carrier");
  expect(ship.size).toBe(5);
});
it("Submarines have a size of 3", () => {
  ship.initialize("Submarine");
  expect(ship.size).toBe(3);
});

it("A Battleship", () => {
  ship.initialize("Battleship");
  expect(ship.size).toBe(4);
});
it("Number of hits is 1 when hit once", () => {
  ship.hit();
  expect(ship.hits).toBe(1);
});
it("Number of hits is two when hit twice", () => {
  ship.hit();
  ship.hit();
  expect(ship.hits).toBe(2);
});
it("It is not sunk when hit twice", () => {
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBeFalsey;
});
it("It is sunk when hit 3 times", () => {
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBeTruthy;
});
