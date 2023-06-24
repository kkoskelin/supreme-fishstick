export const TeamNames = [
  'Baraboo',
  'Cross Plains',
  'Mazomanie',
  'Mount Horeb',
  'Sauk Prairie',
  'Spring Green',
  'Sun Prairie',
  'Wisconsin Dells',
] as const;
export type Team = (typeof TeamNames)[number];
