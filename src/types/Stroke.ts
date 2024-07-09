export const StrokeList = [
  'Back',
  'Breast',
  'Fly',
  'Free',
  'IM',
] as const;

export type Stroke = (typeof StrokeList)[number];
