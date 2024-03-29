import API, { LeaderBoardAPI } from '../api/leaderboard/leaderboard';
import {
  Leaderboard,
  LeaderboardGetAllResponse,
} from '../api/leaderboard/interfaces';
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

  async getMonopolyResults() {
    try {
      const response = await this._api.getMonopolyResults();

      if (isGetAllGoodResponse(response)) {
        return response[0]?.data.results;
      } else {
        console.log(response.reason);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new LeaderboardController();
