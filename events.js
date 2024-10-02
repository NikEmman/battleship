import { Player } from "./player.js";
import { renderBoards, showBomb } from "./painter.js";

let p1, p2;

document.getElementById("start").addEventListener("click", () => {
  document.querySelector("form").classList.remove("hidden");
});

document.querySelector("form").onsubmit = (e) => {
  e.preventDefault();
  const p1Name = document.getElementById("p1Name").value;
  const p2Name = document.getElementById("p2Name").value;
  p1 = new Player(p1Name);
  p2 = new Player(p2Name);
  populateBoards(p1, p2);
  document.getElementById("p1Name").value = "";
  document.getElementById("p2Name").value = "";
  document.querySelector("form").classList.add("hidden");
  renderBoards(p1, p2); // Render boards initially
};

// Add the event listener once
document
  .querySelector(".container")
  .addEventListener("click", async function (e) {
    if (
      e.target.classList.contains("cell") &&
      e.target.closest(".enemyBoard")
    ) {
      const row = parseInt(e.target.dataset.row);
      const column = parseInt(e.target.dataset.column);
      if (!isNaN(row) && !isNaN(column)) {
        p2.board.receiveAttack(row, column);
        const boardRect = this.getBoundingClientRect();
        const x = e.clientX - boardRect.left - 5;
        const y = e.clientY - boardRect.top;

        await showBomb(x, y);
        renderBoards(p1, p2); // Re-render boards after an attack
      }
    }
  });

// Temporary function for development purposes. Will place ships for each board.
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
      p2.board.ships[i],
      coords[i][0],
      coords[i][1],
      coords[i][2]
    );
  }
}
