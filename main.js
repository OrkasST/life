// import { animate, drawOnScreen } from "./scripts/mainCanvasFunctions.js";
import { Cell } from "./scripts/cells/basicCell.js";
import { animate } from "./scripts/forAnimatedProgect/animate.js";
import { initiate } from "./scripts/forAnimatedProgect/initiate.js";
import { displayCellInfo } from "./scripts/forAnimatedProgect/update.js";
import { drawOnScreen } from "./scripts/forNonAnimatedProjects/draw.js";
import { drawRect } from "./scripts/utils/mainCanvasUtils.js";

const screen = document.getElementById("screen");
const ctx = screen.getContext("2d");

const start = document.getElementById("start");
let started = false;

//setting width & height
const width = 300,
  height = 300;
screen.width = width;
screen.height = height;

let size = 5;


let startData = initiate([], screen, size);


screen.addEventListener('click', (e) => {
  if (started) {
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
  }
})

start.onclick = () => {
  console.log("started");
  started = true;
  animate(startData, 0, ctx, screen, size)
}