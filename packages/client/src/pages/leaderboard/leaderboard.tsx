import style from './leaderboard.module.scss';
import { Paginator } from '../../components/paginator/paginator';
import { useCallback, useEffect, useState } from 'react';
import { getSeparateArray } from '../../utils/helpers';
import LeaderboardController from '../../controllers/leaderboard';

const LIMIT_ITEMS_ON_PAGE = 5;

export function Leaderboard() {
  const [page, setPage] = useState(1);
  const [results, setResults] = useState<LeaderboardResults[][] | []>([]);

  const getResults = useCallback(async () => {
    const leaderboard: LeaderboardResults[] = await LeaderboardController.getAll() ?? [];
    const totalCountPage = Math.ceil(leaderboard.length / LIMIT_ITEMS_ON_PAGE);
    const sortUsersResults = sortResult(leaderboard);
    const usersResults = getSeparateArray<LeaderboardResults>(sortUsersResults, totalCountPage, LIMIT_ITEMS_ON_PAGE);

    setResults(usersResults);
  }, []);

  useEffect(() => {
    getResults().catch(console.error);
  }, [getResults]);

  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>Таблица лидеров</h2>
      <table className={style.board}>
        <thead>
          <tr>
            <th className={style.headerCell}>
              <span className={style.caption}>Имя</span>
            </th>
            <th className={style.headerCell}>
              <span className={style.caption}>Побед</span>
            </th>
          </tr>
        </thead>
        <tbody>
        {results.length ? getUsersResults(results[page - 1]) : <></>}
        </tbody>
      </table>
      {results.length > 1 && (
        <Paginator
          className={style.paginator}
          pagesCount={results.length}
          pageHandler={(page) => {
              setPage(page);
            }
          }
        />
      )}
    </div>
  );
}

export type LeaderboardResults = {
  name: string;
  score: string;
};

function getUsersResults(results: LeaderboardResults[]) {
  return (
    <>
      {results.map(({name, score}, idx) => (
        <tr key={idx}>
          <td className={style.contentCell}><span className={style.text}>{name}</span></td>
          <td className={style.contentCell}><span className={style.text}>{score}</span></td>
        </tr>
      ))}
    </>
  );
}

function sortResult(results: LeaderboardResults[]): LeaderboardResults[] {
  return results.sort((a, b) => Number(b.score) - Number(a.score));
}
