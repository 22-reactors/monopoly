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
    //Координаты расположения фишки на карточке относительно карточки (0 - начало, 1 - конец)
    //Координаты. 0,0 левый верхний угол карты
    //смещение фишки относительно размера карточки по оси y, в случае поворота по x
    CHIP_SHIFT: 0.25,
    //смещение фишки относительно размера карточки по оси x, в случае поворота по y
    CHIP_CENTER: 0.5,
  };
  //Базовый размер (для вертикальных карточек - высота, для горизонтальных - ширина)
  readonly baseSize: number
  readonly mainSize: number
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
    //Пропорции ряда следующие: в 1 ряду 2 угловые карты и 9 обычных
    //Пусть ширина и длина угловой карты будет 1.75 ширины обычной карты
    //(можно подобрать и другие пропорции, завивисит от удовлетворенности отрисованным результатом)
    //Тогда 1,75 * x * 2 + x * 9 = 100% (где 100% это полная длина по x или y)
    //итого 12,5 * x = 100% => x = 8%

    //размер обычной карточки по оси y, в случае поворота по x, относительно полного размера
    this.baseSize = Math.floor(canvasSize * (1.75 * 8 / 100))
    //размер обычной карточки по оси x, в случае поворота по y, относительно полного размера
    this.mainSize = canvasSize * (8 / 100)
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

    const position = CardRect.getPosition(index)
    return position === PositionEnum.Top || position === PositionEnum.Bottom
        ? OrientationEnum.Vertical 
        : OrientationEnum.Horizontal
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
    return this.orientation === OrientationEnum.Vertical 
        ? this.getSizesVertical(index, canvasSize)
        : this.getSizesHorizontal(index, canvasSize)
  }

  private getSizesVertical(cardIndex: number, canvasSize: number) {
    const width = this.mainSize
    const height = this.baseSize
    const baseX =
      this.baseSize + width * ((cardIndex % CardRect.CONST.INDEX_CORNER) - 1)
    const x =
      cardIndex < CardRect.CONST.INDEX_TOP_RIGHT
        ? baseX
        : canvasSize - baseX - width
    const y =
      cardIndex < CardRect.CONST.INDEX_TOP_RIGHT
        ? 0
        : canvasSize - this.baseSize

    return { width, height, x, y }
  }

  private getSizesHorizontal(cardIndex: number, canvasSize: number) {
    const width = this.baseSize
    const height = this.mainSize
    const baseY =
      this.baseSize + height * ((cardIndex % CardRect.CONST.INDEX_CORNER) - 1)
    const x =
      cardIndex < CardRect.CONST.INDEX_BOTTOM_LEFT
        ? canvasSize - this.baseSize
        : 0
    const y =
      cardIndex < CardRect.CONST.INDEX_BOTTOM_LEFT
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
    const color = backgroundColor ?? this.backgroundColor

    fillRect({
      ...this.sizeAndCtx,
      color,
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
