import { EVENTS_NAME } from '../../config/eventsNameConfig';
import { MonopolyConfig } from '../../config/monopolyConfig';
import { Cards } from '../card/cards';
import { Chips } from '../chip/chips';
import { Dices } from '../dice/dices';
import { EventBus } from '../event-bus';
import { PlayersInfo } from '../playerinfo/playerInfo';
import { WinnerInfo } from '../winnerinfo/winnerinfo';
import { Canvas } from './canvas';
import { GameLoop } from './gameLoop';

export class Board {
  private readonly canvas: Canvas;
  private readonly gameLoop: GameLoop;
  private dices: Dices | undefined;
  private cards: Cards | undefined;
  private chips: Chips | undefined;
  private playerInfo: PlayersInfo | undefined;
  private winnerInfo: WinnerInfo | undefined;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = new Canvas(canvas);
    this.gameLoop = new GameLoop({
      render: this.render,
      update: this.update,
      endGame: this.endGame,
    });
  }

  static async init(canvas: HTMLCanvasElement) {
    const board = new Board(canvas);
    await board.createElements();
    board.gameLoop.run();
    board.addEventListeners();
    return board;
  }

  private addEventListeners() {
    this.canvas.addEventListeners({
      mousemove: this.onMousemove,
      mouseout: this.onMouseout,
      click: this.onClick,
    });
  }

  async createElements() {
    this.cards = await Cards.initAll(this.canvas.ctx, this.canvas.width);

    this.dices = new Dices({
      ctx: this.canvas.ctx,
      canvasSize: this.canvas.width,
    });
    this.chips = new Chips(this.canvas.ctx, MonopolyConfig.userConfig);
    this.playerInfo = new PlayersInfo(
      this.canvas.ctx,
      MonopolyConfig.userConfig
    );
    this.winnerInfo = new WinnerInfo(this.canvas.ctx);
  }

  onClick = (e: MouseEvent) => {
    const mouseCord = this.canvas.getPositionMouseOnCanvas(e);
    if (this.dices?.isPointInPath(mouseCord)) {
      EventBus.getInstance().emit(EVENTS_NAME.ROLL_DICES);
    }
  };

  onMousemove = (e: MouseEvent) => {
    const mouseCord = this.canvas.getPositionMouseOnCanvas(e);
    let isHover = this.cards?.checkHoverAssetCard(mouseCord);
    if (this.dices?.isPointInPath(mouseCord)) {
      isHover = true;
    }

    if (isHover) {
      this.canvas.setCursor(isHover);
    }
  };

  onMouseout = () => {
    this.cards?.clearHover();
  };

  render = () => {
    this.canvas.clear();
    this.cards?.render();
    this.playerInfo?.render();
    this.dices?.render();
    this.chips?.render();
  };

  update = () => {
    this.chips?.update();
  };

  endGame = () => {
    this.winnerInfo?.render();
  };
}
