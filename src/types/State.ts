import { Form } from '../types/Form';
import { RecordFilter } from '../types/RecordFilter';
import { SwimRecord } from '../types/SwimRecord';

export type State = {
  currentPage: string;
  form: Form;
  latestSwimRecordDate: string;
  recordFilter: RecordFilter;
  swimData: SwimRecord[];
  swimmerNames: string[];
  filteredRankings: SwimRecord[];
  hasSearchParameters: boolean;
};
