export const TeamNames = [
  'Baraboo',
  'Cross Plains',
  'Mazomanie',
  'Mt. Horeb',
  'Sauk Prairie',
  'Spring Green',
  'Sun Prairie',
  'Wis. Dells',
] as const;

export const TeamKeyMap: Record<string, (typeof TeamNames)[number]> = {
  B: 'Baraboo',
  C: 'Cross Plains',
  G: 'Spring Green',
  H: 'Mt. Horeb',
  K: 'Sauk Prairie',
  M: 'Mazomanie',
  P: 'Sun Prairie',
  W: 'Wis. Dells',
};
export type Team = (typeof TeamNames)[number];
