function renderBoards(self, enemy = false) {
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
  if (enemy) {
    createCells(
      enemy.board.board,
      enemyBoard,
      enemy.board.missedAttacks,
      enemy.board.successfulAttacks,
      true
    );
  }

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
function renderSunkenShips(player) {
  const sunkenShips = document.querySelector(".sunkenShips");
  sunkenShips.classList.remove("hidden");
  sunkenShips.innerHTML = "";

  for (let ship of player.board.sunkenShips) {
    const shipElement = document.createElement("div");
    shipElement.classList.add("ship");
    const shipSymbols = {
      Cruiser: "🚢",
      Battleship: "🛳️",
      Destroyer: "🚤",
      Carrier: "🛥️",
      Submarine: "🛶",
    };

    const cell = document.createElement("span");
    cell.classList.add("cell");
    cell.title = `${ship.type}`;
    cell.textContent = `${shipSymbols[ship.type]}`;
    shipElement.appendChild(cell);
    const name = document.createElement("p");
    name.textContent = ` - ${ship.type}`;
    shipElement.appendChild(name);
    sunkenShips.appendChild(shipElement);
  }
}
function renderAvailableShips(player) {
  const placeShips = document.querySelector(".placeShips");
  placeShips.classList.remove("hidden");
  placeShips.innerHTML = "";
  const playing = document.getElementById("playing");
  playing.classList.remove("hidden");
  playing.innerHTML = "";
  playing.textContent = `${player.name} is now placing ships!`;
  createDirectionFieldset(placeShips);
  for (let ship of player.board.ships) {
    placeShips.appendChild(createShipLabel(ship));
  }
}
function createPlaceShipBtn(placeShips, player) {
  const btn = document.createElement("button");
  btn.textContent = "Place Ship";
  btn.addEventListener("click", () => {
    const directionRadio = document.getElementsByName("direction");
    const shipsRadio = document.getElementsByName("ships");
    let direction;
    let shipName;
    for (i = 0; i < directionRadio.length; i++) {
      if (directionRadio[i].checked) {
        direction = directionRadio[i].id;
      }
    }
    for (i = 0; i < shipsRadio.length; i++) {
      if (shipsRadio[i].checked) {
        shipName = shipsRadio[i].value;
      }
    }
    player.board.placeShips;
  });
  placeShips.appendChild(btn);
}
function createShipLabel(ship) {
  const label = document.createElement("label");
  label.className = "ship";
  label.id = `${ship.type}`;
  const shipSymbols = {
    Cruiser: "🚢",
    Battleship: "🛳️",
    Destroyer: "🚤",
    Carrier: "🛥️",
    Submarine: "🛶",
  };

  const input = document.createElement("input");
  input.type = "radio";
  input.name = "ships";
  input.value = `${ship.type}`;
  label.appendChild(input);

  for (let i = 0; i < ship.size; i++) {
    const span = document.createElement("span");
    span.className = "cell";
    span.title = `${ship.type}`;
    span.textContent = `${shipSymbols[ship.type]}`;
    label.appendChild(span);
  }

  label.appendChild(document.createTextNode(` - ${ship.type}`));
  return label;
}

function endGame(winner) {
  const mainContainer = document.querySelector(".mainContainer");
  const headerElement = document.querySelector("header");
  mainContainer.classList.add("gameEnd");
  headerElement.classList.add("gameEnd");
  const gameRestart = document.querySelector(".gameRestart");
  gameRestart.classList.remove("hidden");
  document.getElementById("winner").textContent = winner;
}

function startGame() {
  document.querySelector("form").classList.remove("hidden");
  document.querySelector("#title").classList.add("hidden");
  document.querySelector("#playing").classList.add("hidden");
  document.querySelector(".hideBtn").classList.add("hidden");
  document.querySelector(".sunkenShips").classList.add("hidden");
  document.querySelector(".container").innerHTML = "";
  document.querySelector(".sunkenShips").innerHTML = "";
}
function resetForm() {
  document.getElementById("p1Name").value = "";
  document.getElementById("p2Name").value = "";
  document.querySelector("form").classList.add("hidden");
  document.querySelector(".sunkenShips").innerHTML = "";
}
function hideCurrentPlayerBoard() {
  document.querySelector(".container").classList.add("hidden");
  document.querySelector(".hideBtn").classList.add("hidden");
  document.querySelector(".switchBtn").classList.remove("hidden");
  document.querySelector(".sunkenShips").classList.add("hidden");
  document.getElementById("title").classList.add("hidden");
  document.getElementById("playing").classList.add("hidden");
}
function switchBoards() {
  document.querySelector(".container").classList.remove("hidden");
  document.querySelector(".switchBtn").classList.add("hidden");
  document.querySelector(".sunkenShips").classList.remove("hidden");
  document.getElementById("title").classList.remove("hidden");
  document.getElementById("playing").classList.remove("hidden");
}
function hideGameEndScreen() {
  document.querySelector(".mainContainer").classList.remove("gameEnd");
  document.querySelector("header").classList.remove("gameEnd");
  document.querySelector(".gameRestart").classList.add("hidden");
  document.querySelector(".sunkenShips").classList.add("hidden");
}
function renderShipPlacement(player) {
  renderBoards(player);
  renderAvailableShips(player);
}
function createDirectionFieldset(placeShips) {
  const fieldset = document.createElement("fieldset");
  fieldset.id = "direction";

  const legend = document.createElement("legend");
  legend.textContent = "Choose direction:";
  fieldset.appendChild(legend);

  const verticalLabel = document.createElement("label");
  verticalLabel.setAttribute("for", "vertical");
  const verticalInput = document.createElement("input");
  verticalInput.type = "radio";
  verticalInput.name = "direction";
  verticalInput.id = "vertical";
  verticalLabel.appendChild(verticalInput);
  verticalLabel.appendChild(document.createTextNode("Vertical"));
  fieldset.appendChild(verticalLabel);

  const horizontalLabel = document.createElement("label");
  horizontalLabel.setAttribute("for", "horizontal");
  const horizontalInput = document.createElement("input");
  horizontalInput.type = "radio";
  horizontalInput.name = "direction";
  horizontalInput.id = "horizontal";
  horizontalLabel.appendChild(horizontalInput);
  horizontalLabel.appendChild(document.createTextNode("Horizontal"));
  fieldset.appendChild(horizontalLabel);
  placeShips.appendChild(fieldset);
}

export {
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
};
