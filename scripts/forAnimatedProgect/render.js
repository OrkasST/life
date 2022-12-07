import { clear, drawRect } from "../utils/mainCanvasUtils.js";

export function render(time, ctx, data, width, height, size) {
  ctx.clearRect(0, 0, width, height);
  for (let x = 0; x < data.length; x++) {
    for (let y = 0; y < data[x].length; y++) {
      if (data[x][y] !== 0) drawRect({ x: x * size, y: y * size, w: size, h: size, color: data[x][y].color }, ctx)
    }
  }
}
