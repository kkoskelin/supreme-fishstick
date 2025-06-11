import { Form } from '../types/Form';
import { FormattedSwimRecord } from './FormattedSwimRecord';
import { RawSwimRecord } from '../types/RawSwimRecord';
import { RecordFilter } from '../types/RecordFilter';

export type State = {
  currentPage: 'SearchResults' | 'Loading';
  form: Form;
  latestSwimRecordDate: string;
  recordFilter: RecordFilter;
  rawSwimData: RawSwimRecord[];
  swimSeasonYears: string[];
  swimmerNames: string[];
  filteredSwimRecords: FormattedSwimRecord[];
  hasSearchParameters: boolean;
};
