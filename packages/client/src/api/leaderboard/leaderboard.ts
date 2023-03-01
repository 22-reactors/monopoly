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
          results: data, reactors: ''
        },
        ratingFieldName: 'reactors',
        teamName: 'monopoly'
      }
    }) as Promise<LeaderboardResponse>;
  }

  getAll() {
    return this.post('/all', {
      data: {
        ratingFieldName: 'reactors',
        cursor: 0,
        limit: LIMIT,
      }
    }) as Promise<LeaderboardGetAllResponse>;
  }
}

export default new LeaderBoardAPI();
