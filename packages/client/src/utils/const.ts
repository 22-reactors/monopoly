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
  game: {
    path: '/game',
    title: 'Игра',
  },
  setup: {
    path: '/setup',
    title: 'Играть',
  },
};

export const resourceURL = 'https://ya-praktikum.tech/api/v2/resources';
export const getYanderOAuthURL = (clientId: string) => {
  const { protocol, port } = window.location;
  const uri = `${protocol}//localhost:${port}`;

  return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${uri}`;
};
