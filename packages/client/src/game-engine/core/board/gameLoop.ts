import { Cards } from '../card/cards';

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

    const unpurchasedCards = Cards.getUnpurchasedCards();
    if (unpurchasedCards.length === 0) {
      this.endAnimateAndGame(animateId);
    }
  }

  private endAnimateAndGame(animate: number): void {
    cancelAnimationFrame(animate);
    this.endGame();
  }
}
