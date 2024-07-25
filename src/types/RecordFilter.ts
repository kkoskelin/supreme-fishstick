import { AgeClass } from './Age';
import { Distance } from './Distance';
import { Gender } from './Gender';
import { Stroke } from './Stroke';

export type RecordFilter = {
  ageClass?: AgeClass;
  ageMax?: string;
  ageMin?: string;
  bestTimesPerEvent?: boolean;
  bestTimesPerSwimmer?: boolean;
  distance?: Distance;
  gender?: Gender;
  stroke?: Stroke;
  swimmerName?: string;
  team?: string;
  year?: string;
};
