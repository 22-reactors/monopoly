import { EVENTS_NAME } from '../../config/eventsNameConfig';
import { ICoordinates } from '../types/card';
import { CanvasElement } from '../canvas/canvasElement';
import { EventBus } from '../event-bus';
import { getUserConfigStore, updateUserConfigStore } from '../store/monopolyStore';

interface IArc {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  fill?: string;
  radius: number;
  startAngle?: number;
  endAngle?: number;
}

interface IChip {
  color: string;
  ctx: CanvasRenderingContext2D;
  indexChip: number;
}

export class Chip extends CanvasElement {
  static readonly CONST = {
    RADIUS: 15,
    COUNT_CARD: 40,
    END_ANGLE: 2 * Math.PI,
    DISTANCE_BETWEEN_CHIPS: Math.floor(15 * 0.7),
    SPEED_MOVE: 200,
  };

  private readonly color: string;
  public readonly indexChip: number;

  private startMoveTime = 0;
  private endMoveTime = 0;
  private moveCoordinates: ICoordinates[] = [];
  private moveToNewCard = false;

  private moveStep: {
    from: ICoordinates | null;
    to: ICoordinates | null;
  } = {
    from: null,
    to: null,
  };

  constructor({ color, ctx, indexChip }: IChip) {
    super({ ctx });
    this.color = color;
    this.indexChip = indexChip;
  }

  render() {
    this.arc({
      ...this.sizeAndCtx,
      fill: this.color,
      endAngle: Chip.CONST.END_ANGLE,
      radius: Chip.CONST.RADIUS,
    });
  }

  private takeStep(value: number) {
    const store = getUserConfigStore();
    store[this.indexChip].chipPosition += value;
    if (store[this.indexChip].chipPosition >= Chip.CONST.COUNT_CARD) {
      store[this.indexChip].chipPosition -= Chip.CONST.COUNT_CARD;
    }

    updateUserConfigStore(store);
  }

  moveBetweenCards(value: number, moveCoordinates: ICoordinates[]) {
    this.moveToNewCard = true;
    this.moveCoordinates = moveCoordinates;
    this.takeStep(value);
    this.setNextStep();
  }

  moveInsideCard(coordinates: ICoordinates) {
    this.moveCoordinates = [coordinates];
    this.setNextStep();
  }

  private setNextStep() {
    if (this.moveCoordinates.length) {
      const to = this.moveCoordinates.shift();

      if (to) {
        this.moveStep = {
          from: {
            x: this.x,
            y: this.y,
          },
          to,
        };
      }

      this.startMoveTime = performance.now();
      this.endMoveTime = this.startMoveTime + Chip.CONST.SPEED_MOVE;
    } else {
      this.moveStep.to = null;
      if (this.moveToNewCard) {
        EventBus.getInstance().emit(
          EVENTS_NAME.CHIP_IN_CENTER_CARD,
          getUserConfigStore()[this.indexChip].chipPosition
        );
        this.moveToNewCard = false;
      }
    }
  }

  update() {
    if (this.moveStep.to === null) {
      return;
    }
    const currentTime = performance.now();
    if (currentTime > this.endMoveTime) {
      this.setNextStep();
    }
    if (this.moveStep.to) {
      const time = (currentTime - this.startMoveTime) / Chip.CONST.SPEED_MOVE;
      this.setLERPCoordinates(time);
    }
  }

  private setLERPCoordinates(time: number) {
    if (this.moveStep.from && this.moveStep.to) {
      this.x = Chip.LERP(this.moveStep.from.x, this.moveStep.to.x, time);
      this.y = Chip.LERP(this.moveStep.from.y, this.moveStep.to.y, time);
    }
  }

  private static LERP(start: number, finish: number, time: number) {
    return Math.floor(start + (finish - start) * time);
  }

  arc({
    ctx,
    x,
    y,
    radius,
    fill,
    endAngle = Math.PI * 2,
    startAngle = 0,
  }: IArc) {
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
  }
}
