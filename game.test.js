import { Game } from "./game.js";
import { Player } from "./player.js";
let game;
beforeEach(() => {
  game = new Game();
});
it("Can create a player", () => {
  game.addPlayerOne("John");
  expect(game.playerOne).toBeInstanceOf(Player);
});
it("Can create a second player", () => {
  game.addPlayerTwo("Bob");
  expect(game.playerTwo).toBeInstanceOf(Player);
});
