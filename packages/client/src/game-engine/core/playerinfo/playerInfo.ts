import { MonopolyConfig } from '../../config/monopolyConfig'
import { CanvasElement } from '../canvas/canvasElement'
import { IUserConfig } from '../chip/chips'

type IFillText = {
  ctx: CanvasRenderingContext2D
}

export class PlayersInfo extends CanvasElement {
  private readonly users: IUserConfig[]
  private readonly font = '100 30px system-ui'

  constructor(ctx: CanvasRenderingContext2D, users: IUserConfig[]) {
    super({ ctx })
    this.users = users
  }

  render() {
    this.fillText({
      ctx: this.ctx,
    })
  }

  fillText(props: IFillText) {
    const { ctx } = props
    ctx.font = this.font
    this.users.map((user, i) => {
      const y = i === 0 ? 180 : 180 + 35 * i

      ctx.fillStyle = user.chipColor
      ctx.beginPath()
      ctx.arc(170, y - 10, 15, 0, Math.PI * 2, true)
      ctx.closePath()
      ctx.fill()

      ctx.fillStyle = 'black'
      ctx.textAlign = 'left'
      const userInfoText = [user.userName, user.userMoney, MonopolyConfig.currency].join(' ')
      ctx.fillText(userInfoText, 200, y)
    })
  }
}
