import { Player } from "./player.js";
import { renderBoards } from "./painter.js";

let p1, p2;

document.getElementById("start").addEventListener("click", () => {
  document.querySelector("form").classList.remove("hidden");
});

document.querySelector("form").onsubmit = (e) => {
  e.preventDefault();
  const p1Name = document.getElementById("p1Name");
  const p2Name = document.getElementById("p2Name");
  p1 = new Player(p1Name.textContent);
  p2 = new Player(p2Name.textContent);
  populateBoards(p1, p2);
  p1Name.value = "";
  p2Name.value = "";
  document.querySelector("form").classList.add("hidden");
  //render boards
};
document.querySelector(".enemyBoard").addEventListener("click", (e) => {
  const row = e.target.dataset.row;
  const column = e.target.dataset.column;
  const clickedCell = document.querySelector(
    `[data-row="${row}"][data-column="${column}"]`
  );
  p2.board.receiveAttack(row, column);
  clickedCell.classList.add("clicked");
  renderBoards(p1, p2);
});

//temp function for dev purpose. Will place ships for each board
function populateBoards(p1, p2) {
  const coords = [
    [0, 1, "horizontal"],
    [1, 1, "vertical"],
    [0, 4, "vertical"],
    [5, 2, "vertical"],
    [5, 4, "horizontal"],
  ];
  for (let i = 0; i < 5; i++) {
    p1.board.placeShip(
      p1.board.ships[i],
      coords[i][0],
      coords[i][1],
      coords[i][2]
    );
    p2.board.placeShip(
      p1.board.ships[i],
      coords[i][0],
      coords[i][1],
      coords[i][2]
    );
  }
}
