function renderBoards(self, enemy = false) {
  const container = document.querySelector(".container");
  container.innerHTML = ""; // Clear the container

  // Create the player's board with label
  const myBoardSection = document.createElement("div");
  myBoardSection.classList.add("board-section");

  const myBoardLabel = document.createElement("h3");
  myBoardLabel.classList.add("board-label");
  myBoardLabel.textContent = "Your Fleet";

  const myBoard = document.createElement("div");
  myBoard.classList.add("board", "myBoard");

  myBoardSection.appendChild(myBoardLabel);
  myBoardSection.appendChild(myBoard);

  // Function to create cells for a board
  function createCells(
    boardArray,
    boardElement,
    missedAttacks,
    successfulAttacks,
    isEnemyBoard
  ) {
    const shipSymbols = {
      Cruiser: "⚓",
      Battleship: "🚢",
      Destroyer: "⛵",
      Carrier: "🛳️",
      Submarine: "🔱",
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
            cell.classList.add("miss");
            cell.innerHTML = '<div class="attack-marker miss-marker">●</div>';
          } else if (isSuccessfulAttack) {
            cell.classList.add("hit");
            cell.innerHTML = '<div class="attack-marker hit-marker">✕</div>';
          }
          cell.classList.add("enemy-cell");
        } else {
          if (isMissedAttack || isSuccessfulAttack) {
            cell.classList.add("attacked");
            cell.innerHTML = '<div class="damage-indicator">✕</div>';
          } else {
            if (boardArray[row][col] === 0) {
              cell.classList.add("water");
            } else {
              cell.classList.add(
                "ship",
                `ship-${boardArray[row][col].toLowerCase()}`
              );
              cell.innerHTML = `<div class="ship-icon">${
                shipSymbols[boardArray[row][col]]
              }</div>`;
              cell.title = boardArray[row][col];
            }
          }
        }

        boardElement.appendChild(cell);
      }
    }
  }

  // Create cells for player's board
  createCells(
    self.board.board,
    myBoard,
    self.board.missedAttacks,
    self.board.successfulAttacks,
    false
  );

  // Append player's board to the container
  container.appendChild(myBoardSection);

  // Only create and append enemy board if enemy is provided
  if (enemy) {
    const enemyBoardSection = document.createElement("div");
    enemyBoardSection.classList.add("board-section");

    const enemyBoardLabel = document.createElement("h3");
    enemyBoardLabel.classList.add("board-label");
    enemyBoardLabel.textContent = "Enemy Waters";

    const enemyBoard = document.createElement("div");
    enemyBoard.classList.add("board", "enemyBoard");

    enemyBoardSection.appendChild(enemyBoardLabel);
    enemyBoardSection.appendChild(enemyBoard);

    // Create cells for enemy's board
    createCells(
      enemy.board.board,
      enemyBoard,
      enemy.board.missedAttacks,
      enemy.board.successfulAttacks,
      true
    );

    // Append enemy board to the container
    container.appendChild(enemyBoardSection);
  }
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

  // Add header
  const header = document.createElement("div");
  header.classList.add("sunken-header");
  header.innerHTML = '<h4><i class="icon">⚰️</i> Destroyed Ships</h4>';
  sunkenShips.appendChild(header);

  const shipsList = document.createElement("div");
  shipsList.classList.add("sunken-list");

  for (let ship of player.board.sunkenShips) {
    const shipElement = document.createElement("div");
    shipElement.classList.add("sunken-ship");

    const shipSymbols = {
      Cruiser: "⚓",
      Battleship: "🚢",
      Destroyer: "⛵",
      Carrier: "🛳️",
      Submarine: "🔱",
    };

    shipElement.innerHTML = `
      <div class="sunken-icon">${shipSymbols[ship.type]}</div>
      <div class="sunken-info">
        <span class="ship-name">${ship.type}</span>
        <span class="ship-status">Destroyed</span>
      </div>
    `;

    shipsList.appendChild(shipElement);
  }

  sunkenShips.appendChild(shipsList);
}

function renderAvailableShips(player) {
  const placeShips = document.querySelector(".placeShips");
  placeShips.classList.remove("hidden");
  placeShips.innerHTML = "";

  const playing = document.getElementById("playing");
  playing.classList.remove("hidden");
  playing.innerHTML = "";
  playing.innerHTML = `
    <div class="player-status">
      <i class="status-icon">⚡</i>
      <span>${player.name} - Deploy Your Fleet</span>
    </div>
  `;

  // Add header to ship placement
  const header = document.createElement("div");
  header.classList.add("placement-header");
  header.innerHTML = '<h4><i class="icon">🚢</i> Available Ships</h4>';
  placeShips.appendChild(header);

  createDirectionFieldset(placeShips);

  const shipsList = document.createElement("div");
  shipsList.classList.add("ships-list");

  for (let ship of player.board.ships) {
    shipsList.appendChild(createShipLabel(ship));
  }

  placeShips.appendChild(shipsList);
}

function createShipLabel(ship) {
  const label = document.createElement("label");
  label.className = "ship-option";
  label.id = `${ship.type}`;

  const shipSymbols = {
    Cruiser: "⚓",
    Battleship: "🚢",
    Destroyer: "⛵",
    Carrier: "🛳️",
    Submarine: "🔱",
  };

  const input = document.createElement("input");
  input.type = "radio";
  input.name = "ships";
  input.value = `${ship.type}`;
  input.classList.add("ship-radio");

  const shipDisplay = document.createElement("div");
  shipDisplay.classList.add("ship-display");

  const shipIcon = document.createElement("div");
  shipIcon.classList.add("ship-main-icon");
  shipIcon.textContent = shipSymbols[ship.type];

  const shipCells = document.createElement("div");
  shipCells.classList.add("ship-cells");

  for (let i = 0; i < ship.size; i++) {
    const span = document.createElement("span");
    span.className = "ship-cell";
    span.title = `${ship.type}`;
    shipCells.appendChild(span);
  }

  const shipInfo = document.createElement("div");
  shipInfo.classList.add("ship-info");
  shipInfo.innerHTML = `
    <span class="ship-name">${ship.type}</span>
    <span class="ship-size">${ship.size} cells</span>
  `;

  label.appendChild(input);
  shipDisplay.appendChild(shipIcon);
  shipDisplay.appendChild(shipCells);
  shipDisplay.appendChild(shipInfo);
  label.appendChild(shipDisplay);

  return label;
}

function endGame(winner) {
  const mainContainer = document.querySelector(".mainContainer");
  const headerElement = document.querySelector("header");
  mainContainer.classList.add("gameEnd");
  headerElement.classList.add("gameEnd");

  const gameRestart = document.querySelector(".gameRestart");
  gameRestart.classList.remove("hidden");
  gameRestart.innerHTML = `
    <div class="victory-announcement">
      <div class="victory-icon">🏆</div>
      <h2 class="victory-title">Victory!</h2>
      <p class="victory-text"><strong>${winner}</strong> has won the battle!</p>
      <button class="restart-btn" onclick="location.reload()">
        <i class="btn-icon">🔄</i>
        New Battle
      </button>
    </div>
  `;
}

function startGame() {
  document.querySelector("form").classList.remove("hidden");
  document.querySelector("#title").classList.add("hidden");
  document.querySelector("#playing").classList.add("hidden");
  document.querySelector(".hideBtn").classList.add("hidden");
  document.querySelector(".sunkenShips").classList.add("hidden");
  document.querySelector(".begin").classList.add("hidden");
  document.querySelector(".container").innerHTML = "";
  document.querySelector(".sunkenShips").innerHTML = "";
  document.querySelector(".placeShips").classList.add("hidden");
  document.querySelector(".placeShips").innerHTML = "";
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
  fieldset.classList.add("direction-fieldset");

  const legend = document.createElement("legend");
  legend.textContent = "Ship Orientation";
  legend.classList.add("direction-legend");
  fieldset.appendChild(legend);

  const directionsContainer = document.createElement("div");
  directionsContainer.classList.add("direction-options");

  const verticalLabel = document.createElement("label");
  verticalLabel.classList.add("direction-option");
  verticalLabel.setAttribute("for", "vertical");

  const verticalInput = document.createElement("input");
  verticalInput.type = "radio";
  verticalInput.name = "direction";
  verticalInput.id = "vertical";
  verticalInput.checked = true;
  verticalInput.classList.add("direction-radio");

  const verticalIcon = document.createElement("span");
  verticalIcon.classList.add("direction-icon");
  verticalIcon.textContent = "↕️";

  verticalLabel.appendChild(verticalInput);
  verticalLabel.appendChild(verticalIcon);
  verticalLabel.appendChild(document.createTextNode("Vertical"));

  const horizontalLabel = document.createElement("label");
  horizontalLabel.classList.add("direction-option");
  horizontalLabel.setAttribute("for", "horizontal");

  const horizontalInput = document.createElement("input");
  horizontalInput.type = "radio";
  horizontalInput.name = "direction";
  horizontalInput.id = "horizontal";
  horizontalInput.classList.add("direction-radio");

  const horizontalIcon = document.createElement("span");
  horizontalIcon.classList.add("direction-icon");
  horizontalIcon.textContent = "↔️";

  horizontalLabel.appendChild(horizontalInput);
  horizontalLabel.appendChild(horizontalIcon);
  horizontalLabel.appendChild(document.createTextNode("Horizontal"));

  directionsContainer.appendChild(verticalLabel);
  directionsContainer.appendChild(horizontalLabel);
  fieldset.appendChild(directionsContainer);
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
