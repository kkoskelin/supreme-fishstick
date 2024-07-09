import { useAppState } from '../presenter/presenter';
import React from 'react';

import { LoadingTemplate } from '../views/LoadingTemplate';
import { Rankings } from '../views/Rankings';
import { SearchResults } from '../views/SearchResults';
import { SearchResultsResponsive } from '../views/SearchResultsResponsive';

export const CurrentPage = () => {
  const { currentPage } = useAppState();
  return (
    <>
      {currentPage == 'Rankings' && <Rankings />}
      {currentPage == 'SwimmerSearch' && <SearchResults />}
      {currentPage == 'SwimmerSearchResponsive' && <SearchResultsResponsive />}
      {currentPage == 'Loading' && <LoadingTemplate />}
    </>
  );
};
