export const DistanceList = [
  '25M',
  '50M',
  '100M',
  '200M',
] as const;
export type Distance = (typeof DistanceList)[number];
