let cellX = 0, cellY = 0, log = false;
const logWindow = document.getElementById("log");
const logColor = document.getElementById("color");
const logDna = document.getElementById("dna");
const logLife = document.getElementById("life");
const logEnergy = document.getElementById("energy");

let lastData = [];
let stop = false;
let stopped = false;

export function handleUserEvents(data) {
    if (log) { console.log(data[cellX][cellY]); visualiseInfo(data[cellX][cellY]); log = false }
    if (stop) {
        lastData = data;
        stop = false;
        return "stop";
    }
}

function visualiseInfo(cell) {
    if (cell === 0) return;
    logColor.style.backgroundColor = cell.color;
    logEnergy.innerText = `Energy: ${cell.energy}`
    logDna.innerText = `  DNA:
  
    photosynthesis: ${cell.dna.photosynthesis}
    rotateRight: ${cell.dna.rotateRight}
    duplicate: ${cell.dna.duplicate}
    eat: ${cell.dna.eat}
    `
    logLife.innerText = ` Life: 
  
    photosynthesis: ${cell.life.photosynthesis}
    rotateRight: ${cell.life.rotateRight}
    duplicate: ${cell.life.duplicate}
    eat: ${cell.life.eat}
    `
}


export function displayCellInfo(x, y) {
    log = true;
    cellX = x;
    cellY = y;
    if (stopped) visualiseInfo(lastData[cellX][cellY]);
}

export function stopSimulation() {
    stop = true;
    stopped = true;
}
export function getData() {
    return lastData;
}