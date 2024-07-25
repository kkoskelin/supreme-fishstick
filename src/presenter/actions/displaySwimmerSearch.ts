import { Context } from '../presenter';
import { getLatestSwimRecordAndNamesAndData } from '../../fixtures/swimData';

export const displaySwimmerSearch = (context: Context) => {
  // load most recently-applied filters into the form.
  context.state.form.recordFilter = {
    ...context.state.recordFilter,
    year: '2024',
  };
  context.state.currentPage = 'SearchResults';
  loadSwimData(context);
};

const loadSwimData = (context: Context) => {
  const { latestSwimRecordDate, swimData, swimmerNames } =
    getLatestSwimRecordAndNamesAndData();
  context.state.swimData = swimData;
  context.state.latestSwimRecordDate = latestSwimRecordDate;
  context.state.swimmerNames = swimmerNames;
};
