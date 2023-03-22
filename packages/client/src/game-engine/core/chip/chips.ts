import { EVENTS_NAME } from '../../config/eventsNameConfig';
import { OrientationEnum } from '../types/card';
import { Cards } from '../card/cards';
import { EventBus } from '../event-bus';
import { Chip } from './chip';
import { getUserConfigStore } from '../store/monopolyStore';

export interface IUserConfig {
  userName: string;
  chipColor: string;
  userMoney: number;
  score: number;
  chipPosition: number;
  userType: string;
}

export class Chips {
  private static readonly CONST = {
    COUNT_CARDS: 40,
  };

  private static instance: Chips;
  private readonly chips: Chip[];

  constructor(ctx: CanvasRenderingContext2D) {
    Chips.instance = this;
    this.addEventListener();
    this.chips = getUserConfigStore().map(
      ({ chipColor }, index) =>
        new Chip({ color: chipColor, ctx, indexChip: index })
    );
    this.setStartCoordinates();
  }

  static getInstance() {
    return Chips.instance;
  }

  private setStartCoordinates() {
    getUserConfigStore().forEach(userConfig => {
      this.getCoordinatesForCard(userConfig.chipPosition).forEach(
        ({ chip, coordinates }) => {
          chip.setSize(coordinates);
        }
      );
    });
  }

  private addEventListener() {
    EventBus.getInstance().on(EVENTS_NAME.CHIP_IN_CENTER_CARD, this.finishMove);
  }

  getChipByIndex(index: number) {
    return this.chips[index];
  }

  private getChipsOnCard(indexCard: number) {
    return this.chips.filter(
      ({ indexChip }) =>
        getUserConfigStore()[indexChip].chipPosition === indexCard
    );
  }

  render() {
    this.chips.forEach(chip => chip.render());
  }

  update() {
    this.chips.forEach(chip => chip.update());
  }

  getCoordinatesForCard(indexCard: number) {
    const card = Cards.getInstance().getCardByIndex(indexCard);
    const { orientation } = card;
    const { x, y } = card.chipPosition;
    const step = Chip.CONST.DISTANCE_BETWEEN_CHIPS;
    const chips = this.getChipsOnCard(indexCard);
    const count = chips.length;

    if (orientation === OrientationEnum.Horizontal) {
      let startY = Math.floor(y - ((count - 1) * step) / 2);
      return chips.map(chip => {
        const coordinates = {
          x,
          y: startY,
        };
        startY += step;
        return { chip, coordinates };
      });
    }

    let startX = Math.floor(x - ((count - 1) * step) / 2);
    return chips.map(chip => {
      const coordinates = {
        x: startX,
        y,
      };
      startX += step;
      return { chip, coordinates };
    });
  }

  private static getIntervalCardsCenter(index: number, count: number) {
    const centerCards = [];

    let i = index;
    let endRound = false;
    while (centerCards.length <= count) {
      const { center } = Cards.getInstance().getCardByIndex(i);
      centerCards.push(center);
      if (++i === Chips.CONST.COUNT_CARDS) {
        i = 0;
        endRound = true;
      }
    }

    return { centerCards, endRound, cardIndex: i - 1 };
  }

  moveChip(indexChip: number, value = 0) {
    const chip = this.getChipByIndex(indexChip);
    const startCard = getUserConfigStore()[indexChip].chipPosition;
    const { centerCards, endRound, cardIndex } = Chips.getIntervalCardsCenter(
      startCard,
      value
    );

    chip.moveBetweenCards(value, centerCards);
    this.arrangeChipsOnCard(startCard);

    return { endRound, cardIndex };
  }

  arrangeChipsOnCard(indexCard: number) {
    this.getCoordinatesForCard(indexCard).forEach(({ chip, coordinates }) => {
      chip.moveInsideCard(coordinates);
    });
  }

  private finishMove = (index: number) => {
    this.arrangeChipsOnCard(index);
  };
}
