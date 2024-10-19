# battleship
This is a [The Odin Project](https://www.theodinproject.com/lessons/javascript-battleship) Javascript project. It demonstrates my current JS knowledge.
## What does it include?
* Classes on their separate files.
* Test files for said classes. (run `npm install` and `npm test` to run them.)
* Two extra js files, one for creating elements on the DOM (painter.js) and one for handling the actual game mechanics(event.js).


### Programming / JS techniques used
* The three classes ( ship, gameboard and player) where created using TDD (Write test first, write the code for it later)
* A separation of logic. Tried to keep file logic clean, functions that draw exist only on painter.js, click events only on event.js, other functions to their respective classes.
* Async programming (The attack animation function).
