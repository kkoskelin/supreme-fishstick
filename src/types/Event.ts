import { AgeClass } from './Age';
import { Distance } from './Distance';
import { Gender } from './Gender';
import { Stroke } from './Stroke';

export type Event = {
  ageClass: AgeClass;
  distance: Distance;
  gender: Gender;
  stroke: Stroke;
};
