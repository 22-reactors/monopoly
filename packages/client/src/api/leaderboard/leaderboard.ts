import RequestTransport from '../../service/request/request';
import { LeaderboardGetAllResponse, LeaderboardResponse } from './interfaces';
import { LeaderboardResults } from '../../pages/leaderboard/leaderboard';

const LIMIT = 100;

export class LeaderBoardAPI extends RequestTransport {
  constructor() {
    super('/leaderboard');
  }

  add(data: LeaderboardResults[]) {
    return this.post('', {
      data: {
        data: {
          results: data,
          leaderboardVersion: this.getVersion(data),
        },
        ratingFieldName: 'leaderboardVersion',
        teamName: 'monopoly',
      },
    }) as Promise<LeaderboardResponse>;
  }

  getMonopolyResults() {
    return this.post('/monopoly', {
      data: {
        ratingFieldName: 'leaderboardVersion',
        cursor: 0,
        limit: LIMIT,
      },
    }) as Promise<LeaderboardGetAllResponse>;
  }

  //в REST API данные обновляются только если ratingFieldName имеет значение выше предыдущего
  //т.к. у нас массив юзеров и каждого свой счетик побед, а поле ratingFieldName одно, то
  //было принято решение, что ratingFieldName - сумма очком всех игроков
  private getVersion = (data: LeaderboardResults[]) => {
    //инициализация
    if (data.length === 0) {
      return 0;
    }
    return data.map(userResult => userResult.score)
      .reduce((acc, userScore) => acc + userScore, 0);
  };
}

export default new LeaderBoardAPI();
