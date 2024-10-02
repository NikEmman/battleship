function renderBoards(self, enemy) {
  const container = document.querySelector(".container");
  container.innerHTML = ""; // Clear the container

  // Create the boards
  const myBoard = document.createElement("div");
  myBoard.classList.add("board", "myBoard");
  const enemyBoard = document.createElement("div");
  enemyBoard.classList.add("board", "enemyBoard");

  // Function to create cells for a board
  function createCells(
    boardArray,
    boardElement,
    missedAttacks,
    successfulAttacks,
    isEnemyBoard
  ) {
    const shipSymbols = {
      Cruiser: "🚢",
      Battleship: "🛳️",
      Destroyer: "🚤",
      Carrier: "🛥️",
      Submarine: "🛶",
    };
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-row", row);
        cell.setAttribute("data-column", col);

        // Check for attacks
        const isMissedAttack = missedAttacks.some(
          ([x, y]) => x === row && y === col
        );
        const isSuccessfulAttack = successfulAttacks.some(
          ([x, y]) => x === row && y === col
        );

        if (isEnemyBoard) {
          if (isMissedAttack) {
            cell.textContent = "💦"; // Splash symbol for missed attacks
          } else if (isSuccessfulAttack) {
            cell.textContent = "🔥"; // Fire symbol for successful attacks
          }
        } else {
          if (isMissedAttack || isSuccessfulAttack) {
            cell.textContent = "X"; // Red X for attacks on self board
            cell.style.color = "red";
          } else {
            if (boardArray[row][col] === 0) {
              cell.textContent = "";
            } else {
              cell.textContent = shipSymbols[boardArray[row][col]];
              cell.title = boardArray[row][col];
            }
          }
        }

        boardElement.appendChild(cell);
      }
    }
  }

  // Create cells for both boards
  createCells(
    self.board.board,
    myBoard,
    self.board.missedAttacks,
    self.board.successfulAttacks,
    false
  );
  createCells(
    enemy.board.board,
    enemyBoard,
    enemy.board.missedAttacks,
    enemy.board.successfulAttacks,
    true
  );

  // Append boards to the container
  container.appendChild(myBoard);
  container.appendChild(enemyBoard);
}
function showBomb(x, y) {
  return new Promise((resolve) => {
    const bombshell = document.getElementById("bombshell");

    bombshell.style.left = `${x}px`;
    bombshell.style.top = `${y}px`;
    bombshell.style.display = "block";

    // Add the animation class
    bombshell.classList.add("animate-bombshell");

    // Remove the animation class and hide the bombshell after animation
    setTimeout(() => {
      bombshell.classList.remove("animate-bombshell");
      bombshell.style.display = "none";
      resolve();
    }, 1000);
  });
}

export { renderBoards, showBomb };
