import style from './paginator.module.scss';
import classNames from 'classnames';
import { useMemo, useState } from 'react'

export interface IPaginator {
  pagesCount: number;
  className?: string;
  isDarkMode?: boolean;
  pageHandler?(pageNumber: number): void;
}

const LIMIT_VISIBLE_PAGES = 3;

export function Paginator(props: IPaginator) {
  const defaultVisiblePages = useMemo(() =>
    Array(props.pagesCount).fill(null).map((_, i) => i + 1),
    [props.pagesCount]);
  const visiblePages = defaultVisiblePages.slice(0, LIMIT_VISIBLE_PAGES);
  const firstPage = defaultVisiblePages.at(0);
  const lastPage = defaultVisiblePages.at(-1);

  const [pages, setPages] = useState<number[]>(visiblePages);
  const [page, setPage] = useState<number>(firstPage ?? 1);

  return (
    <div className={classNames(
      style.container,
      props.className,
      props.isDarkMode && style.isDarkMode)}>
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

          const firstVisiblePage = pages[0];

          if (page > firstVisiblePage && page <= pages[pages.length - 1]) {
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
