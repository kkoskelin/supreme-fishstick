export const ColumnNames = [
  'Age',
  'Converted Time',
  'Date',
  'Display Name',
  'EXH',
  'Event',
  'First Name',
  'Last Name',
  'League',
  'Place',
  'Team',
  'Time',
  'Week',
] as const;

export type Column = (typeof ColumnNames)[number];
