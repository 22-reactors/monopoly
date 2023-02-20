import { IRect, ICoordinates } from '../types/card';

type TCanvasElement = Partial<IRect> & {
  ctx: CanvasRenderingContext2D;
};

//Абстрактный класс элемента Canvas
export abstract class CanvasElement {
  readonly ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  hover = false;
  center: ICoordinates;

  protected constructor({
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    ctx,
  }: TCanvasElement) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.center = this.getCenter();
  }

  private getCenter() {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };
  }

  setSize({
    x = this.x,
    y = this.y,
    width = this.width,
    height = this.height,
  }: Partial<Omit<IRect, 'ctx'>>) {
    this.width = Math.floor(width);
    this.height = Math.floor(height);
    this.x = Math.floor(x);
    this.y = Math.floor(y);
    this.center = this.getCenter();
  }

  get sizeAndCtx() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      ctx: this.ctx,
    };
  }

  isPointInPath(props?: ICoordinates) {
    if (props) {
      const { x, y } = props;
      this.ctx.beginPath();
      this.ctx.rect(this.x, this.y, this.width, this.height);
      this.hover = this.ctx.isPointInPath(x, y);
    } else {
      this.hover = false;
    }
    return this.hover;
  }
}
