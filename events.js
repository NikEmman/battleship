import { Player } from "./player.js";

let p1, p2;

document.getElementById("start").addEventListener("click", startGame);

function startGame() {
  let answer = isTwoPlayerGame();
  createPlayers(answer);
  //render boards
}

function isTwoPlayerGame() {
  let answer = "";
  do {
    answer = prompt("Will you play vs another player [YES]/[NO]").toUpperCase();
  } while (!["YES", "NO"].includes(answer));
  return answer === "YES" ? true : false;
}
function createPlayers(answer) {
  let p1Name = prompt("What is Player 1's name?");
  let p2Name = answer ? prompt("What is Player 1's name?") : "";
  p1 = new Player(p1Name);
  p2 = new Player(p2Name);
}
