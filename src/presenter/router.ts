import { Context } from './presenter';
import page from 'page';

export const initializeRouter = (context: Context) => {
  page.base('');

  page('*', context.actions.displaySwimmerSearch);

  page.start();
};
