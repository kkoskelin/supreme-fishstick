import { useAppState } from '../presenter/presenter';
import React from 'react';

import { LoadingTemplate } from '../views/LoadingTemplate';
import { Rankings } from '../views/Rankings';

export const CurrentPage = () => {
  const { currentPage } = useAppState();
  return (
    <>
      {currentPage == 'Rankings' && <Rankings />}
      {currentPage == 'Loading' && <LoadingTemplate />}
    </>
  );
};
