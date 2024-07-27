export enum SwimRecordIndex {
  AGE = 0,
  CONVERTED_TIME = 1,
  DATE = 2,
  DISPLAY_NAME = 3,
  EVENT = 4,
  PLACE = 5,
  TEAM = 6,
  WEEK_NUMBER = 7,
}

// define a type for the raw swim record data, an array containing a string and a number
export type RawSwimRecord = [
  number, // age
  number, // convertedTime
  string, // date
  string, // displayName
  number, // event
  number, // place
  string, // team
  number, // weekNumber
];
