import { IRect } from '../core/types/card';

type TFillRect = IRect & {
  color?: string;
  rotate?: number;
};

export function fillRect({
  ctx,
  x,
  y,
  width,
  height,
  color,
  rotate,
}: TFillRect) {
  if (color) {
    ctx.globalAlpha = 0.75;
    ctx.fillStyle = color;
  }
  if (rotate) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  } else {
    ctx.fillRect(x, y, width, height);
  }
}
