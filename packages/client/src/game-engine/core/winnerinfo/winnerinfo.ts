import { CanvasElement } from '../canvas/canvasElement';
import { IUserConfig } from '../chip/chips';
import { getUserConfigStore } from '../store/monopolyStore';

type IFillText = {
  ctx: CanvasRenderingContext2D;
};

export class WinnerInfo extends CanvasElement {
  private readonly font = '100 50px system-ui';

  constructor(ctx: CanvasRenderingContext2D) {
    super({ ctx });
  }

  render() {
    this.fillText({
      ctx: this.ctx,
    });
  }

  fillText(props: IFillText) {
    const { ctx } = props;
    ctx.font = this.font;

    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';

    const winner: IUserConfig = this.getWinner();
    const userInfoText = `${winner.userName} победил (${winner.score} оч.)`;
    ctx.fillText(userInfoText, 500, 500);
  }

  private getWinner() {
    const winner: IUserConfig = getUserConfigStore().reduce((res, user) => {
      return !res || user.score > res.score ? user : res;
    });
    return winner;
  }
}
