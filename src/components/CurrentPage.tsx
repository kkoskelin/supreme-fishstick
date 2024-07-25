import { useAppState } from '../presenter/presenter';
import React from 'react';

import { LoadingTemplate } from '../views/LoadingTemplate';
import { SearchResults } from '../views/SearchResults';

export const CurrentPage = () => {
  const { currentPage } = useAppState();
  return (
    <>
      {currentPage == 'SwimmerSearch' && <SearchResults />}
      {currentPage == 'Loading' && <LoadingTemplate />}
    </>
  );
};
