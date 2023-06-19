import { useAppState } from '../presenter/presenter';
import React from 'react';

import { LoadingTemplate } from '../views/LoadingTemplate';
import { RandomInfo } from './RandomInfo';
import { SplashTemplate } from '../views/SplashTemplate';

export const CurrentPage = () => {
  const { currentPage } = useAppState();
  return (
    <>
      {currentPage == 'Splash' && <SplashTemplate />}
      {currentPage == 'Loading' && <LoadingTemplate />}
      {currentPage == 'RandomInfo' && <RandomInfo />}
    </>
  );
};
