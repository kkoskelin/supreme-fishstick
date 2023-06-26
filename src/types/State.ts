import { Form } from '../types/Form';
import { RecordFilter } from '../types/RecordFilter';
import { SwimRecord } from '../types/SwimRecord';

export type State = {
  currentPage: string;
  form: Form;
  recordFilter: RecordFilter;
  swimData: SwimRecord[];
  filteredRankings: SwimRecord[];
  hasSearchParameters: boolean;
};
