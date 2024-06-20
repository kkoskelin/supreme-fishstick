import { useAppState } from '../presenter/presenter';
import React from 'react';

import { LoadingTemplate } from '../views/LoadingTemplate';
import { Rankings } from '../views/Rankings';
import { SwimmerSearch } from '../views/SwimmerSearch';

export const CurrentPage = () => {
  const { currentPage } = useAppState();
  return (
    <>
      {currentPage == 'Rankings' && <Rankings />}
      {currentPage == 'SwimmerSearch' && <SwimmerSearch />}
      {currentPage == 'Loading' && <LoadingTemplate />}
    </>
  );
};
