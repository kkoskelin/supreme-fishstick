import { Context } from './presenter';
import page from 'page';

export const initializeRouter = (context: Context) => {
  page.base('');

  page('/', () => {
    return context.actions.displayRankings();
  });

  page('*', () => {
    window.document.querySelector('#app').innerHTML = 'Not found!';
  });

  page.start();
};
