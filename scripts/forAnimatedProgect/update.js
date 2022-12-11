import { Cell } from "../cells/basicCell.js";

const logStep = document.getElementById("step");
let step = 0;

let born = [];
let died = [];

export function update(data = null, timesLeft = 0) {
  born = [];
  died = [];
  for (let x = 0; x < data.length; x++) {
    for (let y = 0; y < data[x].length; y++) {
      if (data[x][y] !== 0) {
        if (!data[x][y]) debugger;
        handleCellDecision(data[x][y], data);
        if (data[x][y].energy <= 0) died.push(x, y);
      }
    }
  }
  for (let i = 0; i < died.length; i += 2) data[died[i]][died[i + 1]] = 0;
  for (let i = 0; i < born.length; i += 4) data[born[i]][born[i + 1]] = new Cell({ x: born[i], y: born[i + 1], dna: born[i + 2], color: born[i + 3] });
  logStep.innerText = ++step;
  if (timesLeft > 0) update(data, timesLeft - 1);
  return data;
}

function checkNeighbours(x, y, data) {
  let neighbours = [];

  if (x > 0 && y > 0 &&
    data[x - 1][y - 1] === 0) neighbours.push(x - 1, y - 1);
  if (y > 0 &&
    data[x][y - 1] === 0) neighbours.push(x, y - 1);
  if ((x < data.length - 1 && y > 0) &&
    data[x + 1][y - 1] === 0) neighbours.push(x + 1, y - 1);
  if (x < data.length - 1 &&
    data[x + 1][y] === 0) neighbours.push(x + 1, y);
  if ((x < data.length - 1 && y < data[x].length - 1) &&
    data[x + 1][y + 1] === 0) neighbours.push(x + 1, y + 1);
  if (y < data[x].length - 1 &&
    data[x][y + 1] === 0) neighbours.push(x, y + 1);
  if ((x > 0 && y < data[x].length - 1) &&
    data[x - 1][y + 1] === 0) neighbours.push(x - 1, y + 1);
  if (x > 0 &&
    data[x - 1][y] === 0) neighbours.push(x - 1, y);

  return neighbours;
}

function handleCellDecision(cell, data, limit = 6) {
  let action = cell.decide();
  if (cell._actionCost[action] > cell.energy) return limit > 0 ? handleCellDecision(cell, data, limit - 1) : cell.life.duration++;
  else if (action === 'duplicate') {
    let neighboors = checkNeighbours(cell.x, cell.y, data);
    if (neighboors.length === 0) return limit > 0 ? handleCellDecision(cell, data, limit - 1) : cell.life.duration++;
    else {
      let i = Math.floor(Math.random() * (neighboors.length / 2)) * 2;
      born.push(neighboors[i], neighboors[i + 1], ...cell.duplicate());
      cell.life.duration++;
    }
  } else if (action === 'eat') {
    let coordinates = cell._isFacingTo(data.length - 1, data[0].length - 1);
    if (data[coordinates[0]][coordinates[1]] === 0) return limit > 0 ? handleCellDecision(cell, data, limit - 1) : cell.life.duration++;
    else {
      died.push(...coordinates);
      cell.eat();
      cell.life.duration++;
    }
  }
  else {
    cell.life.duration++;
    cell[action]()
  };
}




// function checkNeighboursCount(x, y, data) {
//   let count = 0;

//   if (x > 0 && y > 0 &&
//     data[x - 1][y - 1] === 1) count++;
//   if (y > 0 &&
//     data[x][y - 1] === 1) count++;
//   if ((x < data.length - 1 && y > 0) &&
//     data[x + 1][y - 1] === 1) count++;
//   if (x < data.length - 1 &&
//     data[x + 1][y] === 1) count++;
//   if ((x < data.length - 1 && y < data[x].length - 1) &&
//     data[x + 1][y + 1] === 1) count++;
//   if (y < data[x].length - 1 &&
//     data[x][y + 1] === 1) count++;
//   if ((x > 0 && y < data[x].length - 1) &&
//     data[x - 1][y + 1] === 1) count++;
//   if (x > 0 &&
//     data[x - 1][y] === 1) count++;

//   return count;
// }

//some changes (_)