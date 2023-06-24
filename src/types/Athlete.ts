import { AthleteCategory } from './AthleteCategory';
import { Team } from './Team';

export type Athlete = {
  age: number;
  name: string;
  category: AthleteCategory;
  team: Team;
};
