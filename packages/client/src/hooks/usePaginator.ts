import { useState } from 'react';

export const usePaginator = (initialValue = 1) => {
  const [page, setPage] = useState(initialValue);

  const showPage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return [page, showPage] as const;
};
