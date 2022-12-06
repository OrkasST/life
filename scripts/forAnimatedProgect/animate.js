import { render } from "./render.js";
import { update } from "./update.js";

let frameRate = 10;
let started = false;

export function animate(data, time, ctx, screen, size) {
  // if (!started) { data = initiate(data, screen); started = true }
  // console.log(data);
  data = update(data, time, frameRate);
  render(time, ctx, data, screen.width, screen.height, size);
  requestAnimationFrame((time) => animate(data, time, ctx, screen, size));
}
