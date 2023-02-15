import { MonopolyConfig } from '../../../../config/monopolyConfig'
import { ICardMainSetting } from '../../../types/card'
import { CardRect, ICardRect } from '../../cardComponent/cardRect'
import { TemplateText } from '../../cardComponent/templateText'
import { CardLabel } from './cardLabel'

export type TMainCard = ICardRect & ICardMainSetting

export class MainCard extends CardRect {
  private static readonly CONST_MAIN_CARD = {
    SHIFT_TITLE: 0.8,
    SHIFT_PRISE: 0.1,
  }

  private readonly title: TemplateText
  private readonly price: TemplateText
  private readonly cardLabel: CardLabel
  buyingBackgroundColor?: string

  constructor({ title, color, price, ...props }: TMainCard) {
    super(props)

    const { index, canvasSize } = props
    this.setSizeCard(index, canvasSize)

    this.title = new TemplateText({
      ...this.propsForElements,
      text: title,
      shift: MainCard.CONST_MAIN_CARD.SHIFT_TITLE,
    })

    this.price = new TemplateText({
      ...this.propsForElements,
      text: `${price} ${MonopolyConfig.currency}`,
      shift: MainCard.CONST_MAIN_CARD.SHIFT_PRISE,
    })

    this.cardLabel = new CardLabel({
      ...this.propsForElements,
      color,
    })
  }

  static init(props: TMainCard) {
    return new MainCard(props)
  }

  render() {
    this.fillRect(this.buyingBackgroundColor)
    this.cardLabel.render()
    this.title.render()
    this.price.render()
    this.strokeRect()
  }
}
