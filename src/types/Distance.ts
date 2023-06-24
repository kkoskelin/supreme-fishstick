export const DistanceList = [
  '25 Meter',
  '50 Meter',
  '100 Meter',
  '200 Meter',
] as const;
export type Distance = (typeof DistanceList)[number];
