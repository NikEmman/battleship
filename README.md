# battleship
This is a [The Odin Project](https://www.theodinproject.com/lessons/javascript-battleship) Javascript project. It demonstrates my current JS knowledge.
## What does it include?
* Classes on their separate files.
* Test files for said classes. (run `npm install` and `npm test` to run them.)
* Two extra js files, one for creating elements on the DOM (painter.js) and one for handling the actual game mechanics(event.js).


## Programming / JS techniques used
* The three classes ( ship, gameboard and player) where created using TDD (Write test first, write the code for it later)
* A separation of logic. Tried to keep file logic clean, functions that draw exist only on painter.js, click events only on event.js, other functions to their respective classes.
* Async programming (The attack animation function).
* Form input validation.


## How to play 
Hit NEW GAME button. At the form insert Player 1 and 2 names. Each player will then place ships on their respective boards. Then, after the 1st player attacks, a HIDE SCREEN button will appear, to facilitate switching screens so current players board will remain secret. Hit SWITCH PLAYER button for Player 2 attack. Repeat until one player's ships are sunk.


If Player 2 name is left blank or "Computer is entered, you get single player mode, where the computer is always Player 2 and randomly places ships and attacks. Enjoy!
