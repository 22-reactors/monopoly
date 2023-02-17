import { CardTypeEmum } from '../../types/card'
import { ICoordinates, OrientationEnum, PositionEnum } from '../../types/card'
import { fillRect } from '../../../utils/fillRect'
import { strokeRect } from '../../../utils/strokeRect'
import { CanvasElement } from '../../canvas/canvasElement'
import { ThemeConfig } from '../../../config/monopolyConfig'

export interface ICardRect {
  index: number
  canvasSize: number
  ctx: CanvasRenderingContext2D
  type: CardTypeEmum
}

export abstract class CardRect extends CanvasElement {
  static readonly CONST = {
    //индексы карт
    INDEX_CORNER: 10,
    INDEX_TOP_LEFT: 0,
    INDEX_TOP_RIGHT: 10,
    INDEX_BOTTOM_RIGHT: 20,
    INDEX_BOTTOM_LEFT: 30,
    // Пропорции ряда следующие: в 1 ряду 2 угловые карты и 9 обычных
    // ширина угловой карты = BASE_SIZE: 0.14, ширина обычной = MAIN_CARD_SIZE: 0.08
    // итого 0.14 * 2 + 9 * 0.08 = 1 (где 1 это полная длина по x или y)
    // то есть можно увеличить размер доски canvas и ничего не поедет т.к. размеры относительные
    //размер карточки по оси y
    BASE_SIZE: 0.14,
    //размер карточки по оси x
    MAIN_CARD_SIZE: 0.08,
    //Координаты расположения фишки на карточке относительно карточки (0 - начало, 1 - конец)
    //размер карточки по оси y
    CHIP_SHIFT: 0.25,
    //размер карточки по оси x
    CHIP_CENTER: 0.5,
  }
  //Базовый размер (для вертикальных карточек - высота, для горизонтальных - ширина)
  readonly baseSize: number
  //Позиционирование карточки
  readonly orientation: OrientationEnum
  readonly position: PositionEnum
  readonly type: CardTypeEmum
  //позиция для размещения фишек
  chipPosition = {
    x: 0,
    y: 0,
  }

  private backgroundColor: string = ThemeConfig.card.normalColor

  protected constructor({ index, canvasSize, ctx, type }: ICardRect) {
    super({ ctx })
    this.type = type
    this.orientation = CardRect.getOrientation(index)
    this.position = CardRect.getPosition(index)
    this.baseSize = Math.floor(canvasSize * CardRect.CONST.BASE_SIZE)
  }

  protected get propsForElements() {
    return {
      ...this.sizeAndCtx,
      position: this.position,
      orientation: this.orientation,
    }
  }

  protected setSizeCard(index: number, canvasSize: number) {
    const size = this.getSizesCard(index, canvasSize)
    super.setSize(size)
    this.chipPosition = this.getChipPosition(index)
  }

  private static getOrientation(index: number): OrientationEnum {
    if (index % CardRect.CONST.INDEX_CORNER === 0) {
      //при индексе кратном десяти - угловая карточка
      return OrientationEnum.Corner
    }

    const isTop = index < CardRect.CONST.INDEX_TOP_RIGHT
    const isBottom =
      index > CardRect.CONST.INDEX_BOTTOM_RIGHT &&
      index < CardRect.CONST.INDEX_BOTTOM_LEFT
    if (isTop || isBottom) {
      return OrientationEnum.Vertical
    }

    return OrientationEnum.Horizontal
  }

  private static getPosition(index: number): PositionEnum {
    if (index < CardRect.CONST.INDEX_TOP_RIGHT) {
      return PositionEnum.Top
    }
    if (index < CardRect.CONST.INDEX_BOTTOM_RIGHT) {
      return PositionEnum.Right
    }
    if (index < CardRect.CONST.INDEX_BOTTOM_LEFT) {
      return PositionEnum.Bottom
    }
    return PositionEnum.Left
  }

  private getSizesCard(index: number, canvasSize: number) {
    if (this.orientation === OrientationEnum.Vertical) {
      return this.getSizesVertical(index, canvasSize)
    }
    return this.getSizesHorizontal(index, canvasSize)
  }

  private getSizesVertical(position: number, canvasSize: number) {
    const width = canvasSize * CardRect.CONST.MAIN_CARD_SIZE
    const height = this.baseSize
    const baseX =
      this.baseSize + width * ((position % CardRect.CONST.INDEX_CORNER) - 1)
    const x =
      position < CardRect.CONST.INDEX_TOP_RIGHT
        ? baseX
        : canvasSize - baseX - width
    const y =
      position < CardRect.CONST.INDEX_TOP_RIGHT ? 0 : canvasSize - this.baseSize

    return { width, height, x, y }
  }

  private getSizesHorizontal(position: number, canvasSize: number) {
    const width = this.baseSize
    const height = canvasSize * CardRect.CONST.MAIN_CARD_SIZE
    const x =
      position < CardRect.CONST.INDEX_BOTTOM_LEFT
        ? canvasSize - this.baseSize
        : 0
    const baseY =
      this.baseSize + height * ((position % CardRect.CONST.INDEX_CORNER) - 1)
    const y =
      position < CardRect.CONST.INDEX_BOTTOM_LEFT
        ? baseY
        : canvasSize - baseY - height

    return { width, height, x, y }
  }

  protected strokeRect() {
    strokeRect({
      ...this.sizeAndCtx,
      color: ThemeConfig.strokeColor,
    })
  }

  protected fillRect(backgroundColor?: string) {

    const color = backgroundColor ? backgroundColor : this.backgroundColor

    fillRect({
      ...this.sizeAndCtx,
      color: color,
    })
  }

  isPointInPath(props?: ICoordinates) {
    const hover = super.isPointInPath(props)
    this.setBackgroundColorByHover(hover)
    return hover
  }

  setBackgroundColorByHover(isHover: boolean) {
    const { hoverColor, normalColor } = ThemeConfig.card
    this.backgroundColor = isHover ? hoverColor : normalColor
  }

  getChipPosition(index: number) {
    const topShift = CardRect.CONST.CHIP_SHIFT
    const bottomShift = 1 - topShift

    const {
      INDEX_TOP_LEFT,
      INDEX_TOP_RIGHT,
      INDEX_BOTTOM_RIGHT,
      INDEX_BOTTOM_LEFT,
    } = CardRect.CONST

    const isTopCard =
      index === INDEX_TOP_LEFT ||
      index === INDEX_TOP_RIGHT ||
      this.position === PositionEnum.Top

    if (isTopCard) {
      return {
        x: this.x + this.width * CardRect.CONST.CHIP_CENTER,
        y: this.y + this.height * topShift,
      }
    }

    const isBottomCard =
      index === INDEX_BOTTOM_RIGHT ||
      index === INDEX_BOTTOM_LEFT ||
      this.position === PositionEnum.Bottom
    if (isBottomCard) {
      return {
        x: this.x + this.width * CardRect.CONST.CHIP_CENTER,
        y: this.y + this.height * bottomShift,
      }
    }

    if (this.position === PositionEnum.Right) {
      return {
        x: this.x + this.width * bottomShift,
        y: this.y + this.height * CardRect.CONST.CHIP_CENTER,
      }
    }

    return {
      x: this.x + this.width * topShift,
      y: this.y + this.height * CardRect.CONST.CHIP_CENTER,
    }
  }

  renderUserStroke(color: string) {
    this.ctx.strokeStyle = color
    this.ctx.rect(this.x + 1, this.y + 1, this.width, this.height)
  }
}
