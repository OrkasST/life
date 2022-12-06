//some utils
export function clear(ctx, screen) {
  ctx.clearRect(0, 0, screen.width, screen.height);
}

export function drawRect(
  { x = 0, y = 0, w = 10, h = 10, color = "#000000", filled = true },
  ctx
) {
  ctx.beginPath();
  ctx.fillStyle = color;
  filled ? ctx.fillRect(x, y, w, h) : ctx.strokeRect(x, y, w, h);
  ctx.closePath();
}

export function drawLine({ x1 = 0, y1 = 0, x2 = 10, y2 = 10 }, ctx) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}

export function drawText(
  {
    font = "20px TimesNewRoman",
    color = "#000000",
    x = 20,
    y = 20,
    text = "NO USER TEXT",
  },
  ctx
) {
  ctx.beginPath();
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
  ctx.closePath();
}
