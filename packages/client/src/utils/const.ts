import { isServer } from "./helpers";

export const links = {
  root: {
    path: '/',
    title: 'Главная',
  },
  login: {
    path: '/login',
    title: 'Войти',
  },
  signup: {
    path: '/signup',
    title: 'Регистрация',
  },
  profile: {
    path: '/profile',
    title: 'Профиль',
  },
  leaderboard: {
    path: '/leaderboard',
    title: 'Лидеры',
  },
  forum: {
    path: '/forum',
    title: 'Форум',
  },
  forumsection1: {
    path: '/forum/section/1',
    title: 'Форум/Раздел1',
  },
  forumtopic1: {
    path: '/forum/section/1/topic/1',
    title: 'Форум/Раздел1/Тема1',
  },
  CreateTopic:{
    path: '/forum/CreateTopic',
    title: 'Создать тему',
  },
  ThemeMessage:{
    path: '/forum/ThemeMessage',
    title: 'Отправить',
  },
  game: {
    path: '/game',
    title: 'Игра',
  },
  setup: {
    path: '/setup',
    title: 'Играть',
  },
};

export const HOST = `http://localhost:${
  !isServer ? __SERVER_PORT__ : process.env.SERVER_PORT
}`;

export const resourceURL = `${HOST}/api/v2/resources`;
