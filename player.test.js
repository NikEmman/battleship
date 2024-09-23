import { Player } from "./player.js";
import { Gameboard } from "./gameboard.js";

let player;
beforeEach(() => {
  player = new Player("John");
});

it("Should have a gameboard", () => {
  expect(player.board).toBeInstanceOf(Gameboard);
});
it("Should have a name", () => {
  expect(player.name).toEqual("John");
});
it("If no name is given, to default to 'computer'", () => {
  const computer = new Player();
  expect(computer.name).toEqual("Computer");
});
