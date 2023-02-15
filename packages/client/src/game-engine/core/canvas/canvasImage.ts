import { IRect } from '../types/card'
import { CanvasElement } from './canvasElement'

type TDrawImage = IRect & {
  image: HTMLImageElement
  rotate?: number
}

type TCanvasImage = IRect & {
  src: string
  rotate?: number
}

export class CanvasImage extends CanvasElement {
  private readonly rotate: number
  private readonly image: HTMLImageElement

  constructor({ src, rotate = 0, ...props }: TCanvasImage) {
    super(props)
    this.image = CanvasImage.createInstanceImage(src)
    this.rotate = rotate
  }

  private static createInstanceImage(src: string) {
    const image = new Image()
    image.src = src
    return image
  }

  static async init(props: TCanvasImage) {
    const backgroundImage = new CanvasImage(props)
    await backgroundImage.load()
    return backgroundImage
  }

  render() {
    this.drawImage({
      ...this.sizeAndCtx,
      image: this.image,
      rotate: this.rotate,
    })
  }

  private async load(): Promise<void> {
    return new Promise(resolve => {
      this.image.onload = () => {
        resolve()
      }
      this.image.onerror = () => {
        resolve()
      }
    })
  }

  drawImage({ ctx, x, y, width, height, image, rotate }: TDrawImage) {
    if (rotate) {
      ctx.save()
      ctx.translate(x + width, y)
      ctx.rotate(rotate)
      ctx.restore()
    } else {
      ctx.drawImage(image, x, y, width, height)
    }
  }
}
