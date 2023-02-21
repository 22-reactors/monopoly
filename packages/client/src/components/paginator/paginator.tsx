import style from './paginator.module.scss';
import classNames from 'classnames';
import { useState } from 'react';

export interface IPaginator {
  pages: number[];
  isDarkMode?: boolean;
  pageHandler?(pageNumber: number): void;
}

export function Paginator(props: IPaginator) {
  const visiblePages = props.pages.slice(0, 3) as number[];
  const firstPage = props.pages.at(0) as number;
  const lastPage = props.pages.at(-1) as number;

  const [pages, setPages] = useState<number[]>(visiblePages);
  const [page, setPage] = useState<number>(firstPage);

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

          const firstVisiblePage = pages.at(0) as number;

          if (page > firstVisiblePage && page <= (pages.at(-1) as number)) {
            setPage((prevState) => prevState - 1);
            props.pageHandler?.(page - 1);
            return;
          }

          if (firstPage && page > firstPage && page === firstVisiblePage) {
            const newFirstPage = firstVisiblePage - 1;

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

          const lastVisiblePage = pages.at(-1);

          if (page !== lastVisiblePage) {
            setPage((prevState) => prevState + 1);
            props.pageHandler?.(page + 1);
            return;
          }

          if (lastPage && page < lastPage) {
            const newLastPage = lastVisiblePage + 1;

            setPage((prevState) => prevState + 1);
            setPages((prevState) => [...prevState.slice(1), newLastPage]);
            props.pageHandler?.(page + 1);
          }
      }}>Переход вперёд</a>
    </div>
  );
}
