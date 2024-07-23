import { Context } from './presenter';
import page from 'page';

export const initializeRouter = (context: Context) => {
  page.base('');

  page('/', context.actions.displaySwimmerSearchResponsive);

  page('/responsive', context.actions.displaySwimmerSearchResponsive);

  page('/event', context.actions.displayRankings);

  // page('*', () => {
  //   const app = window.document.querySelector('#app');
  //   if (app) {
  //     app.innerHTML = 'Not found!';
  //   }
  // });

  page('*', context.actions.displaySwimmerSearchResponsive);

  page.start();
};
