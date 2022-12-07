// export function update(data = null, time = 0) {
//   let born = [];
//   let died = [];
//   for (let x = 0; x < data.length; x++) {
//     for (let y = 0; y < data[x].length; y++) {
//       let neighbours = checkNeighboursCount(x, y, data);
//       if (data[x][y] === 0 && neighbours === 3) born.push(x, y);
//       if (data[x][y] === 1 && (neighbours === 2 || neighbours === 3)) null;
//       else if (data[x][y] === 1) died.push(x, y);
//     }
//   }
//   for (let i = 0; i < born.length; i += 2) data[born[i]][born[i + 1]] = 1;
//   for (let i = 0; i < died.length; i += 2) data[died[i]][died[i + 1]] = 0;
//   return data;
// }

import { Cell } from "../cells/basicCell.js";

let born = [];
let died = [];

export function update(data = null, time = 0) {
  born = [];
  died = [];
  for (let x = 0; x < data.length; x++) {
    for (let y = 0; y < data[x].length; y++) {
      if (data[x][y] !== 0) {
        handleCellDecision(data[x][y], data);
      }
    }
  }
  for (let i = 0; i < died.length; i += 2) data[died[i]][died[i + 1]] = 0;
  for (let i = 0; i < born.length; i += 3) data[born[i]][born[i + 1]] = new Cell({ x: born[i], y: born[i + 1], dna: born[i + 2] });
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

function handleCellDecision(cell, data) {
  let action = cell.decide();
  if (cell._actionCost[action] > cell.energy) return handleCellDecision(cell);
  else if (action === 'duplicate') {
    let neighboors = checkNeighbours(cell.x, cell.y, data);
    if (neighboors.length === 0) return handleCellDecision(cell);
    else {
      let i = Math.floor(Math.random() * (neighboors.length / 2))
      born.push(neighboors[i], neighboors[i + 1], cell.duplicate());
    }
  } else if (action === 'eat') {
    let coordinates = cell._isFacingTo();
    if (data[coordinates[0]][coordinates[1]] === 0) return handleCellDecision(cell);
    else {
      died.push(...coordinates);
      cell.eat();
    }
  }
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