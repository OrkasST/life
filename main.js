// import { animate, drawOnScreen } from "./scripts/mainCanvasFunctions.js";
import { animate } from "./scripts/forAnimatedProgect/animate.js";
import { initiate } from "./scripts/forAnimatedProgect/initiate.js";
import { drawOnScreen } from "./scripts/forNonAnimatedProjects/draw.js";
import { drawRect } from "./scripts/utils/mainCanvasUtils.js";

const screen = document.getElementById("screen");
const ctx = screen.getContext("2d");

const start = document.getElementById("start");

//setting width & height
const width = 400,
  height = 400;
screen.width = width;
screen.height = height;

let size = 5;


let startData = initiate([], screen, size);
console.log('startData: ', startData);


screen.addEventListener('click', (e) => {
  // console.group("~~~~Coordinates~~~~")
  // console.log(e.offsetX);
  // console.log(e.offsetY);
  // console.groupEnd();

  let x = Math.floor(e.offsetX / size);
  let y = Math.floor(e.offsetY / size);

  drawRect({ x: x * size, y: y * size, w: size, h: size }, ctx);
  startData[x][y] = 1;
})

start.onclick = () => animate(startData, 0, ctx, screen, size);
// animate([], 0, ctx, screen, size);
