import { Player } from "./player.js";
import { renderBoards, showBomb, renderSunkenShips } from "./painter.js";

let currentPlayer, enemyPlayer;

function switchTurn(currentPlayer, enemyPlayer) {
  return [enemyPlayer, currentPlayer];
}

document.getElementById("start").addEventListener("click", () => {
  document.querySelector("form").classList.remove("hidden");
  document.querySelector("#title").classList.add("hidden");
  document.querySelector(".hide").classList.add("hidden");
});

document.querySelector("form").onsubmit = (e) => {
  e.preventDefault();
  const p1Name = document.getElementById("p1Name").value;
  const p2Name = document.getElementById("p2Name").value;
  currentPlayer = new Player(p1Name);
  enemyPlayer = new Player(p2Name);
  populateBoards(currentPlayer, enemyPlayer);
  document.getElementById("p1Name").value = "";
  document.getElementById("p2Name").value = "";
  document.querySelector("form").classList.add("hidden");
  document.querySelector(".sunkenShips").innerHTML = "";
  renderBoards(currentPlayer, enemyPlayer); // Render boards initially
};

// Add the event listener once
document
  .querySelector(".container")
  .addEventListener("click", handleBoardClick);

async function handleBoardClick(e) {
  if (isEnemyCell(e.target)) {
    const { row, column } = getCellCoordinates(e.target);

    if (isAttackAlreadyMade(row, column)) return;

    if (isValidCoordinate(row, column)) {
      enemyPlayer.board.receiveAttack(row, column);
      await showAttackEffect(e, this);
      renderBoards(currentPlayer, enemyPlayer); // Re-render boards after an attack
      renderSunkenShips(enemyPlayer);
      document.querySelector(".hide").classList.remove("hidden");
      document.querySelector("#title").classList.remove("hidden");
    }
  }
}

function isEnemyCell(target) {
  return target.classList.contains("cell") && target.closest(".enemyBoard");
}

function getCellCoordinates(target) {
  return {
    row: parseInt(target.dataset.row),
    column: parseInt(target.dataset.column),
  };
}

function isAttackAlreadyMade(row, column) {
  return (
    attackExists(enemyPlayer.board.successfulAttacks, row, column) ||
    attackExists(enemyPlayer.board.missedAttacks, row, column)
  );
}

function attackExists(attacks, row, column) {
  return attacks.some((attack) => attack[0] === row && attack[1] === column);
}

function isValidCoordinate(row, column) {
  return !isNaN(row) && !isNaN(column);
}

async function showAttackEffect(e, container) {
  const boardRect = container.getBoundingClientRect();
  const x = e.clientX - boardRect.left - 5;
  const y = e.clientY - boardRect.top;

  await showBomb(x, y);
}

// Temporary function for development purposes. Will place ships for each board.
function populateBoards(p1, p2) {
  const coords = [
    [0, 1, "horizontal"],
    [3, 0, "vertical"],
    [0, 7, "vertical"],
    [5, 2, "vertical"],
    [7, 7, "horizontal"],
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
document.querySelector(".hide").addEventListener("click", () => {
  document.querySelector(".container").classList.add("hidden");
  document.querySelector(".hide").classList.add("hidden");
  document.querySelector(".switch").classList.remove("hidden");
  document.querySelector(".sunkenShips").classList.add("hidden");
  document.getElementById("title").classList.add("hidden");
});
document.querySelector(".switch").addEventListener("click", () => {
  [currentPlayer, enemyPlayer] = switchTurn(currentPlayer, enemyPlayer);
  document.querySelector(".container").classList.remove("hidden");
  document.querySelector(".switch").classList.add("hidden");
  document.getElementById("title").classList.remove("hidden");

  renderSunkenShips(enemyPlayer);
  renderBoards(currentPlayer, enemyPlayer);
});
//to do : fix renderSunkenShips
