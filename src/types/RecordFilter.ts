import { Distance } from './Distance';
import { Gender } from './Gender';
import { Stroke } from './Stroke';

export type RecordFilter = {
  ageMin?: string;
  ageMax?: string;
  beginYear?: string;
  endYear?: string;
  distance?: Distance;
  gender?: Gender;
  stroke?: Stroke;
  swimmerName?: string;
};
