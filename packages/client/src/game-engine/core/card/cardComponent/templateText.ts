import {
  ICoordinates,
  OrientationEnum,
  PositionEnum,
  IRect,
} from '../../types/card';
import { degreeToRad } from '../../../utils/degreeToRad';
import { CanvasElement } from '../../canvas/canvasElement';
import { ThemeConfig } from '../../../config/monopolyConfig';

export enum TCanvasTextAlign {
  Left = 'left',
  Right = 'right',
  Center = 'center',
  Start = 'start',
  End = 'end',
}

type TStrokeText = ICoordinates & {
  text: string;
  ctx: CanvasRenderingContext2D;
  width?: number;
  color?: string;
  textAlign?: TCanvasTextAlign;
  rotate?: number;
  font?: string;
};

export type TTemplateTitle = IRect & {
  text: string;
  shift: number;
  position: PositionEnum;
  orientation: OrientationEnum;
};

/**
 * Отрисовка текста в карточках
 */
export class TemplateText extends CanvasElement {
  private static readonly CONST = {
    // Размеры относительно карточки
    CENTER: 0.5,
    WIDTH: 0.8,
    // Вращение
    ROTATE: {
      RIGHT: 90,
      LEFT: -90,
    },
    FONT_SHIFT: 5,
  };

  private static readonly coordinates = {
    [OrientationEnum.Horizontal]: TemplateText.getHorizontalCoordinates,
    [OrientationEnum.Vertical]: TemplateText.getVerticalCoordinates,
  };

  private readonly text: string;
  private readonly rotate: number;

  constructor(props: TTemplateTitle) {
    const { ctx, text } = props;
    super({ ctx });
    this.text = text;
    const { rotate, ...size } = TemplateText.getCoordinates(props);
    this.rotate = rotate;
    this.setSize(size);
  }

  render() {
    this.strokeText({
      x: this.x,
      y: this.y,
      color: ThemeConfig.textColor,
      ctx: this.ctx,
      text: this.text,
      width: this.width,
      textAlign: TCanvasTextAlign.Center,
      rotate: this.rotate,
    });
  }

  private static getHorizontalCoordinates(
    props: Omit<TTemplateTitle, 'orientation'>
  ) {
    const { x, y, width, height, position, shift } = props;

    const isRight = position === PositionEnum.Right;
    const rotate = isRight
      ? TemplateText.CONST.ROTATE.RIGHT
      : TemplateText.CONST.ROTATE.LEFT;

    return {
      x: x + width * (isRight ? 1 - shift : shift),
      y: y + height * TemplateText.CONST.CENTER,
      width: height * TemplateText.CONST.WIDTH,
      rotate: degreeToRad(rotate),
    };
  }

  private static getVerticalCoordinates(
    props: Omit<TTemplateTitle, 'orientation'>
  ) {
    const { x, y, width, height, position, shift } = props;

    const isTop = position === PositionEnum.Top;

    return {
      x: x + width * TemplateText.CONST.CENTER,
      y: isTop
        ? height * shift
        : y + height * (1 - shift) + TemplateText.CONST.FONT_SHIFT,
      width: width * TemplateText.CONST.WIDTH,
      rotate: 0,
    };
  }

  private static getCoordinates({ orientation, ...cardSize }: TTemplateTitle) {
    const orientationCard = orientation as
      | OrientationEnum.Horizontal
      | OrientationEnum.Vertical;
    return TemplateText.coordinates[orientationCard](cardSize);
  }

  strokeText(props: TStrokeText) {
    const {
      x,
      y,
      text,
      textAlign,
      ctx,
      color,
      width,
      rotate,
      font = '100 10px system-ui',
    } = props;
    if (rotate) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotate);
    }
    ctx.font = font;
    if (textAlign) {
      ctx.textAlign = textAlign;
    }
    if (color) {
      ctx.fillStyle = color;
    }

    if (rotate) {
      ctx.strokeText(text, 0, 0, width);
    } else {
      ctx.strokeText(text, x, y, width);
    }

    if (rotate) {
      ctx.restore();
    }
  }
}
