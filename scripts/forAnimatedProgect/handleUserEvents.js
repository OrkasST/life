let cellX = 0, cellY = 0, log = false;
const logWindow = document.getElementById("log");
const logColor = document.getElementById("color");
const logDna = document.getElementById("dna");
const logLife = document.getElementById("life");
const logEnergy = document.getElementById("energy");
const logDuration = document.getElementById("duration");

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
    logEnergy.innerHTML = `Energy: <span>${cell.energy}</span>`
    logDuration.innerHTML = `Life duration: <span>${cell.life.duration}</span>`
    logDna.innerHTML = `  DNA:
  <br>
    photosynthesis: <span>${cell.dna.photosynthesis}</span><br>
    rotateRight: <span>${cell.dna.rotateRight}</span><br>
    duplicate: <span>${cell.dna.duplicate}</span><br>
    eat: <span>${cell.dna.eat}</span>
    `
    logLife.innerHTML = ` Life: 
    <br>
    photosynthesis: <span>${cell.life.photosynthesis}</span><br>
    rotateRight: <span>${cell.life.rotateRight}</span><br>
    duplicate: <span>${cell.life.duplicate}</span><br>
    eat: <span>${cell.life.eat}</span><br>
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