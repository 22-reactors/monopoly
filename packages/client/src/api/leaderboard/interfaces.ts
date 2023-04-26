import { LeaderboardResults } from '../../pages/leaderboard/leaderboard';
import { IBadResponse } from '../interfaces';

export type Leaderboard = [
  {
    data: {
      results: LeaderboardResults[];
      reactors: string;
    };
  }
];

export type LeaderboardResponse = 'OK' | IBadResponse;
export type LeaderboardGetAllResponse = Leaderboard | IBadResponse;
