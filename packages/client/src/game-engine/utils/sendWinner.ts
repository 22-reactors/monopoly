import LeaderboardController from '../../controllers/leaderboard';
import { LeaderboardResults } from '../../pages/leaderboard/leaderboard';

export const sendWinner = async (userName: string): Promise<void> => {
  const leaderboard: LeaderboardResults[] =
    (await LeaderboardController.getMonopolyResults()) ?? [];

  if (leaderboard.length > 0) {
    let userExists = false;
    //обновляем кол-во побед у существующего юзера
    leaderboard.forEach(u => {
      if (u.name === userName) {
        u.score += 1;
        userExists = true;
        return;
      }
    });

    //добавляем в текущий массив нового юзера, если его нету
    if (!userExists) {
      addNewUserToLeaderBoard(leaderboard, userName);
    }
    //Если массив пустой, инизиилизруем его
  } else {
    addNewUserToLeaderBoard(leaderboard, userName);
  }

  LeaderboardController.add(leaderboard);
};

//Счет по умолчанию 1 т.к. он победил 1 игру, но еще не был добавлен в таблицу лидеров
const addNewUserToLeaderBoard = (
  leaderboard: LeaderboardResults[],
  userName: string
): void => {
  const newUser: LeaderboardResults = { name: userName, score: 1 };
  leaderboard.push(newUser);
};
