import API, { LeaderBoardAPI } from '../api/leaderboard/leaderboard';
import { Leaderboard, LeaderboardGetAllResponse } from '../api/leaderboard/interfaces';
import { results } from '../api/leaderboard/mocs';
import { LeaderboardResults } from '../pages/leaderboard/leaderboard';

const isGetAllGoodResponse = (
  object: LeaderboardGetAllResponse
): object is Leaderboard => Array.isArray(object);

class LeaderboardController {
  private _api: LeaderBoardAPI;

  constructor() {
    this._api = API;
  }

  async add(data: LeaderboardResults[]) {
    try {
      const response = await this._api.add(data);
      if (response === 'OK') {
        return response;
      } else {
        console.log(response.reason);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      // TODO: Временно отправляем моки. В дальнейшем, отправлять результаты из игры
      void await this.add(results);
      const response = await this._api.getAll();

      if (isGetAllGoodResponse(response)) {
        return response[0].data.results;
      } else {
        console.log(response.reason);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new LeaderboardController();
