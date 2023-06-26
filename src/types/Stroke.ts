export const StrokeList = [
  'Back',
  'Breast',
  'Fly',
  'Free Relay',
  'Free',
  'IM',
  'Medley Relay',
] as const;

export type Stroke = (typeof StrokeList)[number];
