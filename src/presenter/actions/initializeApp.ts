import { Context } from '../presenter';

/**
 * Initialize the application by loading swim data from the configured gateway.
 * This is called on app startup and loads data asynchronously.
 */
export const initializeApp = async ({ state, effects }: Context) => {
  try {
    // Show loading state
    state.currentPage = 'Loading';

    // Load data from gateway (could be static JSON or API)
    const { latestSwimRecordDate, rawData, swimmerNames } =
      await effects.swimData.getLatestSwimRecordAndNamesAndData();

    // Update state with loaded data
    state.latestSwimRecordDate = latestSwimRecordDate;
    state.rawSwimData = rawData;
    state.swimmerNames = swimmerNames;

    // Show search page
    state.currentPage = 'SearchResults';
  } catch (error) {
    console.error('Failed to initialize app:', error);
    // Still show the UI, but with error state
    // In the future, could add an error page state
    state.currentPage = 'SearchResults';
  }
};
