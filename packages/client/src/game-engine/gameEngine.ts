import { EventBus } from './core/event-bus';
import { EVENTS_NAME } from './config/eventsNameConfig';
import { Board } from './core/board/board';
import { Dices } from './core/dice/dices';
import { Chips } from './core/chip/chips';
import { MonopolyConfig } from './config/monopolyConfig';
import { Cards } from './core/card/cards';
import { MainCard } from './core/card/cards/commonCard/mainCard';
import { ICardMainSetting } from './core/types/card';
import { TCard } from './core/card/cardType';

export class GameEngine {
  board: Board | undefined;
  private chipIndex = 0;
  private readonly eventBus: EventBus;

  constructor() {
    this.eventBus = new EventBus();
  }

  static async init(canvas: HTMLCanvasElement) {
    const game = new GameEngine();
    await game.addBoard(canvas);
  }

  private async addBoard(canvas: HTMLCanvasElement) {
    this.board = await Board.init(canvas);
    this.addEventListeners();
  }

  addEventListeners() {
    this.eventBus.on(EVENTS_NAME.ROLL_DICES, this.rollDices);
  }

  // из-за strict mode срабатывает 2 раза
  private rollDices = async () => {
    const { value } = await Dices.getInstance().roll();
    GameEngine.moveChip(this.chipIndex, value);
    this.setNextChipIndex();
  };

  private static moveChip(indexChip: number, dicesValue: number) {
    const { endRound, cardIndex } = Chips.getInstance().moveChip(
      indexChip,
      dicesValue
    );

    this.addEndRoundMoney(endRound, indexChip);

    //костыль, нужен что бы купить 39-ую карту
    const cardIndexWithOffset = cardIndex === -1 ? 39 : cardIndex;
    this.buyCard(
      Cards.getInstance().getCardByIndex(cardIndexWithOffset),
      cardIndexWithOffset,
      indexChip
    );
  }

  //Порядок хода определяется массивом в конфиге, первое элемент первым и тд
  private setNextChipIndex() {
    this.chipIndex =
      this.chipIndex < MonopolyConfig.userConfig.length - 1
        ? ++this.chipIndex
        : 0;
  }

  //В конце раунда (прохода фишкой всей доски) даем доп. деньги
  private static addEndRoundMoney(endRound: boolean, indexChip: number) {
    if (endRound) {
      MonopolyConfig.userConfig[indexChip].userMoney +=
        MonopolyConfig.moneyPerRound;
    }
  }

  private static buyCard(
    card: TCard,
    cardIndexWithOffset: number,
    indexChip: number
  ) {
    if (card instanceof MainCard && !card.buyingBackgroundColor) {
      const configCard = MonopolyConfig.cards[
        cardIndexWithOffset
      ] as ICardMainSetting;

      const cardPrice = configCard.price;
      const userMoney = MonopolyConfig.userConfig[indexChip].userMoney;

      if (userMoney > cardPrice) {
        MonopolyConfig.userConfig[indexChip].userMoney -= cardPrice;
        MonopolyConfig.userConfig[indexChip].score += 1;

        card.buyingBackgroundColor =
          MonopolyConfig.userConfig[indexChip].chipColor;
      }
    }
  }
}