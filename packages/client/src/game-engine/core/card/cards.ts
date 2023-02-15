import { MonopolyConfig } from '../../config/monopolyConfig'
import { ICoordinates } from '../types/card'
import { CardTypeEmum } from '../types/card'
import { TAssetCard, TCard, TCardInit } from './cardType'
import { CornerCard } from './cards/cornerCard'
import { MainCard } from './cards/commonCard/mainCard'
import { NoPriceCard } from './cards/noPriceCard'
import { WithImageCard } from './cards/withImageCard'

export class Cards {
  private static instance: Cards
  readonly cards: TCard[]
  private static initCard = {
    [CardTypeEmum.Corner]: CornerCard.init,
    [CardTypeEmum.Main]: MainCard.init,
    [CardTypeEmum.NoPrice]: NoPriceCard.init,
    [CardTypeEmum.WithImage]: WithImageCard.init,
  }

  private readonly assetCards: TAssetCard[]

  constructor(cards: TCard[]) {
    this.cards = cards
    this.assetCards = this.getAssetsCard()
    Cards.instance = this
  }

  private getAssetsCard() {
    return this.cards.filter(
      ({ type }) =>
        type === CardTypeEmum.Main || type === CardTypeEmum.WithImage
    ) as TAssetCard[]
  }

  static getInstance() {
    return Cards.instance
  }

  static async initAll(ctx: CanvasRenderingContext2D, canvasSize: number) {
    const cards = await Promise.all(
      MonopolyConfig.cards.map((cardSetting, index) => {
        const { type } = cardSetting
        const fnInit = Cards.initCard[type] as TCardInit
        const props = { index, ctx, canvasSize, ...cardSetting }
        return fnInit(props)
      })
    )
    return new Cards(cards)
  }

  getCardByIndex(index: number) {
    return this.cards[index]
  }

  render() {
    this.cards.forEach(card => card.render())
  }

  checkHoverAssetCard(mouseCord: ICoordinates) {
    let isHover = false
    this.assetCards.forEach(card => {
      const hoverCard = card.isPointInPath(mouseCord)
      if (hoverCard) {
        isHover = true
      }
    })
    return isHover
  }

  clearHover() {
    this.cards.forEach(card => {
      card.isPointInPath()
    })
  }

  checkClickAssetCard(mouseCord: ICoordinates) {
    for (const card of this.assetCards) {
      if (card.isPointInPath(mouseCord)) {
        return card
      }
    }
    return undefined
  }
}
