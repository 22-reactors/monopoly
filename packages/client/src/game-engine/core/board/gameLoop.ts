import { Cards } from '../card/cards';
import { MainCard } from '../card/cards/commonCard/mainCard';
import { TCard } from '../card/cardType';
import { getCardsStore } from '../store/monopolyStore';
import { ICardMainSetting } from '../types/card';

interface IGameLoop {
  render: () => void;
  update: () => void;
  endGame: () => void;
}

export class GameLoop {
  private readonly render: () => void;
  private readonly update: () => void;
  private readonly endGame: () => void;

  private last: number = performance.now();
  private now: number = performance.now();
  private step: number = 1 / 60;
  private dt = 0;

  constructor({ render, update, endGame }: IGameLoop) {
    this.render = render;
    this.update = update;
    this.endGame = endGame;
  }

  run(): void {
    this.now = performance.now();
    this.dt += Math.min(1, (this.now - this.last) / 1000);

    while (this.dt > this.step) {
      this.dt -= this.step;
      this.update();
    }
    this.last = this.now;
    this.render();
    const animateId = requestAnimationFrame(() => {
      this.run();
    });

    const unpurchasedCards = this.getUnpurchasedCards();
    if (unpurchasedCards.length === 0) {
      this.endAnimateAndGame(animateId);
    }
  }

  private getUnpurchasedCards(): TCard[] {
    return Cards.getInstance().cards.filter(
      card => card instanceof MainCard && this.isCardNotBuy(card.cardIndex)
    );
  }

  private endAnimateAndGame(animate: number): void {
    cancelAnimationFrame(animate);
    this.endGame();
  }

  //Такой же метод есть в GameEngine, но он статический
  //Решил задублировать т.к. допущено много ошибок 
  //при изначальном проектировании классов
  //из-за отстутствия опыта и малых сроков (торопился)
  private isCardNotBuy(cardIndex: number): boolean {
    return !(getCardsStore()[cardIndex] as ICardMainSetting).buyingBackgroundColor;
  }
}
