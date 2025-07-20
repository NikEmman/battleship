# Battleship

A browser-based implementation of the classic Battleship game, built as a project for [The Odin Project](https://www.theodinproject.com/lessons/javascript-battleship) JavaScript curriculum. This project showcases modern JavaScript development techniques, including object-oriented programming, test-driven development (TDD), and asynchronous programming.

## Features

- **Interactive Gameplay**: Players can place ships on their board and take turns attacking the opponent's board, with visual feedback for hits, misses, and sunken ships.
- **Single-Player Mode**: Play against a computer opponent that randomly places ships and makes attacks when "Computer" is entered as Player 2's name.
- **Responsive UI**: A clean, intuitive interface with dynamic DOM manipulation for rendering game boards, ship placement UI, and attack animations.
- **Player Privacy**: Includes a "Hide Screen" feature to conceal the current player's board during multiplayer sessions, ensuring fair play.
- **Form Validation**: Ensures valid player names are entered before starting the game.

## Live Demo

Play the game online at [https://nikemman.github.io/battleship/](https://nikemman.github.io/battleship/).

## Project Structure

The codebase is modular and organized for maintainability:

- **Classes**:
  - `Ship`: Represents a ship with properties like type, size, and hit status.
  - `Gameboard`: Manages the game board, including ship placement, attacks, and tracking of hits and misses.
  - `Player`: Handles player-specific data and interactions, such as name and board state.
- **Utility Files**:
  - `painter.js`: Handles all DOM rendering, including game boards, ship placement UI, and attack animations.
  - `event.js`: Manages user interactions, such as click events for ship placement and attacks.
- **Tests**: Each class has corresponding test files written using Jest, ensuring robust functionality through TDD.

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/nikemman/battleship.git
   ```

2. Navigate to the project directory:

   ```bash
   cd battleship
   ```

3. Install dependencies for testing:

   ```bash
   npm install

   ```

4. Install jest:

   ```bash
   npm install --save-dev jest
   ```

5. Run the tests:

   ```bash
   npm test
   ```

6. Open `index.html` in a browser to play the game locally, or visit the [live demo](https://nikemman.github.io/battleship/).

## How to Play

1. **Start the Game**:
   - Click the "New Game" button.
   - Enter names for Player 1 and Player 2 in the form. Leave Player 2 blank or enter "Computer" for single-player mode against a random AI opponent.
2. **Place Ships**:
   - Each player takes turns placing their ships on their 10x10 grid.
   - Select a ship and choose its orientation (horizontal or vertical) before clicking a cell to place it.
3. **Gameplay**:
   - Players alternate attacking the opponent's board by clicking a cell.
   - After Player 1's attack, a "Hide Screen" button appears. Click it to conceal the board, then click "Switch Player" to allow Player 2 to attack.
   - In single-player mode, the computer automatically places ships and attacks randomly.
4. **Winning**:
   - The game ends when one player's fleet is completely sunk. A victory screen displays the winner and offers a "New Battle" button to restart.

## JavaScript Techniques Used

- **Test-Driven Development (TDD)**: Classes were developed using TDD, with tests written before implementation to ensure robust and reliable code.
- **Separation of Concerns**: Logic is modularized, with DOM manipulation in `painter.js`, event handling in `event.js`, and game logic in class-specific files.
- **Asynchronous Programming**: The attack animation in `painter.js` uses `async/await` to provide smooth visual feedback.
- **Object-Oriented Programming**: Encapsulates game entities (ships, gameboards, players) in classes for clean and maintainable code.
- **Form Input Validation**: Ensures valid player inputs to prevent errors during gameplay.

## Technologies

- **JavaScript (ES6+)**: Core language for game logic and interactivity.
- **HTML5/CSS3**: For the game interface and styling.
- **Jest**: For unit testing the core game logic.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -m "Add your feature"`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Open a pull request with a detailed description of your changes.

## Acknowledgments

- [The Odin Project](https://www.theodinproject.com) for providing the project inspiration and curriculum.
- Icons used in the game are sourced from Unicode emoji characters.
