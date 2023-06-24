import { Age } from './Age';
import { Distance } from './Distance';
import { Gender } from './Gender';
import { Stroke } from './Stroke';

export type Event = {
  ageRange: Age;
  distance: Distance;
  gender: Gender;
  stroke: Stroke;
};
