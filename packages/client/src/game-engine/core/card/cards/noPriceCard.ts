import { ICardNoPriceSetting } from '../../types/card'
import { Background } from '../cardComponent/background'
import { CardRect, ICardRect } from '../cardComponent/cardRect'
import { TemplateText } from '../cardComponent/templateText'

export type TNoPriceCard = ICardRect & ICardNoPriceSetting

export class NoPriceCard extends CardRect {
  private background: Background | undefined
  private readonly title: TemplateText
  private static readonly CONST_NO_PRICE = {
    // Размеры относительно карточки
    SHIFT_TITLE: 0.85,
  }

  constructor({ title, ...props }: Omit<TNoPriceCard, 'background'>) {
    super(props)

    const { index, canvasSize } = props
    this.setSizeCard(index, canvasSize)

    this.title = new TemplateText({
      ...this.propsForElements,
      text: title,
      shift: NoPriceCard.CONST_NO_PRICE.SHIFT_TITLE,
    })
  }

  static async init({ ...props }: TNoPriceCard): Promise<NoPriceCard> {
    const instance = new NoPriceCard(props)
    return instance
  }

  render() {
    this.fillRect()
    this.background?.render()
    this.title.render()
    this.strokeRect()
  }
}
