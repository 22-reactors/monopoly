import style from './paginator.module.scss';
import classNames from 'classnames';
import { useState } from 'react';

export interface IPaginator {
  pages?: number[];
  isDarkMode?: boolean;
  pageHandler?(pageNumber: number): void;
}

const DEFAULT_PAGES = [1, 2, 3];

export function Paginator(props: IPaginator) {
  const [pages, setPages] = useState(DEFAULT_PAGES);
  const [page, setPage] = useState(1);

  const firstPage = props.pages?.at(0) ?? pages.at(0);
  const lastPage = props.pages?.at(-1) ?? pages.at(-1);

  return (
    <div className={classNames(style.container, props.isDarkMode && style.isDarkMode)}>
      <a
        href='#'
        className={classNames(
          style.arrow,
          style.arrowBack,
          page === firstPage && style.disabled
        )}
        onClick={() => {
          if (page === firstPage) {
            return;
          }

          const firstPagesNumber = pages.at(0)!;

          if (page > firstPagesNumber && page <= pages.at(-1)!) {
            setPage((prevState) => prevState - 1);
            props.pageHandler?.(page - 1);
            return;
          }

          if (firstPage && page > firstPage && page === firstPagesNumber) {
            const newFirstPage = firstPagesNumber - 1;

            setPage((prevState) => prevState - 1);
            setPages((prevState) => [newFirstPage, ...prevState.slice(0, -1)]);
            props.pageHandler?.(page - 1);
          }
      }}>Переход назад</a>

      {pages.map((pageNumber, idx) =>
        <a href='#' key={idx} className={classNames(style.pageNumber, pageNumber === page && style.active)} onClick={() => {
          setPage(pageNumber);
          props.pageHandler?.(pageNumber);
        }}>
          {pageNumber}
        </a>
      )}

      <a
        href='#'
        className={classNames(
          style.arrow,
          style.arrowForward,
          page === lastPage && style.disabled
        )}
        onClick={() => {
          if (page === lastPage) {
            return;
          }

          const lastPagesNumber = pages.at(-1);

          if (page !== lastPagesNumber) {
            setPage((prevState) => prevState + 1);
            props.pageHandler?.(page + 1);
            return;
          }

          if (lastPage && page < lastPage) {
            const newLastPage = lastPagesNumber + 1;

            setPage((prevState) => prevState + 1);
            setPages((prevState) => [...prevState.slice(1), newLastPage]);
            props.pageHandler?.(page + 1);
          }
      }}>Переход вперёд</a>
    </div>
  );
}
