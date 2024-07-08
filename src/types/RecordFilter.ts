import { AgeClass } from './Age';
import { Distance } from './Distance';
import { Gender } from './Gender';
import { Stroke } from './Stroke';

export type RecordFilter = {
  ageMin?: string;
  ageMax?: string;
  ageClass?: AgeClass,
  beginYear?: string;
  bestTimesOnly?: boolean;
  endYear?: string;
  distance?: Distance;
  gender?: Gender;
  stroke?: Stroke;
  swimmerName?: string;
  team?: string;
};
