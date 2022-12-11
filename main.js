// import { animate, drawOnScreen } from "./scripts/mainCanvasFunctions.js";
import { Cell } from "./scripts/cells/basicCell.js";
import { animate } from "./scripts/forAnimatedProgect/animate.js";
import { displayCellInfo, getData, stopSimulation } from "./scripts/forAnimatedProgect/handleUserEvents.js";
import { initiate } from "./scripts/forAnimatedProgect/initiate.js";
import { drawOnScreen } from "./scripts/forNonAnimatedProjects/draw.js";
import { drawRect } from "./scripts/utils/mainCanvasUtils.js";

const screen = document.getElementById("screen");
const ctx = screen.getContext("2d");

const start = document.getElementById("start");
const fill = document.getElementById("fill");
const stop = document.getElementById("stop");
let started = false, stopped = false;

//setting width & height
const width = 300,
  height = 300;
screen.width = width;
screen.height = height;

let size = 5;


let startData = initiate([], screen, size);

screen.addEventListener('click', (e) => {
  if (started || stopped) {
    displayCellInfo(Math.floor(e.offsetX / size), Math.floor(e.offsetY / size));
  }
  else {
    let x = Math.floor(e.offsetX / size);
    let y = Math.floor(e.offsetY / size);

    drawRect({ x: x * size, y: y * size, w: size, h: size }, ctx);
    drawRect({ x: (x - 1) * size, y: (y - 1) * size, w: size, h: size }, ctx);
    drawRect({ x: (x - 1) * size, y: (y + 1) * size, w: size, h: size }, ctx);
    drawRect({ x: (x - 1) * size, y: y * size, w: size, h: size }, ctx);
    drawRect({ x: (x + 1) * size, y: (y - 1) * size, w: size, h: size }, ctx);
    drawRect({ x: (x + 1) * size, y: (y + 1) * size, w: size, h: size }, ctx);
    drawRect({ x: (x + 1) * size, y: y * size, w: size, h: size }, ctx);
    drawRect({ x: x * size, y: (y - 1) * size, w: size, h: size }, ctx);
    drawRect({ x: x * size, y: (y + 1) * size, w: size, h: size }, ctx);
    startData[x][y] = 1;
    startData[x][y - 1] = 1;
    startData[x][y + 1] = 1;
    startData[x - 1][y - 1] = 1;
    startData[x - 1][y + 1] = 1;
    startData[x - 1][y] = 1;
    startData[x + 1][y - 1] = 1;
    startData[x + 1][y + 1] = 1;
    startData[x + 1][y] = 1;

    //switch buttons
    start.disabled = false;
  }
})

start.onclick = () => {
  if (started) return;
  let lastData = getData();
  if (lastData.length !== 0) startData = [...lastData];
  console.log("started");
  started = true;
  stopped = false;

  //switch buttons
  start.disabled = true;
  stop.disabled = false;
  fill.disabled = true;

  animate(startData, 0, ctx, screen, size)
}

fill.onclick = () => {
  if (started || stopped) return;
  console.log("filled");
  startData = startData.map((el, x) => {
    return el.map((elm, y) => {
      drawRect({ x: x * size, y: y * size, w: size, h: size }, ctx);
      return 1;
    })
  });
  console.log(startData);

  //switch buttons
  fill.disabled = true;
  start.disabled = false;
}

stop.onclick = () => {
  started = false;
  stopped = true;
  stopSimulation();

  //switch buttons
  stop.disabled = true;
  start.disabled = false;
}

// TEMPORARY