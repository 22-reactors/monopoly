import { IConfig } from '../../pages/gameSetup/gameSetup';
import { IUserConfig } from '../core/chip/chips';
import { getCardsStore, initMonopolyStore } from '../core/store/monopolyStore';
import {
  TCardSetting,
  CardTypeEmum,
  ColorMainCardEnum,
} from '../core/types/card';

/*
 * currency - Валюта
 * moneyPerRound - Стартовое кол-во очков у игроков
 * cards - настройка карточек (кол-во, название карточки, стоимость, тип карточки, цвет)
 * userConfig - настройка игроков (кол-во, цвет фишки, имя)
 */
interface IMonopolyConfig {
  //Валюта
  currency: string;
  moneyPerRound: number;
  cards: TCardSetting[];
}

/*
 * startMoney - Кол-во денег, с которым старуют игроки
 * startScore - Стартовое кол-во очков у игроков
 */
export const userStartProps = {
  startMoney: 1000,
  startScore: 0,
  startChipPosition: 0,
};

export const MonopolyConfig: IMonopolyConfig = {
  currency: 'P',
  moneyPerRound: 500,
  cards: [
    {
      type: CardTypeEmum.Corner,
      background: '/images/start-card.png',
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
      background: '/images/jail-card.png',
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
      background: '/images/parking-card.png',
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
      background: '/images/arrest-card.png',
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
};

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
};

export const initMonopolyUserConfig = (players: IConfig[]) => {
  const userConfig: IUserConfig[] = players.map(player => {
    return {
      userName: player.name,
      userType: player.type,
      chipColor: player.color,
      userMoney: userStartProps.startMoney,
      score: userStartProps.startScore,
      chipPosition: userStartProps.startChipPosition,
    };
  });
  initMonopolyStore(userConfig);
};

export const isGameExist = (): boolean => {
  const unpurchasedCards: TCardSetting[] = (getCardsStore() ?? []).filter(
    card => card.type === CardTypeEmum.Main && !card.buyingBackgroundColor
  );

  return unpurchasedCards.length !== 0;
};
