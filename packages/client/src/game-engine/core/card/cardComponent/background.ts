import { degreeToRad } from '../../../utils/degreeToRad'
import { CanvasImage } from '../../canvas/canvasImage'
import { OrientationEnum, PositionEnum, IRect } from '../../types/card'

type TBackground = IRect & {
  src: string
  position: PositionEnum
  orientation: OrientationEnum
}

type TBackgroundSize = Omit<IRect, 'ctx'> & {
  position: PositionEnum
}

export class Background extends CanvasImage {
  private static readonly CONST = {
    BASE_SIZE: 0.8,
    HORIZONTAL: {
      X_RIGHT: 0.3,
      X_LEFT: 0.7,
      Y_RIGHT: 0.1,
      Y_LEFT: 0.5,
    },
    VERTICAL: {
      X: 0.1,
      Y_TOP: 0.25,
      Y_BOTTOM: 0.3,
    },
    ROTATE: {
      LEFT: -90,
      RIGHT: 90,
    },
  }

  private static readonly coordinates = {
    [OrientationEnum.Horizontal]: Background.getHorizontalCoordinates,
    [OrientationEnum.Vertical]: Background.getVerticalCoordinates,
  }

  static async initImage({
    orientation,
    position,
    ctx,
    src,
    ...sizeCard
  }: TBackground) {
    const orientationCard = orientation as
      | OrientationEnum.Horizontal
      | OrientationEnum.Vertical
    const size = Background.coordinates[orientationCard]({
      position,
      ...sizeCard,
    })
    const background = await Background.init({ ctx, src, ...size })
    return background as Background
  }

  private static getHorizontalCoordinates({
    x,
    y,
    width,
    height,
    position,
  }: TBackgroundSize) {
    const xRight = x + width * Background.CONST.HORIZONTAL.X_RIGHT
    const xLeft = height * Background.CONST.HORIZONTAL.X_LEFT - height

    const yRight = y + height * Background.CONST.HORIZONTAL.Y_RIGHT
    const yLeft = y + width * Background.CONST.HORIZONTAL.Y_LEFT

    const isRight = position === PositionEnum.Right
    const rotate = isRight
      ? Background.CONST.ROTATE.RIGHT
      : Background.CONST.ROTATE.LEFT
    return {
      width: height * Background.CONST.BASE_SIZE,
      height: height * Background.CONST.BASE_SIZE,
      x: isRight ? xRight : xLeft,
      y: isRight ? yRight : yLeft,
      rotate: degreeToRad(rotate),
    }
  }

  private static getVerticalCoordinates({
    x,
    y,
    width,
    height,
    position,
  }: TBackgroundSize) {
    const yTop = height * Background.CONST.VERTICAL.Y_TOP
    const yBottom = y + height * Background.CONST.VERTICAL.Y_BOTTOM

    const isTop = position === PositionEnum.Top

    return {
      width: width * Background.CONST.BASE_SIZE,
      height: width * Background.CONST.BASE_SIZE,
      x: x + width * Background.CONST.VERTICAL.X,
      y: isTop ? yTop : yBottom,
      rotate: 0,
    }
  }
}
