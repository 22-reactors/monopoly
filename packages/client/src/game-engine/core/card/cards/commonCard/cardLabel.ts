import { ColorMainCardEnum } from '../../../types/card'
import { OrientationEnum, PositionEnum, IRect } from '../../../types/card'
import { fillRect } from '../../../../utils/fillRect'
import { strokeRect } from '../../../../utils/strokeRect'
import { CanvasElement } from '../../../canvas/canvasElement'
import { ThemeConfig } from '../../../../config/monopolyConfig'

type TLabel = IRect & {
  color: ColorMainCardEnum
  position: PositionEnum
  orientation: OrientationEnum
}

export class CardLabel extends CanvasElement {
  private readonly color: ColorMainCardEnum
  private static readonly CONST = {
    // Размеры относительно карточки
    SHIFT: 0.85,
    HEIGHT: 0.15,
  }

  constructor(props: TLabel) {
    const { ctx, color } = props
    super({ ctx })
    const size = CardLabel.getCoordinates(props)
    this.color = color
    this.setSize(size)
  }

  private static getCoordinates(props: TLabel) {
    const { x, y, width, height, position, orientation } = props

    return {
      width:
        orientation === OrientationEnum.Horizontal
          ? width * CardLabel.CONST.HEIGHT
          : width,
      height:
        orientation === OrientationEnum.Vertical
          ? height * CardLabel.CONST.HEIGHT
          : height,
      x: position === PositionEnum.Left ? width * CardLabel.CONST.SHIFT : x,
      y: position === PositionEnum.Top ? height * CardLabel.CONST.SHIFT : y,
    }
  }

  render() {
    strokeRect({
      ...this.sizeAndCtx,
      color: ThemeConfig.strokeColor,
    })
    fillRect({
      ...this.sizeAndCtx,
      color: this.color,
    })
  }
}
