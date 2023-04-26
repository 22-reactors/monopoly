import { IRect } from '../core/types/card';

type TStrokeRect = IRect & {
  color?: string;
  rotate?: number;
};

export function strokeRect({
  ctx,
  x,
  y,
  width,
  height,
  color,
  rotate,
}: TStrokeRect) {
  if (color) {
    ctx.strokeStyle = color;
  }
  if (rotate) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotate);
    ctx.strokeRect(0, 0, width, height);
    ctx.restore();
  } else {
    ctx.strokeRect(x, y, width, height);
  }
}
