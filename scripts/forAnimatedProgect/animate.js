import { Cell } from "../cells/basicCell.js";
import { handleUserEvents } from "./handleUserEvents.js";
import { render } from "./render.js";
import { update } from "./update.js";

let frameRate = 10;
let started = false;
let animationId;
let answer = '';

export function animate(data, time, ctx, screen, size) {
  if (!started) { data = initiate(data); started = true }
  animationId = requestAnimationFrame((time) => animate(data, time, ctx, screen, size));

  if (animationId) answer = handleUserEvents(data);
  if (answer === "stop") cancel(animationId);

  data = update(data, frameRate);
  render(time, ctx, data, screen.width, screen.height, size);
}

function initiate(data) {
  for (let x = 0; x < data.length; x++) {
    for (let y = 0; y < data[x].length; y++) {
      if (data[x][y] === 1) data[x][y] = new Cell({ x, y });
    }
  }
  return data;
}

function cancel(id) {
  cancelAnimationFrame(id);
}
