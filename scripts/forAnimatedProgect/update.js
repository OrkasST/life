export function update(data = null, time = 0) {
  let born = [];
  let died = [];
  for (let x = 0; x < data.length; x++) {
    for (let y = 0; y < data[x].length; y++) {
      let neighbours = checkNeighboursCount(x, y, data);
      if (data[x][y] === 0 && neighbours === 3) born.push(x, y);
      if (data[x][y] === 1 && (neighbours === 2 || neighbours === 3)) null;
      else if (data[x][y] === 1) died.push(x, y);
    }
  }
  for (let i = 0; i < born.length; i += 2) data[born[i]][born[i + 1]] = 1;
  for (let i = 0; i < died.length; i += 2) data[died[i]][died[i + 1]] = 0;
  return data;
}

function checkNeighboursCount(x, y, data) {
  let count = 0;

  if (x > 0 && y > 0 &&
    data[x - 1][y - 1] === 1) count++;
  if (y > 0 &&
    data[x][y - 1] === 1) count++;
  if ((x < data.length - 1 && y > 0) &&
    data[x + 1][y - 1] === 1) count++;
  if (x < data.length - 1 &&
    data[x + 1][y] === 1) count++;
  if ((x < data.length - 1 && y < data[x].length - 1) &&
    data[x + 1][y + 1] === 1) count++;
  if (y < data[x].length - 1 &&
    data[x][y + 1] === 1) count++;
  if ((x > 0 && y < data[x].length - 1) &&
    data[x - 1][y + 1] === 1) count++;
  if (x > 0 &&
    data[x - 1][y] === 1) count++;

  return count;
}


//some changes (_)