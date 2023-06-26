import { Distance } from './Distance';
import { Gender } from './Gender';
import { Stroke } from './Stroke';

export type RecordFilter = {
  ageMin?: number;
  ageMax?: number;
  distance?: Distance;
  gender?: Gender;
  stroke?: Stroke;
  swimmerName?: string;
};
