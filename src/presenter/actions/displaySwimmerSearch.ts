import { Context } from '../presenter';
import { getLatestSwimRecordAndNamesAndData } from '../../fixtures/swimData';

export const displaySwimmerSearch = (context: Context) => {
  // load most recently-applied filters into the form.
  const currentYear = new Date().getFullYear().toString();
  context.state.form.recordFilter = {
    ...context.state.recordFilter,
    year: currentYear,
  };
  context.state.currentPage = 'SearchResults';
  loadSwimData(context);
};

const loadSwimData = (context: Context) => {
  const { latestSwimRecordDate, rawData, swimmerNames } =
    getLatestSwimRecordAndNamesAndData();
  context.state.rawSwimData = rawData;
  context.state.latestSwimRecordDate = latestSwimRecordDate;
  context.state.swimmerNames = swimmerNames;
};
