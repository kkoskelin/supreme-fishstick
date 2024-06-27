import { Context } from './presenter';
import page from 'page';

export const initializeRouter = (context: Context) => {
  page.base('');

  page('/', () => {
    return context.actions.displaySwimmerSearch();
  });

  page('/swimmer', context.actions.displaySwimmerSearch);

  page('/event', context.actions.displayRankings);

  page('*', () => {
    const app = window.document.querySelector('#app');
    if (app) {
      app.innerHTML = 'Not found!';
    }
  });

  page.start();
};
