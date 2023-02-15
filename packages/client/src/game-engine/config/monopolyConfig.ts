import { IUserConfig } from '../core/chip/chips'
import {
  TCardSetting,
  CardTypeEmum,
  ColorMainCardEnum,
} from '../core/types/card'

interface IMonopolyConfig {
  currency: string
  moneyPerRound: number
  cards: TCardSetting[]
  userConfig: IUserConfig[]
}

const userStartProps = {
  startMoney: 1000,
  startScore: 0,
}

export const MonopolyConfig: IMonopolyConfig = {
  currency: 'P',
  moneyPerRound: 500,
  cards: [
    {
      type: CardTypeEmum.Corner,
      background: 'start-card.png',
    },
    {
      title: 'Житная улица',
      type: CardTypeEmum.Main,
      color: ColorMainCardEnum.Gray,
      price: 60,
    },
    {
      title: 'Казна',
      type: CardTypeEmum.NoPrice,
    },
    {
      title: 'Нагатинская улица',
      type: CardTypeEmum.Main,
      color: ColorMainCardEnum.Gray,
      price: 60,
    },
    {
      title: 'Налог',
      type: CardTypeEmum.WithImage,
      amount: 100,
    },
    {
      title: 'Рижская ж/д',
      type: CardTypeEmum.WithImage,
      amount: 200,
    },
    {
      title: 'Варшавское шоссе',
      type: CardTypeEmum.Main,
      color: ColorMainCardEnum.Pink,
      price: 100,
    },
    {
      title: 'Шанс',
      type: CardTypeEmum.NoPrice,
    },
    {
      title: 'уллица Огарева',
      type: CardTypeEmum.Main,
      color: ColorMainCardEnum.Pink,
      price: 100,
    },
    {
      title: 'Парковая улица',
      type: CardTypeEmum.Main,
      color: ColorMainCardEnum.Pink,
      price: 120,
    },
    {
      type: CardTypeEmum.Corner,
      background: 'jail-card.png',
    },
    {
      title: 'уллица Полянка',
      type: CardTypeEmum.Main,
      color: ColorMainCardEnum.Yellow,
      price: 140,
    },
    {
      title: 'Электростанция',
      type: CardTypeEmum.WithImage,
      amount: 150,
    },
    {
      title: 'улица Сретенка',
      type: CardTypeEmum.Main,
      color: ColorMainCardEnum.Yellow,
      price: 140,
    },
    {
      title: 'Ростовская набережная',
      type: CardTypeEmum.Main,
      color: ColorMainCardEnum.Yellow,
      price: 160,
    },
    {
      title: 'Курская ж/д',
      type: CardTypeEmum.WithImage,
      amount: 200,
    },
    {
      title: 'Рязанский проспект',
      type: CardTypeEmum.Main,
      color: ColorMainCardEnum.Green,
      price: 180,
    },
    {
      title: 'Шанс',
      type: CardTypeEmum.NoPrice,
    },
    {
      title: 'улица Вавилова',
      type: CardTypeEmum.Main,
      color: ColorMainCardEnum.Green,
      price: 180,
    },
    {
      title: 'Рублевское шоссе',
      type: CardTypeEmum.Main,
      color: ColorMainCardEnum.Green,
      price: 200,
    },
    {
      type: CardTypeEmum.Corner,
      background: 'parking-card.png',
    },
    {
      title: 'улица Тверская',
      type: CardTypeEmum.Main,
      color: ColorMainCardEnum.Red,
      price: 200,
    },
    {
      title: 'Шанс',
      type: CardTypeEmum.NoPrice,
    },
    {
      title: 'Пушкинская ул.',
      type: CardTypeEmum.Main,
      color: ColorMainCardEnum.Blue,
      price: 220,
    },
    {
      title: 'площадь Маяковского',
      type: CardTypeEmum.Main,
      color: ColorMainCardEnum.Blue,
      price: 240,
    },
    {
      title: 'Казанская ж/д',
      type: CardTypeEmum.WithImage,
      amount: 200,
    },
    {
      title: 'улица Грузинский вал',
      type: CardTypeEmum.Main,
      color: ColorMainCardEnum.Orange,
      price: 260,
    },
    {
      title: 'Новинский бульвар',
      type: CardTypeEmum.Main,
      color: ColorMainCardEnum.Orange,
      price: 260,
    },
    {
      title: 'Водопровод',
      type: CardTypeEmum.WithImage,
      amount: 250,
    },
    {
      title: 'Смоленская площадь',
      type: CardTypeEmum.Main,
      color: ColorMainCardEnum.Orange,
      price: 280,
    },
    {
      type: CardTypeEmum.Corner,
      background: 'arrest-card.png',
    },
    {
      title: 'улица Щусева',
      type: CardTypeEmum.Main,
      color: ColorMainCardEnum.Brown,
      price: 300,
    },
    {
      title: 'Гоголевский бульвар',
      type: CardTypeEmum.Main,
      color: ColorMainCardEnum.Brown,
      price: 300,
    },
    {
      title: 'Казна',
      type: CardTypeEmum.NoPrice,
    },
    {
      title: 'Кутузовский проспект',
      type: CardTypeEmum.Main,
      color: ColorMainCardEnum.Brown,
      price: 320,
    },
    {
      title: 'Ленинградская ж/д',
      type: CardTypeEmum.WithImage,
      amount: 200,
    },
    {
      title: 'Шанс',
      type: CardTypeEmum.NoPrice,
    },
    {
      title: 'улица Малая Бронная',
      type: CardTypeEmum.Main,
      color: ColorMainCardEnum.Red,
      price: 350,
    },
    {
      title: 'Сверхналог',
      type: CardTypeEmum.WithImage,
      amount: 100,
    },
    {
      title: 'улица Арбат',
      type: CardTypeEmum.Main,
      color: ColorMainCardEnum.Red,
      price: 400,
    },
  ],
  userConfig: [
    {
      userName: 'XXX_Alex_XXX',
      chipColor: 'red',
      userMoney: userStartProps.startMoney,
      score: userStartProps.startScore,
    },
    {
      userName: 'zxc',
      chipColor: 'green',
      userMoney: userStartProps.startMoney,
      score: userStartProps.startScore,
    },
    {
      userName: 'Bat9',
      chipColor: 'pink',
      userMoney: userStartProps.startMoney,
      score: userStartProps.startScore,
    },
    {
      userName: 'Dimasik',
      chipColor: 'gray',
      userMoney: userStartProps.startMoney,
      score: userStartProps.startScore,
    },
  ],
}

export const ThemeConfig = {
  card: {
    normalColor: 'white',
    hoverColor: '#F0F6F8',
  },
  dice: {
    backgroundColor: '#F0F6F8',
    dotsColor: '#0d1c00',
  },
  baseColor: '#c4eda4',
  strokeColor: '#0d1c00',
  textColor: '#000000',
}
