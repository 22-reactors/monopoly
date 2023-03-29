import { IThemeCard } from '../components/themeCard/themeCard';
import avatarEmpty from '../assets/avatar-empty.png';
import { IThemeMessage } from '../components/themeMessage/themeMessage';
import { IUserAvatar } from '../components/userAvatar/userAvatar';

export const IUserAvatarProps: IUserAvatar = {
  src: avatarEmpty,
  name: 'АвторНик',
  isDarkTheme: false,
};

export const ThemeCardProps: IThemeCard = {
  title: 'Тема 1',
  avatar: IUserAvatarProps,
  description: 'Описание темы',
  amountAnswer: 5,
  lastMessage: '09.02.2023 15:23',
};

export const ThemeMessageProps: IThemeMessage = {
  avatar: IUserAvatarProps,
  status: '1 час',
  message: 'Привет, мир!',
  countLikes: 10,
};
