import { MonopolyConfig } from '../../config/monopolyConfig'
import { CanvasElement } from '../canvas/canvasElement'
import { IUserConfig } from '../chip/chips'

type IFillText = {
  ctx: CanvasRenderingContext2D
}

export class WinnerInfo extends CanvasElement {
  private readonly font = '100 50px system-ui'

  constructor(ctx: CanvasRenderingContext2D) {
    super({ ctx })
  }

  render() {
    this.fillText({
      ctx: this.ctx,
    })
  }

  fillText(props: IFillText) {
    const { ctx } = props
    ctx.font = this.font

    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'

    const winner: IUserConfig = this.getWinner()
    const userInfoText = [
      winner.userName,
      'победил (',
      winner.score,
      'оч.)',
    ].join(' ')

    console.log('filltext')
    ctx.fillText(userInfoText, 500, 500)
  }

  private getWinner() {
    let winner: IUserConfig = MonopolyConfig.userConfig[0]
    MonopolyConfig.userConfig.map(user => {
      if (!winner || user.score > winner.score) {
        winner = user
      }
    })

    return winner
  }
}
