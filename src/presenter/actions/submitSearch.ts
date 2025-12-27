import { Context } from '../presenter';
import { isUndefined, omitBy } from 'lodash';

export const submitSearch = async (context: Context) => {
  // Update the record filter from form
  context.state.recordFilter = omitBy(
    context.state.form.recordFilter,
    isUndefined,
  );

  // Fetch records from API with the current filters
  try {
    const filter = {
      swimmerName: context.state.recordFilter.swimmerName,
      team: context.state.recordFilter.team,
      year: context.state.recordFilter.year,
      limit: 10000, // Get more results for filtering
    };

    // Only fetch if there are actual filter values
    if (filter.swimmerName || filter.team || filter.year) {
      const records = await context.effects.swimData.fetchSwimRecords(filter);
      context.state.rawSwimData = records;
    } else {
      // If no filters, clear the data (user needs to search for something)
      context.state.rawSwimData = [];
    }
  } catch (error) {
    console.error('Failed to fetch swim records:', error);
    // Keep existing data on error
  }
};
