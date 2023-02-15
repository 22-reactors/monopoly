import { MonopolyConfig } from '../../../config/monopolyConfig'
import { ICardWithImageSetting } from '../../types/card'
import { Background } from '../cardComponent/background'
import { CardRect, ICardRect } from '../cardComponent/cardRect'
import { TemplateText } from '../cardComponent/templateText'

export type TWithImageCard = ICardRect & ICardWithImageSetting

export class WithImageCard extends CardRect {
  private static readonly SIZE_WITH_IMAGE = {
    // Размеры относительно карточки
    SHIFT_TITLE: 0.85,
    SHIFT_AMOUNT: 0.1,
  }

  private background: Background | undefined
  private readonly amount: TemplateText
  private readonly title: TemplateText

  constructor({ title, amount, ...props }: Omit<TWithImageCard, 'background'>) {
    super(props)
    const { index, canvasSize } = props
    this.setSizeCard(index, canvasSize)

    this.title = new TemplateText({
      ...this.propsForElements,
      text: title,
      shift: WithImageCard.SIZE_WITH_IMAGE.SHIFT_TITLE,
    })

    this.amount = new TemplateText({
      ...this.propsForElements,
      text: `${amount} ${MonopolyConfig.currency}`,
      shift: WithImageCard.SIZE_WITH_IMAGE.SHIFT_AMOUNT,
    })
  }

  static async init({ ...props }: TWithImageCard): Promise<WithImageCard> {
    const instance = new WithImageCard(props)
    return instance
  }

  render() {
    this.fillRect()
    this.background?.render()
    this.title.render()
    this.amount.render()
    this.strokeRect()
  }
}
