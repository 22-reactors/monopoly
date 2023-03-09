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
import { getCardsStore, getUserConfigStore, initMonopolyStore, updateCardsStore, updateUserConfigStore } from './core/store/monopolyStore';

export class GameEngine {
  board: Board | undefined;
  private chipIndex = 0;
  private readonly eventBus: EventBus;

  constructor() {
    this.eventBus = new EventBus();
  }

  static async init(canvas: HTMLCanvasElement) {
    initMonopolyStore();
    const gameEngine = new GameEngine();
    await gameEngine.addBoard(canvas);
    return gameEngine;
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
      this.chipIndex < getUserConfigStore().length - 1
        ? ++this.chipIndex
        : 0;
  }

  //В конце раунда (прохода фишкой всей доски) даем доп. деньги
  private static addEndRoundMoney(endRound: boolean, indexChip: number) {
    if (endRound) {
      const store = getUserConfigStore();
      store[indexChip].userMoney += MonopolyConfig.moneyPerRound;
      updateUserConfigStore(store);
    }
  }

  private static buyCard(
    card: TCard,
    cardIndexWithOffset: number,
    indexChip: number
  ) {
    if (card instanceof MainCard && Cards.isCardNotBuy(card.cardIndex)) {
      const configCard = MonopolyConfig.cards[
        cardIndexWithOffset
      ] as ICardMainSetting;

      const cardPrice = configCard.price;
      const userConfigStore = getUserConfigStore();
      const cardsStore = getCardsStore();
      const userMoney = userConfigStore[indexChip].userMoney;

      if (userMoney > cardPrice) {
        userConfigStore[indexChip].userMoney -= cardPrice;
        userConfigStore[indexChip].score += 1;
        (cardsStore[card.cardIndex] as ICardMainSetting).buyingBackgroundColor = userConfigStore[indexChip].chipColor;

        updateCardsStore(cardsStore);
        updateUserConfigStore(userConfigStore);
      }
    }
  }
}
