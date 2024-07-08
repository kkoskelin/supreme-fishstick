import { AgeClass } from '../types/Age';
import { Distance } from '../types/Distance';
import { Event } from '../types/Event';
import { Gender } from '../types/Gender';
import { Stroke } from '../types/Stroke';

export const EVENT_MAP: Record<number, Event> = {
  /*
  1: {
    ageClass: '8 & U',
    distance: '100M',
    gender: 'Girls',
    stroke: 'Medley Relay',
  },
  2: {
    ageClass: '8 & U',
    distance: '100M',
    gender: 'Boys',
    stroke: 'Medley Relay',
  },
  3: {
    ageClass: '9-10',
    distance: '200M',
    gender: 'Girls',
    stroke: 'Medley Relay',
  },
  4: {
    ageClass: '9-10',
    distance: '200M',
    gender: 'Boys',
    stroke: 'Medley Relay',
  },
  5: {
    ageClass: '11-12',
    distance: '200M',
    gender: 'Girls',
    stroke: 'Medley Relay',
  },
  6: {
    ageClass: '11-12',
    distance: '200M',
    gender: 'Boys',
    stroke: 'Medley Relay',
  },
  7: {
    ageClass: '13-14',
    distance: '200M',
    gender: 'Girls',
    stroke: 'Medley Relay',
  },
  8: {
    ageClass: '13-14',
    distance: '200M',
    gender: 'Boys',
    stroke: 'Medley Relay',
  },
  9: {
    ageClass: '15-18',
    distance: '200M',
    gender: 'Girls',
    stroke: 'Medley Relay',
  },
  10: {
    ageClass: '15-18',
    distance: '200M',
    gender: 'Boys',
    stroke: 'Medley Relay',
  },*/
  11: {
    ageClass: '8 & U',
    distance: '25M',
    gender: 'Girls',
    stroke: 'Free',
  },
  12: {
    ageClass: '8 & U',
    distance: '25M',
    gender: 'Boys',
    stroke: 'Free',
  },
  13: {
    ageClass: '9-10',
    distance: '50M',
    gender: 'Girls',
    stroke: 'Free',
  },
  14: {
    ageClass: '9-10',
    distance: '50M',
    gender: 'Boys',
    stroke: 'Free',
  },
  15: {
    ageClass: '11-12',
    distance: '50M',
    gender: 'Girls',
    stroke: 'Free',
  },
  16: {
    ageClass: '11-12',
    distance: '50M',
    gender: 'Boys',
    stroke: 'Free',
  },
  17: {
    ageClass: '13-14',
    distance: '50M',
    gender: 'Girls',
    stroke: 'Free',
  },
  18: {
    ageClass: '13-14',
    distance: '50M',
    gender: 'Boys',
    stroke: 'Free',
  },
  19: {
    ageClass: '15-18',
    distance: '50M',
    gender: 'Girls',
    stroke: 'Free',
  },
  20: {
    ageClass: '15-18',
    distance: '50M',
    gender: 'Boys',
    stroke: 'Free',
  },
  21: {
    ageClass: '8 & U',
    distance: '25M',
    gender: 'Girls',
    stroke: 'Back',
  },
  22: {
    ageClass: '8 & U',
    distance: '25M',
    gender: 'Boys',
    stroke: 'Back',
  },
  23: {
    ageClass: '9-10',
    distance: '50M',
    gender: 'Girls',
    stroke: 'Back',
  },
  24: {
    ageClass: '9-10',
    distance: '50M',
    gender: 'Boys',
    stroke: 'Back',
  },
  25: {
    ageClass: '11-12',
    distance: '50M',
    gender: 'Girls',
    stroke: 'Back',
  },
  26: {
    ageClass: '11-12',
    distance: '50M',
    gender: 'Boys',
    stroke: 'Back',
  },
  27: {
    ageClass: '13-14',
    distance: '50M',
    gender: 'Girls',
    stroke: 'Back',
  },
  28: {
    ageClass: '13-14',
    distance: '50M',
    gender: 'Boys',
    stroke: 'Back',
  },
  29: {
    ageClass: '15-18',
    distance: '50M',
    gender: 'Girls',
    stroke: 'Back',
  },
  30: {
    ageClass: '15-18',
    distance: '50M',
    gender: 'Boys',
    stroke: 'Back',
  },
  31: {
    ageClass: '9-10',
    distance: '100M',
    gender: 'Girls',
    stroke: 'IM',
  },
  32: {
    ageClass: '9-10',
    distance: '100M',
    gender: 'Boys',
    stroke: 'IM',
  },
  33: {
    ageClass: '11-12',
    distance: '100M',
    gender: 'Girls',
    stroke: 'IM',
  },
  34: {
    ageClass: '11-12',
    distance: '100M',
    gender: 'Boys',
    stroke: 'IM',
  },
  35: {
    ageClass: '13-14',
    distance: '100M',
    gender: 'Girls',
    stroke: 'IM',
  },
  36: {
    ageClass: '13-14',
    distance: '100M',
    gender: 'Boys',
    stroke: 'IM',
  },
  37: {
    ageClass: '15-18',
    distance: '100M',
    gender: 'Girls',
    stroke: 'IM',
  },
  38: {
    ageClass: '15-18',
    distance: '100M',
    gender: 'Boys',
    stroke: 'IM',
  },
  39: {
    ageClass: '8 & U',
    distance: '25M',
    gender: 'Girls',
    stroke: 'Breast',
  },
  40: {
    ageClass: '8 & U',
    distance: '25M',
    gender: 'Boys',
    stroke: 'Breast',
  },
  41: {
    ageClass: '9-10',
    distance: '50M',
    gender: 'Girls',
    stroke: 'Breast',
  },
  42: {
    ageClass: '9-10',
    distance: '50M',
    gender: 'Boys',
    stroke: 'Breast',
  },
  43: {
    ageClass: '11-12',
    distance: '50M',
    gender: 'Girls',
    stroke: 'Breast',
  },
  44: {
    ageClass: '11-12',
    distance: '50M',
    gender: 'Boys',
    stroke: 'Breast',
  },
  45: {
    ageClass: '13-14',
    distance: '50M',
    gender: 'Girls',
    stroke: 'Breast',
  },
  46: {
    ageClass: '13-14',
    distance: '50M',
    gender: 'Boys',
    stroke: 'Breast',
  },
  47: {
    ageClass: '15-18',
    distance: '50M',
    gender: 'Girls',
    stroke: 'Breast',
  },
  48: {
    ageClass: '15-18',
    distance: '50M',
    gender: 'Boys',
    stroke: 'Breast',
  },
  49: {
    ageClass: '8 & U',
    distance: '50M',
    gender: 'Girls',
    stroke: 'Free',
  },
  50: {
    ageClass: '8 & U',
    distance: '50M',
    gender: 'Boys',
    stroke: 'Free',
  },
  51: {
    ageClass: '9-10',
    distance: '100M',
    gender: 'Girls',
    stroke: 'Free',
  },
  52: {
    ageClass: '9-10',
    distance: '100M',
    gender: 'Boys',
    stroke: 'Free',
  },
  53: {
    ageClass: '11-12',
    distance: '100M',
    gender: 'Girls',
    stroke: 'Free',
  },
  54: {
    ageClass: '11-12',
    distance: '100M',
    gender: 'Boys',
    stroke: 'Free',
  },
  55: {
    ageClass: '13-14',
    distance: '200M',
    gender: 'Girls',
    stroke: 'Free',
  },
  56: {
    ageClass: '13-14',
    distance: '200M',
    gender: 'Boys',
    stroke: 'Free',
  },
  57: {
    ageClass: '15-18',
    distance: '200M',
    gender: 'Girls',
    stroke: 'Free',
  },
  58: {
    ageClass: '15-18',
    distance: '200M',
    gender: 'Boys',
    stroke: 'Free',
  },
  59: {
    ageClass: '8 & U',
    distance: '25M',
    gender: 'Girls',
    stroke: 'Fly',
  },
  60: {
    ageClass: '8 & U',
    distance: '25M',
    gender: 'Boys',
    stroke: 'Fly',
  },
  61: {
    ageClass: '9-10',
    distance: '50M',
    gender: 'Girls',
    stroke: 'Fly',
  },
  62: {
    ageClass: '9-10',
    distance: '50M',
    gender: 'Boys',
    stroke: 'Fly',
  },
  63: {
    ageClass: '11-12',
    distance: '50M',
    gender: 'Girls',
    stroke: 'Fly',
  },
  64: {
    ageClass: '11-12',
    distance: '50M',
    gender: 'Boys',
    stroke: 'Fly',
  },
  65: {
    ageClass: '13-14',
    distance: '50M',
    gender: 'Girls',
    stroke: 'Fly',
  },
  66: {
    ageClass: '13-14',
    distance: '50M',
    gender: 'Boys',
    stroke: 'Fly',
  },
  67: {
    ageClass: '15-18',
    distance: '50M',
    gender: 'Girls',
    stroke: 'Fly',
  },
  68: {
    ageClass: '15-18',
    distance: '50M',
    gender: 'Boys',
    stroke: 'Fly',
  },
  /*
  69: {
    ageClass: '8 & U',
    distance: '100M',
    gender: 'Girls',
    stroke: 'Free Relay',
  },
  70: {
    ageClass: '8 & U',
    distance: '100M',
    gender: 'Boys',
    stroke: 'Free Relay',
  },
  71: {
    ageClass: '9-10',
    distance: '200M',
    gender: 'Girls',
    stroke: 'Free Relay',
  },
  72: {
    ageClass: '9-10',
    distance: '200M',
    gender: 'Boys',
    stroke: 'Free Relay',
  },
  73: {
    ageClass: '11-12',
    distance: '200M',
    gender: 'Girls',
    stroke: 'Free Relay',
  },
  74: {
    ageClass: '11-12',
    distance: '200M',
    gender: 'Boys',
    stroke: 'Free Relay',
  },
  75: {
    ageClass: '13-14',
    distance: '200M',
    gender: 'Girls',
    stroke: 'Free Relay',
  },
  76: {
    ageClass: '13-14',
    distance: '200M',
    gender: 'Boys',
    stroke: 'Free Relay',
  },
  77: {
    ageClass: '15-18',
    distance: '200M',
    gender: 'Girls',
    stroke: 'Free Relay',
  },
  78: {
    ageClass: '15-18',
    distance: '200M',
    gender: 'Boys',
    stroke: 'Free Relay',
  },*/
} as const;

export const EVENTS_BY_STROKE: Record<Stroke, string[]> = {} as Record<
  Stroke,
  string[]
>;
export const EVENTS_BY_DISTANCE: Record<Distance, string[]> = {} as Record<
  Distance,
  string[]
>;
export const EVENTS_BY_GENDER: Record<Gender, string[]> = {} as Record<
  Gender,
  string[]
>;
export const EVENTS_BY_AGE_CLASS: Record<string, string[]> = {} as Record<AgeClass, string[]>;

for (const [eventNumber, eventDetails] of Object.entries(EVENT_MAP)) {
  EVENTS_BY_STROKE[eventDetails.stroke] ??= [];
  EVENTS_BY_STROKE[eventDetails.stroke].push(eventNumber);

  EVENTS_BY_DISTANCE[eventDetails.distance] ??= [];
  EVENTS_BY_DISTANCE[eventDetails.distance].push(eventNumber);

  EVENTS_BY_GENDER[eventDetails.gender] ??= [];
  EVENTS_BY_GENDER[eventDetails.gender].push(eventNumber);

  EVENTS_BY_AGE_CLASS[eventDetails.ageClass] ??= [];
  EVENTS_BY_AGE_CLASS[eventDetails.ageClass].push(eventNumber);
}
