import { Player } from "./player.js";

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
  p1Name.value = "";
  p2Name.value = "";
  document.querySelector("form").classList.add("hidden");
  //render boards
};
document.querySelector(".enemyBoard").addEventListener("click", (e) => {
  const row = e.target.dataset.row;
  const column = e.target.dataset.column;
  document.getElementById(
    "playing"
  ).textContent = `You clicked on row ${row} and column ${column}`;
  const clickedCell = document.querySelector(
    `[data-row="${row}"][data-column="${column}"]`
  );
  // clicked cell text content should be in draw module
  clickedCell.textContent = "X";
  clickedCell.classList.add("clicked");
  //render boards (where missed textcontent = “💦” (U+1F4A6) , else if success = “🔥” (U+1F525) or w/e)
});
