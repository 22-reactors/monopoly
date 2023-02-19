import style from './paginator.module.scss';
import classNames from 'classnames'
import { useState } from 'react'

export interface IPaginator {
  pages?: number[];
  isDarkMode?: boolean;
  pageClickHandler?(pageNumber: number): void;
}

const DEFAULT_PAGES = [1, 2, 3];

export function Paginator(props: IPaginator) {
  const [pages, setPages] = useState(props.pages ?? DEFAULT_PAGES);
  const [page, setPage] = useState(1);

  return (
    <div className={classNames(style.container, props.isDarkMode && style.isDarkMode)}>
      <a href='#' className={classNames(style.arrow, style.arrowBack)} onClick={() => {
        if (page === 1) {
          return;
        }

        if (page !== pages[0]) {
          setPage((prevState) => prevState - 1);
          return;
        }

        const newFirstPage = pages[0] - 1;

        setPage((prevState) => prevState - 1);
        setPages((prevState) => [newFirstPage, ...prevState.slice(0, -1)]);
      }}>Переход назад</a>

      {pages.map((pageNumber, idx) =>
        <a href='#' key={idx} className={classNames(style.pageNumber, pageNumber === page && style.active)} onClick={() => {
          setPage(pageNumber);
          props.pageClickHandler?.(pageNumber);
        }}>
          {pageNumber}
        </a>
      )}

      <a href='#' className={classNames(style.arrow, style.arrowForward)} onClick={() => {
        if (page < 3) {
          setPage((prevState) => prevState + 1);
          return;
        }
        const newLastPage = pages[pages.length - 1] + 1;

        setPage((prevState) => prevState + 1);
        setPages((prevState) => [...prevState.slice(1), newLastPage]);
      }}>Переход вперёд</a>
    </div>
  );
}
