export enum CardTypeEmum {
  Main = 'main', // основные карты
  Corner = 'corner', // угловые карты
  NoPrice = 'noPrice', // казна, шанс
  WithImage = 'withImage', // жж, налоги, электростация и водоканал
}

export enum ColorMainCardEnum {
  Red = '#ff9999',
  Orange = '#ffc299',
  Brown = '#dfbf9f',
  Blue = '#99ffff',
  Green = '#ccff99',
  Pink = '#ffcccc',
  Yellow = '#ffff99',
  Gray = '#cccccc',
}

export type TCardSetting =
  | ICardCornerSetting
  | ICardMainSetting
  | ICardNoPriceSetting
  | ICardWithImageSetting;

export interface ICardCornerSetting {
  type: CardTypeEmum.Corner;
  background: string;
}

export interface ICardMainSetting {
  type: CardTypeEmum.Main;
  color: ColorMainCardEnum;
  title: string;
  price: number;
  buyingBackgroundColor?: string;
}

export interface ICardNoPriceSetting {
  type: CardTypeEmum.NoPrice;
  title: string;
}

export interface ICardWithImageSetting {
  type: CardTypeEmum.WithImage;
  title: string;
  amount: number;
}

export interface IRect {
  width: number;
  height: number;
  x: number;
  y: number;
  ctx: CanvasRenderingContext2D;
}

export interface ICoordinates {
  x: number;
  y: number;
}

export enum PositionEnum {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left',
}

export enum OrientationEnum {
  Corner = 'corner',
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}
