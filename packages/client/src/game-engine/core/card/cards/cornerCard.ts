import { CanvasImage } from '../../canvas/canvasImage'
import { ICardCornerSetting } from '../../types/card'
import { CardRect, ICardRect } from '../cardComponent/cardRect'

export type TCornerCard = ICardRect & ICardCornerSetting

export class CornerCard extends CardRect {
  private background: CanvasImage | undefined

  constructor({
    index,
    canvasSize,
    ctx,
    type,
  }: Omit<TCornerCard, 'background'>) {
    super({ index, canvasSize, ctx, type })
    this.calcSizes(index, canvasSize)
  }

  private calcSizes(index: number, canvasSize: number) {
    const { INDEX_TOP_LEFT, INDEX_BOTTOM_LEFT, INDEX_TOP_RIGHT } =
      CornerCard.CONST
    const isLeft = index === INDEX_TOP_LEFT || index === INDEX_BOTTOM_LEFT
    const isTop = index === INDEX_TOP_LEFT || index === INDEX_TOP_RIGHT

    this.setSize({
      width: this.baseSize,
      height: this.baseSize,
      x: isLeft ? 0 : canvasSize - this.baseSize,
      y: isTop ? 0 : canvasSize - this.baseSize,
    })
    this.chipPosition = this.getChipPosition(index)
  }

  static async init({
    background,
    ...props
  }: TCornerCard): Promise<CornerCard> {
    const instance = new CornerCard(props)
    await instance.addBackground(background)
    return instance
  }

  private async addBackground(src: string) {
    this.background = await CanvasImage.init({ src, ...this.sizeAndCtx })
  }

  render() {
    this.fillRect()
    this.background?.render()
    this.strokeRect()
  }
}
