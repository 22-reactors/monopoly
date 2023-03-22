import { IBadResponse } from '../auth/interfaces';
import { LeaderboardResults } from '../../pages/leaderboard/leaderboard';

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
