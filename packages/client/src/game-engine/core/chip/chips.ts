import { EVENTS_NAME } from '../../config/eventsNameConfig'
import { OrientationEnum } from '../types/card'
import { Cards } from '../card/cards'
import { EventBus } from '../event-bus'
import { Chip } from './chip'

export interface IUserConfig {
  userName: string
  chipColor: string
  userMoney: number
  score: number
}

export class Chips {
  private static readonly CONST = {
    COUNT_CARDS: 40,
  }

  private static instance: Chips
  private readonly chips: Chip[]
  private readonly userConfig: IUserConfig[]

  constructor(ctx: CanvasRenderingContext2D, userConfig: IUserConfig[]) {
    this.userConfig = userConfig
    Chips.instance = this
    this.addEventListener()
    this.chips = this.userConfig.map(
      ({ chipColor }) => new Chip({ color: chipColor, ctx })
    )
    this.setStartCoordinates()
  }

  static getInstance() {
    return Chips.instance
  }

  private setStartCoordinates() {
    this.getCoordinatesForCard(0).forEach(({ chip, coordinates }) => {
      chip.setSize(coordinates)
    })
  }

  private addEventListener() {
    EventBus.getInstance().on(EVENTS_NAME.CHIP_IN_CENTER_CARD, this.finishMove)
  }

  getChipByIndex(index: number) {
    return this.chips[index]
  }

  private getChipsOnCard(indexCard: number) {
    return this.chips.filter(({ position }) => position === indexCard)
  }

  render() {
    this.chips.forEach(chip => chip.render())
  }

  update() {
    this.chips.forEach(chip => chip.update())
  }

  getCoordinatesForCard(indexCard: number) {
    const card = Cards.getInstance().getCardByIndex(indexCard)
    const { orientation } = card
    const { x, y } = card.chipPosition
    const step = Chip.CONST.DISTANCE_BETWEEN_CHIPS
    const chips = this.getChipsOnCard(indexCard)
    const count = chips.length

    if (orientation === OrientationEnum.Horizontal) {
      let startY = Math.floor(y - ((count - 1) * step) / 2)
      return chips.map(chip => {
        const coordinates = {
          x,
          y: startY,
        }
        startY += step
        return { chip, coordinates }
      })
    }

    let startX = Math.floor(x - ((count - 1) * step) / 2)
    return chips.map(chip => {
      const coordinates = {
        x: startX,
        y,
      }
      startX += step
      return { chip, coordinates }
    })
  }

  private static getIntervalCardsCenter(index: number, count: number) {
    const centerCards = []

    let i = index
    let endRound = false;
    while (centerCards.length <= count) {
      const { center } = Cards.getInstance().getCardByIndex(i)
      centerCards.push(center)
      
      i++

      if (i === Chips.CONST.COUNT_CARDS) {
        i = 0
        endRound = true
      }
      
    }

    return {centerCards, endRound, cardIndex: i - 1}
  }

  moveChip(indexChip: number, value = 0) {
    const chip = this.getChipByIndex(indexChip)
    const startCard = chip.position
    const {centerCards, endRound, cardIndex} = Chips.getIntervalCardsCenter(startCard, value)

    chip.moveBetweenCards(value, centerCards)
    this.arrangeChipsOnCard(startCard)

    return {endRound, cardIndex}
  }

  arrangeChipsOnCard(indexCard: number) {
    this.getCoordinatesForCard(indexCard).forEach(({ chip, coordinates }) => {
      chip.moveInsideCard(coordinates)
    })
  }

  private finishMove = (index: number) => {
    this.arrangeChipsOnCard(index)
  }
}
