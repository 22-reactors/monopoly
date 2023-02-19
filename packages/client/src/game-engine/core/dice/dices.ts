import { CanvasElement } from '../canvas/canvasElement';
import { Dice } from './dice';

interface IDices {
  ctx: CanvasRenderingContext2D;
  canvasSize: number;
}

interface IRoll {
  value: number;
  double: boolean;
}

export class Dices extends CanvasElement {
  private static CONST = {
    RECT_SIZE: 0.2,
    X_Y_START: 0.5,
    X_Y_CENTER: 0.5,
    X_Y_END: 0.55,
    DICE_SIZE: 0.05,
    SHIFT_DICE_1: 0.9,
    SHIFT_DICE_2: 1.1,
  };

  private static instance: Dices;
  private readonly dice1: Dice;
  private readonly dice2: Dice;

  constructor({ ctx, canvasSize }: IDices) {
    const start = canvasSize * Dices.CONST.X_Y_START;
    const center = canvasSize * Dices.CONST.X_Y_CENTER;
    const end = canvasSize * Dices.CONST.X_Y_END;
    const sizeDice = Math.floor(canvasSize * Dices.CONST.DICE_SIZE);
    const hypotenuseDice = Math.sqrt(2 * sizeDice ** 2);
    const startRect = start - hypotenuseDice;
    const sizeRect = canvasSize * Dices.CONST.RECT_SIZE + hypotenuseDice * 2;

    super({
      ctx,
      x: startRect,
      y: startRect,
      width: sizeRect,
      height: sizeRect,
    });

    this.dice1 = new Dice({
      ctx,
      size: sizeDice,
      start: { x: start, y: start },
      end: { x: center * Dices.CONST.SHIFT_DICE_1, y: end },
    });

    this.dice2 = new Dice({
      ctx,
      size: sizeDice,
      start: { x: center * Dices.CONST.SHIFT_DICE_2, y: start },
      end: { x: end, y: end },
    });

    Dices.instance = this;
  }

  static getInstance() {
    return Dices.instance;
  }

  get value(): IRoll {
    return {
      value: this.dice1.value + this.dice2.value,
      double: this.dice1.value === this.dice2.value,
    };
  }

  async roll(): Promise<IRoll> {
    for (let i = 0; i < 8; i++) {
      await this.rollStep();
    }

    return this.value;
  }

  private rollStep(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.dice1.roll();
        this.dice2.roll();
        resolve();
      }, 100);
    });
  }

  render() {
    this.dice1.render();
    this.dice2.render();
  }
}
