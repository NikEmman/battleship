import { Player } from "./player.js";
import {
  renderBoards,
  showBomb,
  renderSunkenShips,
  endGame,
  startGame,
  resetForm,
  hideCurrentPlayerBoard,
  switchBoards,
  hideGameEndScreen,
  renderShipPlacement,
} from "./painter.js";

let currentPlayer, enemyPlayer;
let firstPlayerPlacement = true;
let isGameStarted = false;

function switchTurn(currentPlayer, enemyPlayer) {
  return [enemyPlayer, currentPlayer];
}

document.getElementById("start").addEventListener("click", () => {
  startGame();
  isGameStarted = false;
  firstPlayerPlacement = true;
});

// Form input validation
document.querySelector("#p1Name").addEventListener("input", () => {
  const p1Name = document.querySelector("#p1Name");
  const submit = document.getElementById("newGame");
  if (p1Name.value.toUpperCase() === "COMPUTER") {
    submit.disabled = true;
    p1Name.classList.add("error");
    document.getElementById("error").classList.remove("hidden");

    document.getElementById("error").textContent = "RESERVED NAME";
  } else {
    submit.disabled = false;
    p1Name.classList.remove("error");
    document.getElementById("error").classList.add("hidden");
    document.getElementById("error").textContent = "";
  }
});

document.querySelector("form").onsubmit = (e) => {
  e.preventDefault();
  const p1Name = document.getElementById("p1Name").value || "Player 1";
  const p2Name = document.getElementById("p2Name").value || "Computer";
  currentPlayer = new Player(p1Name);
  enemyPlayer = new Player(p2Name);
  resetForm();
  renderShipPlacement(currentPlayer);
  document.querySelector(".begin").classList.add("hidden");
  firstPlayerPlacement = true;
};

// event listener for placing ships
document.querySelector(".container").addEventListener("click", (e) => {
  if (isFriendlyCell(e.target)) {
    if (isGameStarted) {
      return;
    }
    const player = firstPlayerPlacement ? currentPlayer : enemyPlayer;
    placeShipOnBoard(e, player);
    if (
      player.board.isAllShipsPlaced() &&
      firstPlayerPlacement &&
      !isGameStarted
    ) {
      if (enemyPlayer.name === "Computer") {
        document.querySelector(".begin").classList.remove("hidden");
        enemyPlayer.board.randomShipPlacement();
      } else {
        document.querySelector(".p2Ships").classList.remove("hidden");
      }
    } else if (
      player.board.isAllShipsPlaced() &&
      !firstPlayerPlacement &&
      !isGameStarted
    ) {
      document.querySelector(".p2Ships").classList.add("hidden");
      document.querySelector(".begin").classList.remove("hidden");
    }
    if (player.board.isAllShipsPlaced()) {
      document.querySelector(".placeShips").classList.add("hidden");
      document.querySelector(".myBoard").classList.add("gameStarted");
    }
  }
});

function placeShipOnBoard(e, player) {
  const directionRadio = document.getElementsByName("direction");
  const shipsRadio = document.getElementsByName("ships");
  let direction;
  let shipName;
  for (let i = 0; i < directionRadio.length; i++) {
    if (directionRadio[i].checked) {
      direction = directionRadio[i].id;
    }
  }
  for (let i = 0; i < shipsRadio.length; i++) {
    if (shipsRadio[i].checked) {
      shipName = shipsRadio[i].value;
    }
  }
  const ship = player.board.getShip(shipName);
  const { row, column } = getCellCoordinates(e.target);
  // if (shipName) {
  //
  //   player.board.placeShip(ship, row, column, direction);
  //   document.getElementById(`${shipName}`).remove();
  //   renderBoards(player);
  // }
  // add red color on cell mouseover is invalid position
  try {
    if (shipName) {
      player.board.placeShip(ship, row, column, direction);
      document.getElementById(`${shipName}`).remove();
      renderBoards(player);
      document.getElementById("error").classList.add("hidden");

      document.getElementById("error").textContent = ""; // Clear error message on successful placement
    }
  } catch (error) {
    const errorDiv = document.getElementById("error");
    document.getElementById("error").classList.remove("hidden");

    errorDiv.textContent = error.message; // Display error message
  }
}

document.querySelector(".p2Ships").addEventListener("click", () => {
  firstPlayerPlacement = false;
  renderShipPlacement(enemyPlayer);
  document.querySelector(".p2Ships").classList.add("hidden");
});

document.querySelector(".begin").addEventListener("click", () => {
  document.querySelector(".begin").classList.add("hidden");
  document.querySelector(".myBoard").classList.add("gameStarted");
  isGameStarted = true;
  document.getElementById(
    "playing"
  ).textContent = `${currentPlayer.name} is now playing`;
  document.querySelector("#playing").classList.remove("hidden");

  renderBoards(currentPlayer, enemyPlayer);
  document.querySelector(".myBoard").classList.add("gameStarted");
});

// Add the event listener once
document
  .querySelector(".container")
  .addEventListener("click", handleBoardClick);

async function handleBoardClick(e) {
  if (isEnemyCell(e.target)) {
    const { row, column } = getCellCoordinates(e.target);

    if (enemyPlayer.board.isAttackAlreadyMade(row, column)) return;

    document.querySelector(".myBoard").classList.add("gameStarted");
    enemyPlayer.board.receiveAttack(row, column);
    await showAttackEffect(e, this);

    renderBoards(currentPlayer, enemyPlayer);
    renderSunkenShips(enemyPlayer);

    if (enemyPlayer.board.isAllShipsSunk()) {
      endGame(currentPlayer.name);
    }
    // make AI play
    if (enemyPlayer.name === "Computer") {
      let x, y;
      do {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      } while (currentPlayer.board.isAttackAlreadyMade(x, y));
      currentPlayer.board.receiveAttack(x, y);

      renderBoards(currentPlayer, enemyPlayer);
      renderSunkenShips(enemyPlayer);
      document.querySelector(".myBoard").classList.add("gameStarted");

      if (currentPlayer.board.isAllShipsSunk()) {
        endGame(enemyPlayer.name);
      }
    } else {
      document.querySelector(".hideBtn").classList.remove("hidden");
    }
    document.querySelector("#title").classList.remove("hidden");
    document.querySelector("#playing").classList.remove("hidden");
    if (enemyPlayer.name !== "Computer")
      document.querySelector(".enemyBoard").classList.add("gameStarted");
  }
}

function isEnemyCell(target) {
  return target.classList.contains("cell") && target.closest(".enemyBoard");
}
function isFriendlyCell(target) {
  return target.classList.contains("cell") && target.closest(".myBoard");
}

function getCellCoordinates(target) {
  return {
    row: parseInt(target.dataset.row),
    column: parseInt(target.dataset.column),
  };
}

async function showAttackEffect(e, container) {
  const boardRect = container.getBoundingClientRect();
  const x = e.clientX - boardRect.left - 5;
  const y = e.clientY - boardRect.top;

  await showBomb(x, y);
}

// Temporary function for development purposes. Will place ships for each board.
function populateBoards(p1, p2 = false) {
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
    if (p2) {
      p2.board.placeShip(
        p2.board.ships[i],
        coords[i][0],
        coords[i][1],
        coords[i][2]
      );
    }
  }
}
document
  .querySelector(".hideBtn")
  .addEventListener("click", hideCurrentPlayerBoard);

document.querySelector(".switchBtn").addEventListener("click", () => {
  [currentPlayer, enemyPlayer] = switchTurn(currentPlayer, enemyPlayer);
  switchBoards();
  document.getElementById(
    "playing"
  ).textContent = `${currentPlayer.name} is now playing`;
  renderBoards(currentPlayer, enemyPlayer);
  renderSunkenShips(enemyPlayer);
  document.querySelector(".myBoard").classList.add("gameStarted");
});

// game restart button
document.querySelector(".restart").addEventListener("click", () => {
  hideGameEndScreen();
  document.getElementById("start").click();
});
