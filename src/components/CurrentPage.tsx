import { useAppState } from '../presenter/presenter';
import React from 'react';

import { LoadingTemplate } from '../views/LoadingTemplate';
import { SearchResults } from '../views/SearchResults';

export const CurrentPage = () => {
  const { currentPage } = useAppState();
  console.log('currentPage:', currentPage);
  return (
    <>
      {currentPage == 'SearchResults' && <SearchResults />}
      {currentPage == 'Loading' && <LoadingTemplate />}
    </>
  );
};
