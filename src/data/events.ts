import { Distance } from '../types/Distance';
import { Event } from '../types/Event';
import { Gender } from '../types/Gender';
import { Stroke } from '../types/Stroke';

export const EVENT_MAP: Record<number, Event> = {
  1: {
    ageRange: '8 & U',
    distance: '100 Meter',
    gender: 'Girls',
    stroke: 'Medley Relay',
  },
  2: {
    ageRange: '8 & U',
    distance: '100 Meter',
    gender: 'Boys',
    stroke: 'Medley Relay',
  },
  3: {
    ageRange: '9-10',
    distance: '200 Meter',
    gender: 'Girls',
    stroke: 'Medley Relay',
  },
  4: {
    ageRange: '9-10',
    distance: '200 Meter',
    gender: 'Boys',
    stroke: 'Medley Relay',
  },
  5: {
    ageRange: '11-12',
    distance: '200 Meter',
    gender: 'Girls',
    stroke: 'Medley Relay',
  },
  6: {
    ageRange: '11-12',
    distance: '200 Meter',
    gender: 'Boys',
    stroke: 'Medley Relay',
  },
  7: {
    ageRange: '13-14',
    distance: '200 Meter',
    gender: 'Girls',
    stroke: 'Medley Relay',
  },
  8: {
    ageRange: '13-14',
    distance: '200 Meter',
    gender: 'Boys',
    stroke: 'Medley Relay',
  },
  9: {
    ageRange: '15-18',
    distance: '200 Meter',
    gender: 'Girls',
    stroke: 'Medley Relay',
  },
  10: {
    ageRange: '15-18',
    distance: '200 Meter',
    gender: 'Boys',
    stroke: 'Medley Relay',
  },
  11: {
    ageRange: '8 & U',
    distance: '25 Meter',
    gender: 'Girls',
    stroke: 'Free',
  },
  12: {
    ageRange: '8 & U',
    distance: '25 Meter',
    gender: 'Boys',
    stroke: 'Free',
  },
  13: {
    ageRange: '9-10',
    distance: '50 Meter',
    gender: 'Girls',
    stroke: 'Free',
  },
  14: {
    ageRange: '9-10',
    distance: '50 Meter',
    gender: 'Boys',
    stroke: 'Free',
  },
  15: {
    ageRange: '11-12',
    distance: '50 Meter',
    gender: 'Girls',
    stroke: 'Free',
  },
  16: {
    ageRange: '11-12',
    distance: '50 Meter',
    gender: 'Boys',
    stroke: 'Free',
  },
  17: {
    ageRange: '13-14',
    distance: '50 Meter',
    gender: 'Girls',
    stroke: 'Free',
  },
  18: {
    ageRange: '13-14',
    distance: '50 Meter',
    gender: 'Boys',
    stroke: 'Free',
  },
  19: {
    ageRange: '15-18',
    distance: '50 Meter',
    gender: 'Girls',
    stroke: 'Free',
  },
  20: {
    ageRange: '15-18',
    distance: '50 Meter',
    gender: 'Boys',
    stroke: 'Free',
  },
  21: {
    ageRange: '8 & U',
    distance: '25 Meter',
    gender: 'Girls',
    stroke: 'Back',
  },
  22: {
    ageRange: '8 & U',
    distance: '25 Meter',
    gender: 'Boys',
    stroke: 'Back',
  },
  23: {
    ageRange: '9-10',
    distance: '50 Meter',
    gender: 'Girls',
    stroke: 'Back',
  },
  24: {
    ageRange: '9-10',
    distance: '50 Meter',
    gender: 'Boys',
    stroke: 'Back',
  },
  25: {
    ageRange: '11-12',
    distance: '50 Meter',
    gender: 'Girls',
    stroke: 'Back',
  },
  26: {
    ageRange: '11-12',
    distance: '50 Meter',
    gender: 'Boys',
    stroke: 'Back',
  },
  27: {
    ageRange: '13-14',
    distance: '50 Meter',
    gender: 'Girls',
    stroke: 'Back',
  },
  28: {
    ageRange: '13-14',
    distance: '50 Meter',
    gender: 'Boys',
    stroke: 'Back',
  },
  29: {
    ageRange: '15-18',
    distance: '50 Meter',
    gender: 'Girls',
    stroke: 'Back',
  },
  30: {
    ageRange: '15-18',
    distance: '50 Meter',
    gender: 'Boys',
    stroke: 'Back',
  },
  31: {
    ageRange: '9-10',
    distance: '100 Meter',
    gender: 'Girls',
    stroke: 'IM',
  },
  32: {
    ageRange: '9-10',
    distance: '100 Meter',
    gender: 'Boys',
    stroke: 'IM',
  },
  33: {
    ageRange: '11-12',
    distance: '100 Meter',
    gender: 'Girls',
    stroke: 'IM',
  },
  34: {
    ageRange: '11-12',
    distance: '100 Meter',
    gender: 'Boys',
    stroke: 'IM',
  },
  35: {
    ageRange: '13-14',
    distance: '100 Meter',
    gender: 'Girls',
    stroke: 'IM',
  },
  36: {
    ageRange: '13-14',
    distance: '100 Meter',
    gender: 'Boys',
    stroke: 'IM',
  },
  37: {
    ageRange: '15-18',
    distance: '100 Meter',
    gender: 'Girls',
    stroke: 'IM',
  },
  38: {
    ageRange: '15-18',
    distance: '100 Meter',
    gender: 'Boys',
    stroke: 'IM',
  },
  39: {
    ageRange: '8 & U',
    distance: '25 Meter',
    gender: 'Girls',
    stroke: 'Breast',
  },
  40: {
    ageRange: '8 & U',
    distance: '25 Meter',
    gender: 'Boys',
    stroke: 'Breast',
  },
  41: {
    ageRange: '9-10',
    distance: '50 Meter',
    gender: 'Girls',
    stroke: 'Breast',
  },
  42: {
    ageRange: '9-10',
    distance: '50 Meter',
    gender: 'Boys',
    stroke: 'Breast',
  },
  43: {
    ageRange: '11-12',
    distance: '50 Meter',
    gender: 'Girls',
    stroke: 'Breast',
  },
  44: {
    ageRange: '11-12',
    distance: '50 Meter',
    gender: 'Boys',
    stroke: 'Breast',
  },
  45: {
    ageRange: '13-14',
    distance: '50 Meter',
    gender: 'Girls',
    stroke: 'Breast',
  },
  46: {
    ageRange: '13-14',
    distance: '50 Meter',
    gender: 'Boys',
    stroke: 'Breast',
  },
  47: {
    ageRange: '15-18',
    distance: '50 Meter',
    gender: 'Girls',
    stroke: 'Breast',
  },
  48: {
    ageRange: '15-18',
    distance: '50 Meter',
    gender: 'Boys',
    stroke: 'Breast',
  },
  49: {
    ageRange: '8 & U',
    distance: '50 Meter',
    gender: 'Girls',
    stroke: 'Free',
  },
  50: {
    ageRange: '8 & U',
    distance: '50 Meter',
    gender: 'Boys',
    stroke: 'Free',
  },
  51: {
    ageRange: '9-10',
    distance: '100 Meter',
    gender: 'Girls',
    stroke: 'Free',
  },
  52: {
    ageRange: '9-10',
    distance: '100 Meter',
    gender: 'Boys',
    stroke: 'Free',
  },
  53: {
    ageRange: '11-12',
    distance: '100 Meter',
    gender: 'Girls',
    stroke: 'Free',
  },
  54: {
    ageRange: '11-12',
    distance: '100 Meter',
    gender: 'Boys',
    stroke: 'Free',
  },
  55: {
    ageRange: '13-14',
    distance: '200 Meter',
    gender: 'Girls',
    stroke: 'Free',
  },
  56: {
    ageRange: '13-14',
    distance: '200 Meter',
    gender: 'Boys',
    stroke: 'Free',
  },
  57: {
    ageRange: '15-18',
    distance: '200 Meter',
    gender: 'Girls',
    stroke: 'Free',
  },
  58: {
    ageRange: '15-18',
    distance: '200 Meter',
    gender: 'Boys',
    stroke: 'Free',
  },
  59: {
    ageRange: '8 & U',
    distance: '25 Meter',
    gender: 'Girls',
    stroke: 'Fly',
  },
  60: {
    ageRange: '8 & U',
    distance: '25 Meter',
    gender: 'Boys',
    stroke: 'Fly',
  },
  61: {
    ageRange: '9-10',
    distance: '50 Meter',
    gender: 'Girls',
    stroke: 'Fly',
  },
  62: {
    ageRange: '9-10',
    distance: '50 Meter',
    gender: 'Boys',
    stroke: 'Fly',
  },
  63: {
    ageRange: '11-12',
    distance: '50 Meter',
    gender: 'Girls',
    stroke: 'Fly',
  },
  64: {
    ageRange: '11-12',
    distance: '50 Meter',
    gender: 'Boys',
    stroke: 'Fly',
  },
  65: {
    ageRange: '13-14',
    distance: '50 Meter',
    gender: 'Girls',
    stroke: 'Fly',
  },
  66: {
    ageRange: '13-14',
    distance: '50 Meter',
    gender: 'Boys',
    stroke: 'Fly',
  },
  67: {
    ageRange: '15-18',
    distance: '50 Meter',
    gender: 'Girls',
    stroke: 'Fly',
  },
  68: {
    ageRange: '15-18',
    distance: '50 Meter',
    gender: 'Boys',
    stroke: 'Fly',
  },
  69: {
    ageRange: '8 & U',
    distance: '100 Meter',
    gender: 'Girls',
    stroke: 'Free Relay',
  },
  70: {
    ageRange: '8 & U',
    distance: '100 Meter',
    gender: 'Boys',
    stroke: 'Free Relay',
  },
  71: {
    ageRange: '9-10',
    distance: '200 Meter',
    gender: 'Girls',
    stroke: 'Free Relay',
  },
  72: {
    ageRange: '9-10',
    distance: '200 Meter',
    gender: 'Boys',
    stroke: 'Free Relay',
  },
  73: {
    ageRange: '11-12',
    distance: '200 Meter',
    gender: 'Girls',
    stroke: 'Free Relay',
  },
  74: {
    ageRange: '11-12',
    distance: '200 Meter',
    gender: 'Boys',
    stroke: 'Free Relay',
  },
  75: {
    ageRange: '13-14',
    distance: '200 Meter',
    gender: 'Girls',
    stroke: 'Free Relay',
  },
  76: {
    ageRange: '13-14',
    distance: '200 Meter',
    gender: 'Boys',
    stroke: 'Free Relay',
  },
  77: {
    ageRange: '15-18',
    distance: '200 Meter',
    gender: 'Girls',
    stroke: 'Free Relay',
  },
  78: {
    ageRange: '15-18',
    distance: '200 Meter',
    gender: 'Boys',
    stroke: 'Free Relay',
  },
};

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

for (const [eventNumber, eventDetails] of Object.entries(EVENT_MAP)) {
  EVENTS_BY_STROKE[eventDetails.stroke] ??= [];
  EVENTS_BY_STROKE[eventDetails.stroke].push(eventNumber);

  EVENTS_BY_DISTANCE[eventDetails.distance] ??= [];
  EVENTS_BY_DISTANCE[eventDetails.distance].push(eventNumber);

  EVENTS_BY_GENDER[eventDetails.gender] ??= [];
  EVENTS_BY_GENDER[eventDetails.gender].push(eventNumber);
}
