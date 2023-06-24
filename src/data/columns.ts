import { Column } from '../types/Column';

export const columnSort: Record<Column, boolean> = {
  Age: true,
  'Converted Time': true,
  Date: true,
  'Display Name': true,
  EXH: false,
  Event: true,
  'First Name': true,
  'Last Name': true,
  League: false,
  Place: true,
  Team: true,
  Time: true,
  Week: true,
};

export const RankColumnConfig: Column[] = [
  'Time',
  'Last Name',
  'First Name',
  'Age',
  'Team',
  'Date',
];
